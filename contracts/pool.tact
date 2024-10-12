import "@stdlib/deploy";
import "./token/jetton/JettonWallet";
import "./token/jetton/JettonMaster";
import "./math/math";
import "./pool/amm";
import "./pool/utils";
import "./pool/message";
import "./common/send_utils";
import "./common/test";

trait PoolImpl with SendUtils{
    routerAddress: Address;
    lpFee: Int;
    protocolFee: Int;
    protocolFeesAddress: Address;
    collectedTokenAProtocolFees: Int;
    collectedTokenBProtocolFees: Int;
    wallet0: Address;
    wallet1: Address;
    reserve0: Int;
    reserve1: Int;
    
    poolParams: PoolParams;

    fun call_pay_to(amount: Int, mode: Int, to_address: Address, amount0_out: Int, amount1_out: Int, remainRef: Slice){ 
        let body: Cell = PayTo{
            owner: to_address,
            tokenAAmount: amount0_out,
            walletTokenAAddress: self.wallet0,
            tokenBAmount: amount1_out,
            walletTokenBAddress: self.wallet1,
            remainRef: remainRef,
        }.toCell();
        self.send_message_nobounce(amount, self.routerAddress, body, mode);
    }
}

contract Pool with PoolImpl, AMM, JettonMaster, Deployable, Test {
    const ADD_NONE: Address = newAddress(0, 0);
    const MAX_COINS: Int = 1329227995784915872903807060280344575; // 2^120 - 1
    const MINIMUM_LIQUIDITY: Int = 0;  // 3000

    routerAddress: Address;
    lpFee: Int as coins;
    protocolFee: Int as coins;
    protocolFeesAddress: Address;
    collectedTokenAProtocolFees: Int as coins;
    collectedTokenBProtocolFees: Int as coins;
    wallet0: Address;
    wallet1: Address;
    reserve0: Int as coins;
    reserve1: Int as coins;
    // supplyLP: Int as coins;

    token0PrecisionMultiplier: Int;
    token1PrecisionMultiplier: Int;
    poolParams: PoolParams = PoolParams{
        initialA: 2000,
        futureA: 2000,
        initialTime: 0,
        futureTime: 0,
    };

    // lp token
    total_supply: Int;      // the total number of issued jettons
    mintable: Bool;         // flag which indicates whether minting is allowed
    owner: Address;         // owner of this jetton
    jetton_content: Cell;   // data in accordance to Token Data Standard #64

    // test
    test: Bool = false;

    init(
        routerAddress: Address,
        lpFee: Int,
        protocolFee: Int,
        protocolFeesAddress: Address,
        collectedTokenAProtocolFees: Int,
        collectedTokenBProtocolFees: Int,
        wallet0: Address,
        wallet1: Address,
        reserve0: Int,
        reserve1: Int,
        total_supply: Int,
        token0PrecisionMultiplier: Int,
        token1PrecisionMultiplier: Int
    ){
        self.routerAddress = routerAddress;
        self.lpFee = lpFee;
        self.protocolFee = protocolFee;
        self.protocolFeesAddress = protocolFeesAddress;
        self.collectedTokenAProtocolFees = collectedTokenAProtocolFees;
        self.collectedTokenBProtocolFees = collectedTokenBProtocolFees;
        self.wallet0 = wallet0;
        self.wallet1 = wallet1;
        self.reserve0 = reserve0;
        self.reserve1 = reserve1;
        // self.supplyLP = supplyLP;

        self.token0PrecisionMultiplier = token0PrecisionMultiplier;
        self.token1PrecisionMultiplier = token1PrecisionMultiplier;

        self.total_supply = total_supply;
        self.mintable = true;
        self.owner = routerAddress;
        self.jetton_content = emptyCell();
    }

    /*
        receive functions  
    */
    receive(src: ProvideLiquidity){
        let a = self.getA(self.poolParams);
        let tot_am0 = src.jettonAmount0;
        let tot_am1 = src.jettonAmount1;
        let user_address = src.fromAddress;
        // let min_lp_out = src.minLPOut;

        // let acc_state_init = self.get_wallet_address(user_address);
        let liquidity = self.getTokenOut(tot_am0, tot_am1);
        let to: Address = self.total_supply == 0 ? self.ADD_NONE : user_address;
    
        /*
            check if the user will get less than the minimum amount of liquidity
            ...
        */
        self.reserve0 += tot_am0;
        self.reserve1 += tot_am1;
        // self.total_supply += liquidity;  // mint will auto add

        self._mint_lp(to, liquidity);
    }

    receive(src: RefundMe){
        let tot_am0 = src.tot_am0;
        let tot_am1 = src.tot_am1;
        let user_address = src.user_address;
        self.call_pay_to(0, self.CARRY_REMAINING_GAS, user_address, tot_am0, tot_am1, emptySlice());
    }

    receive(src: Swap){
        let from_user_address = src.fromAddress;
        let token_wallet = src.tokenWallet;
        let amount = src.jettonAmount;
        let min_out = src.minOutput;
        let remainRef = src.remainRef;

        let out = 0;
        let protocol_fee_out = 0;
        let tmp_am_0 = 0;
        let tmp_am_1 = 0;

        let mode = self.CARRY_REMAINING_GAS;

        let gA = self.getA(self.poolParams);
        // get expected outputs
        // _getAmountOut(getA(), params.swapFee, params.amountIn, params.reserve0, params.reserve1, true);
        // A swap to B
        if (token_wallet == self.wallet0) { 
            let swapFee = self._getSwapFee(src.toAddress, self.wallet0, self.wallet1);
            let ao: AmountOut = self._getAmountOut(gA, swapFee, amount, self.reserve0, self.reserve1, true);
            out = ao.amountOut;
            protocol_fee_out = ao.feeIn;
            tmp_am_0 = amount;
        } else {
            let swapFee = self._getSwapFee(src.toAddress, self.wallet1, self.wallet0);
            let ao: AmountOut = self._getAmountOut(gA, swapFee, amount, self.reserve1, self.reserve0, false);
            out = ao.amountOut;
            protocol_fee_out = ao.feeIn;
            tmp_am_1 = amount;
        }

        // refund if not enough liquidity or not enough output or output less than min_out
        //  fun call_pay_to(amount: Int, mode: Int, to_address: Address, amount0_out: Int, amount1_out: Int) 
        if ((self.total_supply <= 0) || ((out <= 0) || (min_out >= out))) {
            self.call_pay_to(0, self.CARRY_REMAINING_GAS, from_user_address, tmp_am_0, tmp_am_1, remainRef);
            return ;
        }

        // swap and update reserves
        if (tmp_am_0 != 0) {
            // swap token0 for token1
            self.reserve0 += amount;
            self.reserve1 -= (out + protocol_fee_out);
            self.collectedTokenBProtocolFees += protocol_fee_out; 

            // refund if not enough balance or exceed max balance
            if ((self.reserve0 > self.MAX_COINS) || (self.reserve1 <= 0)) {
                self.call_pay_to(0, self.CARRY_REMAINING_GAS, from_user_address, tmp_am_0, tmp_am_1, remainRef);
                return ;
            }

            self.call_pay_to(0, mode, from_user_address, 0, out, remainRef); 
        } else {    
            // swap token1 for token0
            self.reserve0 -= (out + protocol_fee_out);
            self.reserve1 += amount;
            self.collectedTokenAProtocolFees += protocol_fee_out; 

            // refund if not enough balance or exceed max balance
            if ((self.reserve1 > self.MAX_COINS) || (self.reserve0 <= 0) ){
                self.call_pay_to(0, self.CARRY_REMAINING_GAS, from_user_address, tmp_am_0, tmp_am_1, remainRef);
                return ;
            }

            self.call_pay_to(0, mode, from_user_address, out, 0, remainRef); 
        }
    }

    // Send excess gas to router
    receive("reset_gas"){
        // send_empty_message(my_balance - REQUIRED_TON_RESERVE, self.router_address, NORMAL);
        self.send_empty_message(myBalance() - ton("0.01"), self.routerAddress, self.NORMAL);
    }

    receive("collect_fees"){
        // throw_unless(NO_LIQUIDITY, (self.collectedTokenAProtocolFees > 0) & (self.collectedTokenBProtocolFees > 0));
        // throw_unless(INVALID_RECIPIENT, ~ equal_slices(protocolFeesAddress, HOLE_ADDRESS));
        require((self.collectedTokenAProtocolFees > 0) && (self.collectedTokenBProtocolFees > 0), "Pool: No fees to collect");
        
        self.call_pay_to(0, self.CARRY_REMAINING_GAS, self.protocolFeesAddress, self.collectedTokenAProtocolFees, self.collectedTokenBProtocolFees, emptySlice());
        self.collectedTokenAProtocolFees = 0;
        self.collectedTokenBProtocolFees = 0;

    }

    receive(src: SetFees){
        let new_lp_fee = src.newLPFee;
        let new_protocol_fee = src.newProtocolFees;
        let new_protocol_fee_address = src.newProtocolFeeAddress;
        // throw_unless(FEE_OUT_RANGE, (MIN_FEE <= new_lp_fee) & (new_lp_fee <= MAX_FEE));
        // throw_unless(FEE_OUT_RANGE, (MIN_FEE <= new_protocol_fee) & (new_protocol_fee <= MAX_FEE));
        // throw_unless(FEE_OUT_RANGE, (MIN_FEE <= new_ref_fee) & (new_ref_fee <= MAX_FEE));

        self.lpFee = new_lp_fee;
        self.protocolFee = new_protocol_fee;
        self.protocolFeesAddress = new_protocol_fee_address;
    }

    /*
        static functions
    */
    // mint_lp 
    fun _mint_lp(to: Address, amount: Int) {
        let ctx: Context = context();
        let msg: JettonMint = JettonMint{
            origin: to,
            receiver: to,
            amount: amount,
            custom_payload: emptyCell(),
            forward_ton_amount: 0,
            forward_payload: emptySlice(),
        };
        self._mint_validate(ctx, msg);
        self._mint(ctx, msg);
    }

    fun _computeInvariant(_a: Int, _reserve0: Int, _reserve1: Int): Int {
        // Get D, StableSwap invariant, based on a set of balances and a specific A.
        // See the StableSwap paper for details.
        // Initial realization: https://github.com/saddle-finance/saddle-contract/blob/0b76f7fb519e34b878aa1d58cffc8d8dc0572c12/contracts/SwapUtils.sol#L319。
        // Returns the invariants of the pool with the same precision as the pool.
        let _adjustedReserve0: Int = self.token0PrecisionMultiplier * _reserve0;
        let _adjustedReserve1: Int = self.token1PrecisionMultiplier * _reserve1;
        return self.computeDFromAdjustedBalances(_a, _adjustedReserve0, _adjustedReserve1);
    }


    /*
        override functions
    */
    override inline fun burn_notification_hook(ctx: Context, msg: JettonBurnNotification) {
        // int jetton_amount, slice from_address, slice response_address
        let a = self.getA(self.poolParams);
        let jetton_amount = msg.amount;
        let from_address = msg.sender;
        // let response_address = msg.response_destination;

        // int amount0_out = (jetton_amount * storage::reserve0) / storage::total_supply_lp; 
        // int amount1_out = (jetton_amount * storage::reserve1) / storage::total_supply_lp; 
        let amount0_out = (jetton_amount * self.reserve0) / self.total_supply;
        let amount1_out = (jetton_amount * self.reserve1) / self.total_supply;

        self.reserve0 -= amount0_out;
        self.reserve1 -= amount1_out;
        // self.total_supply -= jetton_amount;

        self.call_pay_to(0, self.CARRY_REMAINING_GAS, from_address, amount0_out, amount1_out, emptySlice());
    }

    override inline fun _mint_validate(ctx: Context, msg: JettonMint) {
        require(self.mintable, "JettonMaster: Jetton is not mintable");
    }

    override inline fun calculate_jetton_wallet_init(owner_address: Address): StateInit {
        return initOf ExampleJettonWallet(owner_address, myAddress());
    }

    /*
        getters functions
    */
    get fun get_pool_data(): PoolData {
        return PoolData{
            routerAddress: self.routerAddress,
            reserve0: self.reserve0,
            reserve1: self.reserve1,
            token0Address: self.wallet0,
            token1Address: self.wallet1,
            lpFee: self.lpFee,
            protocolFee: self.protocolFee,
            protocolFeeAddress: self.protocolFeesAddress,
            collectedToken0ProtocolFee: self.collectedTokenAProtocolFees,
            collectedToken1ProtocolFee: self.collectedTokenBProtocolFees,
        };
    }

    get fun get_amount_out(tokenIn: Address, sender: Address, amountIn: Int): Int {
        let out = 0;
        let gA = self.getA(self.poolParams);

        if (tokenIn == self.wallet0) { 
            let swapFee = self._getSwapFee(sender, self.wallet0, self.wallet1);
            let ao: AmountOut = self._getAmountOut(gA, swapFee, amountIn, self.reserve0, self.reserve1, true);
            out = ao.amountOut;
        } else {
            let swapFee = self._getSwapFee(sender, self.wallet1, self.wallet0);
            let ao: AmountOut = self._getAmountOut(gA, swapFee, amountIn, self.reserve1, self.reserve0, false);
            out = ao.amountOut;
        }
        return out;
    }

    get fun get_swap_fee(sender: Address, tokenIn: Address): Int {
        return self._getSwapFee(sender, self.wallet1, self.wallet0);
    }

    get fun getTokenOut(amount0: Int, amount1: Int): Int {
        let liquidity = 0;
        let a = self.getA(self.poolParams);

        let newInvariant = self._computeInvariant(a, self.reserve0 + amount0, self.reserve1 + amount1);
        let oldInvariant = self._computeInvariant(a, self.reserve0, self.reserve1);

        // calculate liquidity to mint
        if (self.total_supply == 0) {
            liquidity = newInvariant - self.MINIMUM_LIQUIDITY;
        } else {
            liquidity = self.total_supply * (newInvariant - oldInvariant) / oldInvariant;
        }

        return liquidity;
    }

    // Access to prospective liquidity
    get fun get_expected_liquidity(amount: Int): ExpectedLiquidity{
        let amount0_out = (amount * self.reserve0) / self.total_supply;
        let amount1_out = (amount * self.reserve1) / self.total_supply;
        return ExpectedLiquidity{
            amount0: amount0_out,
            amount1: amount1_out,
        };
    }

    get fun get_reserve0(): Int{
        return self.reserve0;
    }

    get fun get_reserve1(): Int{
        return self.reserve1;
    }

    get fun getReserves(): Reserves{
        return Reserves{
            reserve0: self.reserve0,
            reserve1: self.reserve1,
        };
    }


    // test
    get fun getter_A(): Int{
        return self.getA(self.poolParams);
    }

    get fun getter_oldInvariant(): Int{
        let a = self.getA(self.poolParams);
        return self._computeInvariant(a, self.reserve0, self.reserve1);
    }

    get fun getter_newInvariant(amount0: Int, amount1: Int): Int{
        let a = self.getA(self.poolParams);
        return self._computeInvariant(a, self.reserve0 + amount0, self.reserve1 + amount1);
    }

    get fun getter_computeDFromAdjustedBalances(xp0: Int, xp1: Int): Int{
        let a = self.getA(self.poolParams);
        return self.computeDFromAdjustedBalances(a, xp0, xp1);
    }

    get fun getter_ADD_NONE(): Address{
        return self.ADD_NONE;
    }
}


