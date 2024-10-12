import "@stdlib/deploy";
import "./pool";
import "./router/message";
import "./common/test";

trait IRouter with SendUtils{
    const ADD_NONE: Address = newAddress(0, 0);

    abstract fun get_pool_state_init_and_address(
        token0_address: Address, 
        token1_address: Address,
        token0PrecisionMultiplier: Int,
        token1PrecisionMultiplier: Int
    ): PoolState;

    fun create_simple_transfer_body(query_id: Int, fwd_amount: Int, jetton_amount: Int, to: Address): JettonTransfer {
        return JettonTransfer{
            query_id: query_id,
            amount: jetton_amount,
            destination: to,
            response_destination: to,
            custom_payload: emptyCell(),
            forward_ton_amount: fwd_amount,
            forward_payload: emptySlice()
        };
    }

    get fun get_ADD_NONE(): Address {
        return self.ADD_NONE;
    }
}

contract Router with IRouter, Deployable, Test  {
    const swap: Int = 0x25938561;                        //25938561
    const provide_lp: Int = 0xfcf9e58f;            //fcf9e58f

    isLocked: Bool;
    adminAddress: Address;
    lp_data: map<Address, ProvideLiquidity>;

    // test
    test: Bool = false;

    init(admin: Address) {
        self.isLocked = false;
        self.adminAddress = admin;
    }

    /*
        receive functions
    */
    // Send Jetton to a specified address
    receive(src: PayTo) {
        let owner = src.owner;
        let amount0_out = src.tokenAAmount;
        let amount1_out = src.tokenBAmount;
        let token0_address = src.walletTokenAAddress;
        let token1_address = src.walletTokenBAddress;
        let ref_cs = src.remainRef;

        let ton_amount: Int = 0;
        let mode = self.CARRY_REMAINING_GAS;
        let msg_value: Int = context().value;

        if (ref_cs.empty()) {
            // ;; Either one or both amounts must be non-zero
            if ((amount0_out > 0) && (amount1_out > 0)) {
                // ;; Divide remaining ton_amount between two transactions
                ton_amount = (msg_value - ton("0.01")) / 2;  // The msg_value retained here is the entry fee, and what is actually retained in the contract now will be less than that, so subtract 0.04
                mode = self.NORMAL;
            }
            
            if (amount0_out > 0) {
                let body0 = self.create_simple_transfer_body(0, 0, amount0_out, owner);
                self.send_simple_message(ton_amount, token0_address, body0.toCell(), mode | self.IGNORE_ERRORS);
            }

            if (amount1_out > 0) {
                let body1 = self.create_simple_transfer_body(0, 0, amount1_out, owner);
                self.send_simple_message(ton_amount, token1_address, body1.toCell(), mode | self.IGNORE_ERRORS);
            }
        } else {
            // send swap message to pool
            /*  TL-B:
                storeRef(
                    beginCell()
                        .storeAddress(token_walletIn)
                        .storeCoins(min_out)
                        .storeAddress(to_address)
                        .storeAddress(pool_address)
                    endCell()
                )
            */
            let ref_ds = ref_cs.loadRef().beginParse();
            let token_walletIn = ref_ds.loadAddress();   // A to B to C..., this is B
            let min_out = ref_ds.loadCoins();
            let to_address = ref_ds.loadAddress();  // Calculate the fee
            let pool_address = ref_ds.loadAddress();

            let jetton_amount = 0;
            if (token_walletIn == token0_address) {
                jetton_amount = amount0_out;
            } else {
                jetton_amount = amount1_out;
            }
            
            self._swap(token_walletIn, owner, jetton_amount, min_out, to_address, pool_address, ref_cs);
        }
    }

    // message(0x7362d09c) JettonTransferNotification {
    //     query_id: Int as uint64;                // arbitrary request number
    //     amount: Int as coins;                   // amount of jettons to transfer
    //     sender: Address;                        // address of the sender of the jettons
    //     forward_payload: Slice as remaining;    // optional custom payload
    // }
    receive(src: JettonTransferNotification){   // op 0x7362d09c
        // (int jetton_amount, slice from_user) = (in_msg_body~load_coins(), in_msg_body~load_msg_addr());
        let jetton_amount: Int = src.amount;
        let from_user: Address = src.sender;
        let ref_cs: Slice = src.forward_payload;
        let token_walletIn = context().sender;

        let transferred_op = ref_cs.loadUint(32);
        let token_walletTo = ref_cs.loadAddress();
        let ref_ds = ref_cs.loadRef().beginParse();

        if(transferred_op == self.swap){
            /*  TL-B:
                storeRef(
                    beginCell()
                        .storeCoins(min_out)
                        .storeAddress(to_address)
                        .storeAddress(pool_address)
                    endCell()
                )
            */
            let min_out = ref_ds.loadCoins();
            let to_address = ref_ds.loadAddress();  // Calculate the fee
            let pool_address = ref_ds.loadAddress();
            self._swap(token_walletIn, from_user, jetton_amount, min_out, to_address, pool_address, ref_cs);

        } else if(transferred_op == self.provide_lp){
            /*  TL-B:
                storeRef(
                    beginCell()
                        .storeCoins(min_lp_out)
                        .storeUint(precision0)
                        .storeUint(precision1)
                    endCell()
                )
            */
            let min_lp_out = ref_ds.loadCoins();
            let precision0 = ref_ds.loadUint(32);
            let precision1 = ref_ds.loadUint(32);

            let pool_state = self.get_pool_state_init_and_address(token_walletIn, token_walletTo, precision0, precision1);
            let state_init = pool_state.init;
            let pool_address = pool_state.pool_address;

            let amount0 = 0;
            let amount1 = 0;
            let allow_set = true;
            if (self.lp_data.get(from_user) != null) {
                let lp = self.lp_data.get(from_user)!!;
                amount0 = lp.jettonAmount0; 
                amount1 = lp.jettonAmount1;
                allow_set = false;
            } 
            
            if (token_walletIn.asSlice().hash() > token_walletTo.asSlice().hash()) {
                amount0 = jetton_amount;
            } else {
                amount1 = jetton_amount;
            } 

            if (allow_set) {
                self.lp_data.set(from_user, ProvideLiquidity{
                    fromAddress: from_user,
                    jettonAmount0: amount0,
                    jettonAmount1: amount1,
                    minLPOut: min_lp_out
                });
            } else {
                let body = ProvideLiquidity {   // op 0x355a3065
                    fromAddress: from_user,
                    jettonAmount0: amount0,
                    jettonAmount1: amount1,
                    minLPOut: min_lp_out,
                };
                // self.lp_data.set(from_user, body);
                self.lp_data.del(from_user);
                self.send_message_with_stateinit(0, pool_address, body.toCell(), state_init, self.CARRY_REMAINING_GAS);
            }
        } 
    }

    // bounced(src: bounced<ProvideLiquidity>){
    //     self.test = true;
    // }

    // need admin
    receive(src: CollectFees){
        self.require_admin();
        
    }

    receive(src: UpdateAdmin){
        self.require_admin();
        self.adminAddress = src.newAdmin;
    }

    receive("Lock") {
        self.require_admin();
        self.isLocked = true;
    }

    receive("Unlock") {
        self.require_admin();
        self.isLocked = false;
    }

    /*
        static functions
    */
    fun _swap(
        token_walletIn: Address, 
        from_user: Address, 
        jetton_amount: Int,
        min_out: Int,
        to_address: Address,
        pool_address: Address,
        ref_ds: Slice
    ) {
        // let min_out = ref_ds.loadCoins();
        // let to_address = ref_ds.loadAddress();  // Calculate the fee
        // let pool_address = ref_ds.loadAddress();

        let body = Swap {
            fromAddress: from_user,
            jettonAmount: jetton_amount,
            tokenWallet: token_walletIn,
            toAddress: to_address,
            minOutput: min_out,
            remainRef: ref_ds,
        };
        
        self.send_simple_message(0, pool_address, body.toCell(), self.CARRY_REMAINING_GAS);
    }

    fun require_admin() {
        require(context().sender == self.adminAddress, "Router: Sender is not admin");
    }

    override fun get_pool_state_init_and_address(
        token0_address: Address, 
        token1_address: Address,
        token0PrecisionMultiplier: Int,
        token1PrecisionMultiplier: Int
    ): PoolState{
        let wallet0: Address = self.ADD_NONE;
        let wallet1: Address = self.ADD_NONE;
        let precision0: Int = 0;
        let precision1: Int = 0;

        if(token0_address.asSlice().hash() > token1_address.asSlice().hash()){
            wallet0 = token0_address;
            wallet1 = token1_address;
            precision0 = token0PrecisionMultiplier;
            precision1 = token1PrecisionMultiplier;
        } else {
            wallet0 = token1_address;
            wallet1 = token0_address;
            precision0 = token1PrecisionMultiplier;
            precision1 = token0PrecisionMultiplier;
        }
        let state_init: StateInit = initOf Pool(
            myAddress(),          // routerAddress
            20,                   // lpFee
            10,                   // protocolFee
            self.ADD_NONE,        // protocolFeesAddress
            0,                    // collectedTokenAProtocolFees
            0,                    // collectedTokenBProtocolFees
            wallet0,              // wallet0
            wallet1,              // wallet1
            0,
            0,
            0,
            precision0,
            precision1
        );
        

        return PoolState{
            init: state_init,
            pool_address: contractAddress(state_init)
        };
    }

    /*
        getter functions
    */
    get fun isLocked(): Bool {
        return self.isLocked;
    }

    

    get fun getter_pool_address(        
        token0_address: Address, 
        token1_address: Address,
        token0PrecisionMultiplier: Int,
        token1PrecisionMultiplier: Int
    ): Address {
        let pool_state: PoolState = self.get_pool_state_init_and_address(token0_address, token1_address, token0PrecisionMultiplier, token1PrecisionMultiplier);
        return pool_state.pool_address;
    }

    get fun getter_pool_address_noPrecision(token0_address: Address, token1_address: Address): Address {
        return self.getter_pool_address(token0_address, token1_address, 1, 1);
    }

    get fun get_router_data(): RouterData {
        return RouterData{
            isLocked: self.isLocked,
            adminAddress: self.adminAddress,
            // poolCode: self.poolCode
        };
    }

    // test
    get fun getter_lp_data(from_user: Address): ProvideLiquidity {
        return self.lp_data.get(from_user)!!;
    }

    receive(src: Reback) {
        self.send_empty_message(myBalance() - ton("0.1"), src.to, self.NORMAL);
    }
}
message Reback{
    to: Address;
}
// message(0x1dde073a) TestLP{
//     token_walletIn: Address;
//     token_walletTo: Address;
// }

