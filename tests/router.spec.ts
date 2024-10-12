
import { Blockchain, printTransactionFees, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { beginCell, toNano, Address } from '@ton/core';
import * as Router from "../build/Router/tact_Router";
import * as Pool from "../build/Router/tact_Pool";
import * as PoolWallet from "../build/Router/tact_ExampleJettonWallet";
import * as SampleJetton from "../build/sample/tact_ExampleJettonMaster";
import * as SampleWallet from "../build/sample/tact_ExampleJettonWallet";
import '@ton/test-utils';

describe('Router', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let s1: SandboxContract<TreasuryContract>;
    let s2: SandboxContract<TreasuryContract>;
    let router: SandboxContract<Router.Router>;
    let sample1: SandboxContract<SampleJetton.ExampleJettonMaster>;
    let sample2: SandboxContract<SampleJetton.ExampleJettonMaster>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        s1 = await blockchain.treasury('s1');
        s2 = await blockchain.treasury('s2');

        router = blockchain.openContract(await Router.Router.fromInit(deployer.address));
        sample1 = blockchain.openContract(await SampleJetton.ExampleJettonMaster.fromInit(s1.address, beginCell().endCell()));
        sample2 = blockchain.openContract(await SampleJetton.ExampleJettonMaster.fromInit(s2.address, beginCell().endCell()));

        // deploy sample jetton
        const deployResult1 = await sample1.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult1.transactions).toHaveTransaction({
            from: deployer.address,
            to: sample1.address,
            deploy: true,
            success: true,
        });

        const deployResult2 = await sample2.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult2.transactions).toHaveTransaction({
            from: deployer.address,
            to: sample2.address,
            deploy: true,
            success: true,
        });

        // deploy router
        const deployResult = await router.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: router.address,
            deploy: true,
            success: true,
        });


    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and factory are ready to use
    });

    it('should get a pool address', async () => {
        let wallet0 = await blockchain.treasury('wallet0');
        let wallet1 = await blockchain.treasury('wallet1');
        let poolAddress = await router.getGetterPoolAddress(wallet0.address, wallet1.address, 1n, 1n);
        let poolAddressNoPrecision = await router.getGetterPoolAddressNoPrecision(wallet0.address, wallet1.address);
        expect(poolAddress).toEqualAddress(poolAddressNoPrecision);
        let poolAddress2 = await router.getGetterPoolAddress(wallet1.address, wallet0.address, 1n, 1n);
        expect(poolAddress).toEqualAddress(poolAddress2);
    });

    it('should pay if caller is valid ', async () => {
        // mint sample jetton to router
        const mintResult1 = await sample1.send(
            s1.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'JettonMint',
                origin: s1.address,
                receiver: router.address,
                amount: toNano(100),
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(mintResult1.transactions).toHaveTransaction({
            from: s1.address,
            to: sample1.address,
            success: true,
        });
        let router_sample1_wallet_address = await sample1.getGetWalletAddress(router.address);
        let router_sample1_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(router_sample1_wallet_address));

        const mintResult2 = await sample2.send(
            s2.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'JettonMint',
                origin: s2.address,
                receiver: router.address,
                amount: toNano(100),
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(mintResult2.transactions).toHaveTransaction({
            from: s2.address,
            to: sample2.address,
            success: true,
        });
        let router_sample2_wallet_address = await sample2.getGetWalletAddress(router.address);
        let router_sample2_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(router_sample2_wallet_address));

        // pay
        let before_router_sample1_balance = (await router_sample1_wallet.getGetWalletData()).balance;
        let before_router_sample2_balance = (await router_sample2_wallet.getGetWalletData()).balance;
        // console.log("before_router_sample1_balance: ", before_router_sample1_balance);
        // console.log("before_router_sample2_balance: ", before_router_sample2_balance);
        let random  = await blockchain.treasury('random');
        let amount_to_pay = toNano(1);
        const payResult = await router.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'PayTo',
                owner: random.address,
                tokenAAmount: amount_to_pay,
                walletTokenAAddress: router_sample1_wallet_address,
                tokenBAmount: amount_to_pay,
                walletTokenBAddress: router_sample2_wallet_address,
                remainRef: beginCell().endCell().asSlice(),
            }
        );

        expect(payResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: router.address,
            success: true,
        });
        // console.log("flag: ", await router.getGetTest());
        expect((await router_sample1_wallet.getGetWalletData()).balance).toEqual(before_router_sample1_balance - amount_to_pay);
        expect((await router_sample2_wallet.getGetWalletData()).balance).toEqual(before_router_sample2_balance - amount_to_pay);

        let random_sample1_wallet_address = await sample1.getGetWalletAddress(random.address);
        let random_sample2_wallet_address = await sample2.getGetWalletAddress(random.address);
        let random_sample1_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(random_sample1_wallet_address));
        let random_sample2_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(random_sample2_wallet_address));
        expect((await random_sample1_wallet.getGetWalletData()).balance).toEqual(amount_to_pay);
        expect((await random_sample2_wallet.getGetWalletData()).balance).toEqual(amount_to_pay);
    });

    it.skip('should route a swap request', async () => {
        // 0x25938561
        // 0xfcf9e58f
        let pool = await blockchain.treasury('pool');
        let wallet = await blockchain.treasury('wallet');
        const fp_ = 
        beginCell()
            .storeUint(0x25938561, 32)          // transferred_op
            .storeAddress(wallet.address)       // token_wallet1
            .storeRef(
                beginCell()
                    .storeCoins(1n)                     // min_out
                    .storeAddress(deployer.address)     // to_address
                    .storeAddress(pool.address)         // pool_address
                .endCell()
            )
        .endCell().asSlice();
        const swapResult = await router.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransferNotification',
                query_id: 0n,
                amount: 20n,
                sender: deployer.address,
                forward_payload: fp_,
            }
        );

        // console.log("swapResult: ", swapResult);
        console.log(swapResult.transactions.length);
        console.log(await router.getGetTest());
        // expect(swapResult.transactions).toHaveTransaction({
        //     from: deployer.address,
        //     to: router.address,
        //     success: true,
        // });
    });

    it.skip('should route a lp request', async () => {
        // 0x25938561
        // 0xfcf9e58f
        // let min_lp_out = ref_ds.loadCoins();
        // let precision0 = ref_ds.loadUint(32);
        // let precision1 = ref_ds.loadUint(32);
        
        let wallet0 = await blockchain.treasury('wallet0');
        let wallet1 = await blockchain.treasury('wallet1');

        function fp_(wallet_to: Address, min_lp_out: bigint, precision0: bigint, precision1: bigint) {
            return beginCell()
                .storeUint(0xfcf9e58f, 32)          // transferred_op
                .storeAddress(wallet_to)            // token_wallet1
                .storeRef(
                    beginCell()
                        .storeCoins(min_lp_out)     // min_lp_out
                        .storeUint(precision0, 32)   // precision0
                        .storeUint(precision1, 32)   // precision1
                    .endCell()
                )
            .endCell().asSlice();
        }
        const fp_0 = fp_(wallet1.address, 10n, 1n, 1n);
        const fp_1 = fp_(wallet0.address, 10n, 1n, 1n);

        const provideLPResult = await router.send(
            wallet0.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransferNotification',
                query_id: 0n,
                amount: 20n,
                sender: deployer.address,
                forward_payload: fp_0,
            }
        );

        expect(provideLPResult.transactions).toHaveTransaction({
            from: wallet0.address,
            to: router.address,
            success: true,
        });

        // console.log("provideLPResult: ", provideLPResult);
        // console.log(provideLPResult.transactions.length);
        console.log(await router.getGetTest());
        printTransactionFees(provideLPResult.transactions);
        console.log(provideLPResult.transactions.length);
        console.log(await router.getGetterLpData(deployer.address));

        const provideLPResult2 = await router.send(
            wallet1.getSender(),
            {
                value: toNano('8'),
            },
            {
                $$type: 'JettonTransferNotification',
                query_id: 0n,
                amount: 20n,
                sender: deployer.address,
                forward_payload: fp_1,
            }
        );

        expect(provideLPResult2.transactions).toHaveTransaction({
            from: wallet1.address,
            to: router.address,
            success: true,
        });
        console.log(await router.getGetTest());
        printTransactionFees(provideLPResult.transactions);
        console.log(provideLPResult.transactions.length);
        console.log(await router.getGetterLpData(deployer.address));

        let pool_address = await router.getGetterPoolAddress(wallet0.address, wallet1.address, 1n, 1n);
        let pool = blockchain.openContract(Pool.Pool.fromAddress(pool_address));
        console.log(await pool.getGetPoolData());
        console.log(await pool.getGetReserves());
        console.log((await pool.getGetJettonData()).total_supply);
        let ADD_NONE = await pool.getGetterAddNone();
        let ADD_NONE_lp_wallet_address = await pool.getGetWalletAddress(ADD_NONE);
        let ADD_NONE_lp_wallet =  blockchain.openContract(PoolWallet.ExampleJettonWallet.fromAddress(ADD_NONE_lp_wallet_address));
        console.log((await ADD_NONE_lp_wallet.getGetWalletData()).balance);

        // test swap


    });

    it('should ALL', async () => {
        // mint sample jetton to deployer
        const mintResult1 = await sample1.send(
            s1.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'JettonMint',
                origin: s1.address,
                receiver: deployer.address,
                amount: toNano(100),
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(mintResult1.transactions).toHaveTransaction({
            from: s1.address,
            to: sample1.address,
            success: true,
        });
        let deployer_sample1_wallet_address = await sample1.getGetWalletAddress(deployer.address);
        let deployer_sample1_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(deployer_sample1_wallet_address));
        expect((await deployer_sample1_wallet.getGetWalletData()).balance).toEqual(toNano(100));

        const mintResult2 = await sample2.send(
            s2.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'JettonMint',
                origin: s2.address,
                receiver: deployer.address,
                amount: toNano(100),
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(mintResult2.transactions).toHaveTransaction({
            from: s2.address,
            to: sample2.address,
            success: true,
        });
        let deployer_sample2_wallet_address = await sample2.getGetWalletAddress(deployer.address);
        let deployer_sample2_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(deployer_sample2_wallet_address));
        expect((await deployer_sample2_wallet.getGetWalletData()).balance).toEqual(toNano(100));

        // deploy provide LP first
        let wallet1_address = await sample1.getGetWalletAddress(router.address);
        let wallet2_address = await sample2.getGetWalletAddress(router.address);
        let wallet1_router = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(wallet1_address));
        let wallet2_router = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(wallet2_address));

        function fp_(wallet_to: Address, min_lp_out: bigint, precision0: bigint, precision1: bigint) {
            return beginCell()
                .storeUint(0xfcf9e58f, 32)          // transferred_op
                .storeAddress(wallet_to)            // token_wallet1
                .storeRef(
                    beginCell()
                        .storeCoins(min_lp_out)     // min_lp_out
                        .storeUint(precision0, 32)   // precision0
                        .storeUint(precision1, 32)   // precision1
                    .endCell()
                )
            .endCell().asSlice();
        }

        const fp_1 = fp_(wallet2_address, 1n, 1n, 1n);
        const fp_2 = fp_(wallet1_address, 1n, 1n, 1n);
        const amountIn = 10000n;

        const provideLPResult1 = await deployer_sample1_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amountIn,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_1,
            }
        );

        expect(provideLPResult1.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample1_wallet.address,
            success: true,
        });

        const provideLPResult2 = await deployer_sample2_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amountIn,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_2,
            }
        );

        expect(provideLPResult2.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample2_wallet.address,
            success: true,
        });

        let pool_address = await router.getGetterPoolAddress(wallet1_address, wallet2_address, 1n, 1n);
        let pool = blockchain.openContract(Pool.Pool.fromAddress(pool_address));
        console.log("provide LP first: \n", await pool.getGetPoolData());

        let ADD_NONE = await pool.getGetterAddNone();
        let ADD_NONE_lp_wallet_address = await pool.getGetWalletAddress(ADD_NONE);
        let ADD_NONE_lp_wallet =  blockchain.openContract(PoolWallet.ExampleJettonWallet.fromAddress(ADD_NONE_lp_wallet_address));
        console.log("none address lp - first lp: ", (await ADD_NONE_lp_wallet.getGetWalletData()).balance);
        expect((await wallet1_router.getGetWalletData()).balance).toEqual(amountIn);
        expect((await wallet2_router.getGetWalletData()).balance).toEqual(amountIn);

        // deploy swap
        let before_deployer_sample1_balance = (await deployer_sample1_wallet.getGetWalletData()).balance;
        let before_deployer_sample2_balance = (await deployer_sample2_wallet.getGetWalletData()).balance;
        let expect_out = await pool.getGetAmountOut(wallet1_address, deployer.address, 100n);
        let fp_swap1 =  beginCell()
            .storeUint(0x25938561, 32)                  // transferred_op
            .storeAddress(wallet2_address)               // token_wallet1
            .storeRef(
                beginCell()
                    .storeCoins(1n)                     // min_out
                    .storeAddress(deployer.address)     // to_address
                    .storeAddress(pool.address)         // pool_address
                .endCell()
            )
        .endCell().asSlice();
        const swapResult1 = await deployer_sample1_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: 100n,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_swap1,
            }
        );

        expect(swapResult1.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample1_wallet.address,
            success: true,
        });

        let after_deployer_sample1_balance = (await deployer_sample1_wallet.getGetWalletData()).balance;
        let after_deployer_sample2_balance = (await deployer_sample2_wallet.getGetWalletData()).balance;
        expect(after_deployer_sample1_balance).toEqual(before_deployer_sample1_balance - 100n);
        expect(after_deployer_sample2_balance).toEqual(before_deployer_sample2_balance + expect_out);
        console.log("sample1 balance: ", before_deployer_sample1_balance, after_deployer_sample1_balance);   // 100n token 1 to swap to token 2
        console.log("sample2 balance: ", before_deployer_sample2_balance, after_deployer_sample2_balance);   // receive 99n token 2

        let expect_out2 = await pool.getGetAmountOut(wallet2_address, deployer.address, 200n);
        let fp_swap2 =  beginCell()
            .storeUint(0x25938561, 32)                  // transferred_op
            .storeAddress(wallet1_address)               // token_wallet1
            .storeRef(
                beginCell()
                    .storeCoins(1n)                     // min_out
                    .storeAddress(deployer.address)     // to_address
                    .storeAddress(pool.address)         // pool_address
                .endCell()
            )
        .endCell().asSlice();
        const swapResult2 = await deployer_sample2_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: 200n,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_swap2,
            }
        );

        expect(swapResult2.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample2_wallet.address,
            success: true,
        });

        let after_deployer_sample1_balance2 = (await deployer_sample1_wallet.getGetWalletData()).balance;
        let after_deployer_sample2_balance2 = (await deployer_sample2_wallet.getGetWalletData()).balance;
        console.log("sample1 balance: ", after_deployer_sample1_balance2);   // 100n token 1 to swap to token 2
        console.log("sample2 balance: ", after_deployer_sample2_balance2);   // receive 99n token 2
        console.log("expect_out2: ", expect_out2);
        expect(after_deployer_sample1_balance2).toEqual(after_deployer_sample1_balance + expect_out2);

        // provide LP again
        let expected_lp_out = await pool.getGetTokenOut(amountIn, amountIn);
        let before_total_supply = (await pool.getGetJettonData()).total_supply;

        const provideLPResult3 = await deployer_sample1_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amountIn,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_1,
            }
        );

        expect(provideLPResult3.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample1_wallet.address,
            success: true,
        });

        const provideLPResult4 = await deployer_sample2_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amountIn,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_2,
            }
        );

        expect(provideLPResult4.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample2_wallet.address,
            success: true,
        });

        console.log(await pool.getGetPoolData());
        let after_total_supply = (await pool.getGetJettonData()).total_supply;
        expect(after_total_supply).toEqual(before_total_supply + expected_lp_out);
        let deployer_lp_wallet_address = await pool.getGetWalletAddress(deployer.address);
        let deployer_lp_wallet =  blockchain.openContract(PoolWallet.ExampleJettonWallet.fromAddress(deployer_lp_wallet_address));
        expect((await deployer_lp_wallet.getGetWalletData()).balance).toEqual(expected_lp_out);

        // remove LP
        const expected_lp_out_remove = await pool.getGetExpectedLiquidity(20n);
        const before_reserves = await pool.getGetReserves();
        
        const removeLPResult = await deployer_lp_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonBurn',
                query_id: 0n,
                amount: 20n,
                response_destination: deployer.address,
                custom_payload: null,
            }
        );

        expect(removeLPResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_lp_wallet.address,
            success: true,
        });

        const after_reserves = await pool.getGetReserves();
        expect(after_reserves.reserve0).toEqual(before_reserves.reserve0 - expected_lp_out_remove.amount0);
        expect(after_reserves.reserve1).toEqual(before_reserves.reserve1 - expected_lp_out_remove.amount1);
    });

    it('should Test swapPath', async () => {
        // deploy a new jetton
        let s3 = await blockchain.treasury('s3');
        let sample3 = blockchain.openContract(await SampleJetton.ExampleJettonMaster.fromInit(s3.address, beginCell().endCell()));

        // deploy sample jetton
        const deployResult3 = await sample3.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult3.transactions).toHaveTransaction({
            from: deployer.address,
            to: sample3.address,
            deploy: true,
            success: true,
        });

        // mint sample jetton to deployer
        const mintResult1 = await sample1.send(
            s1.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'JettonMint',
                origin: s1.address,
                receiver: deployer.address,
                amount: toNano(100),
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(mintResult1.transactions).toHaveTransaction({
            from: s1.address,
            to: sample1.address,
            success: true,
        });
        let deployer_sample1_wallet_address = await sample1.getGetWalletAddress(deployer.address);
        let deployer_sample1_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(deployer_sample1_wallet_address));
        expect((await deployer_sample1_wallet.getGetWalletData()).balance).toEqual(toNano(100));

        const mintResult2 = await sample2.send(
            s2.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'JettonMint',
                origin: s2.address,
                receiver: deployer.address,
                amount: toNano(100),
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(mintResult2.transactions).toHaveTransaction({
            from: s2.address,
            to: sample2.address,
            success: true,
        });
        let deployer_sample2_wallet_address = await sample2.getGetWalletAddress(deployer.address);
        let deployer_sample2_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(deployer_sample2_wallet_address));
        expect((await deployer_sample2_wallet.getGetWalletData()).balance).toEqual(toNano(100));

        const mintResult3 = await sample3.send(
            s3.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'JettonMint',
                origin: s3.address,
                receiver: deployer.address,
                amount: toNano(100),
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(mintResult3.transactions).toHaveTransaction({
            from: s3.address,
            to: sample3.address,
            success: true,
        });

        let deployer_sample3_wallet_address = await sample3.getGetWalletAddress(deployer.address);
        let deployer_sample3_wallet = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(deployer_sample3_wallet_address));
        expect((await deployer_sample3_wallet.getGetWalletData()).balance).toEqual(toNano(100));

        // deploy provide LP first
        let wallet1_address = await sample1.getGetWalletAddress(router.address);
        let wallet2_address = await sample2.getGetWalletAddress(router.address);
        let wallet3_address = await sample3.getGetWalletAddress(router.address);
        let wallet1_router = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(wallet1_address));
        let wallet2_router = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(wallet2_address));
        let wallet3_router = blockchain.openContract(SampleWallet.ExampleJettonWallet.fromAddress(wallet3_address));

        function fp_(wallet_to: Address, min_lp_out: bigint, precision0: bigint, precision1: bigint) {
            return beginCell()
                .storeUint(0xfcf9e58f, 32)          // transferred_op
                .storeAddress(wallet_to)            // token_wallet1
                .storeRef(
                    beginCell()
                        .storeCoins(min_lp_out)     // min_lp_out
                        .storeUint(precision0, 32)   // precision0
                        .storeUint(precision1, 32)   // precision1
                    .endCell()
                )
            .endCell().asSlice();
        }

        const fp_1 = fp_(wallet2_address, 1n, 1n, 1n);
        const fp_2 = fp_(wallet1_address, 1n, 1n, 1n);
        const amountIn = 10000n;

        const provideLPResult1 = await deployer_sample1_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amountIn,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_1,
            }
        );

        expect(provideLPResult1.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample1_wallet.address,
            success: true,
        });

        const provideLPResult2 = await deployer_sample2_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amountIn,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_2,
            }
        );

        expect(provideLPResult2.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample2_wallet.address,
            success: true,
        });

        let pool1_address = await router.getGetterPoolAddress(wallet1_address, wallet2_address, 1n, 1n);
        let pool1 = blockchain.openContract(Pool.Pool.fromAddress(pool1_address));
        let ADD_NONE = await pool1.getGetterAddNone();
        console.log("provide LP first: \n", await pool1.getGetPoolData());

        const fp_3 = fp_(wallet3_address, 1n, 1n, 1n);
        const fp_4 = fp_(wallet2_address, 1n, 1n, 1n);
        const provideLPResult3 = await deployer_sample2_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amountIn,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_3,
            }
        );

        expect(provideLPResult3.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample2_wallet.address,
            success: true,
        });

        const provideLPResult4 = await deployer_sample3_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amountIn,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_4,
            }
        );

        expect(provideLPResult4.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample3_wallet.address,
            success: true,
        });

        let pool2_address = await router.getGetterPoolAddress(wallet3_address, wallet2_address, 1n, 1n);
        let pool2 = blockchain.openContract(Pool.Pool.fromAddress(pool2_address));
        console.log("provide LP first: \n", await pool2.getGetPoolData());


        // deploy swap
        // single
        let expected_swap_out = await pool1.getGetAmountOut(wallet1_address, deployer.address, 100n);
        console.log("expected_swap_out: ", expected_swap_out);

        // swapPath
        let before_deployer_sample1_balance = (await deployer_sample1_wallet.getGetWalletData()).balance;
        let before_deployer_sample2_balance = (await deployer_sample2_wallet.getGetWalletData()).balance;
        let before_deployer_sample3_balance = (await deployer_sample3_wallet.getGetWalletData()).balance;


        let fp_swap1 =  beginCell()
            .storeUint(0x25938561, 32)                  // transferred_op
            .storeAddress(wallet2_address)               // to_wallet
            .storeRef(
                beginCell()
                    .storeCoins(1n)                     // min_out
                    .storeAddress(deployer.address)     // to_address
                    .storeAddress(pool1.address)         // pool_address
                .endCell()
            )
            .storeRef(
                beginCell()
                    .storeAddress(wallet2_address)      // token_walletIn
                    .storeCoins(1n)                     // min_out
                    .storeAddress(deployer.address)     // to_address
                    .storeAddress(pool2.address)        // pool_address
                .endCell()
            ).endCell()
        .asSlice();
        const swapResult1 = await deployer_sample1_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.8'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: 100n,
                destination: router.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: fp_swap1,
            }
        );

        expect(swapResult1.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployer_sample1_wallet.address,
            success: true,
        });
        
        console.log(await pool1.getGetPoolData());
        console.log(await pool2.getGetPoolData());
        let after_deployer_sample1_balance = (await deployer_sample1_wallet.getGetWalletData()).balance;
        let after_deployer_sample2_balance = (await deployer_sample2_wallet.getGetWalletData()).balance;
        let after_deployer_sample3_balance = (await deployer_sample3_wallet.getGetWalletData()).balance;
        
        console.log("sub sample1 balance: ", after_deployer_sample1_balance - before_deployer_sample1_balance);
        console.log("sub sample2 balance: ", after_deployer_sample2_balance - before_deployer_sample2_balance);
        console.log("sub sample3 balance: ", after_deployer_sample3_balance - before_deployer_sample3_balance);
    });
});
