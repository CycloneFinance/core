

import { Blockchain, printTransactionFees, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { fromNano, toNano, Address } from '@ton/core';
import * as Pool from "../build/Pool/tact_Pool";
import * as PoolWallet from "../build/Pool/tact_ExampleJettonWallet";
import '@ton/test-utils';
import exp from 'constants';

describe('Pool', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let router: SandboxContract<TreasuryContract>;
    let wallet0: SandboxContract<TreasuryContract>;
    let wallet1: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool.Pool>;
    let ADD_NONE: Address;



    beforeEach(async () => {
        blockchain = await Blockchain.create();
        router = await blockchain.treasury('router');
        wallet0 = await blockchain.treasury('wallet0');
        wallet1 = await blockchain.treasury('wallet1');

        pool = blockchain.openContract(await Pool.Pool.fromInit(
            router.address, 
            20n, 
            10n,
            (await blockchain.treasury('0')).address,
            0n,
            0n,
            wallet0.address,
            wallet1.address,
            0n,
            0n,
            0n,
            1n,  //precision0
            1n   //precision1
        ));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await pool.send(
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
            to: pool.address,
            deploy: true,
            success: true,
        });

        // console.log("a: ", await pool.getGetterA());
        let expect_out = await pool.getGetTokenOut(toNano(1), toNano(1));
        const deployResult1 = await pool.send(
            router.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'ProvideLiquidity',
                fromAddress: deployer.address,
                jettonAmount0: toNano(1),
                jettonAmount1: toNano(1),
                minLPOut: 1n,
            }
        );

        expect(deployResult1.transactions).toHaveTransaction({
            from: router.address,
            to: pool.address,
            success: true,
        });
        let data = await pool.getGetJettonData();
        expect(data.total_supply).toEqual(expect_out);

       
        ADD_NONE = await pool.getGetterAddNone();
        let ADD_NONE_lp_wallet_address = await pool.getGetWalletAddress(ADD_NONE);
        let ADD_NONE_lp_wallet =  blockchain.openContract(PoolWallet.ExampleJettonWallet.fromAddress(ADD_NONE_lp_wallet_address));
        let ADD_NONE_lp_wallet_data = await ADD_NONE_lp_wallet.getGetWalletData();
        expect(ADD_NONE_lp_wallet_data.balance).toEqual(expect_out);
    });


    it('should deploy and ProvideLiquidity', async () => {
        // the check is done inside beforeEach
        // blockchain and factory are ready to use
        let before_total_supply = (await pool.getGetJettonData()).total_supply;
        let expect_out = await pool.getGetTokenOut(toNano(1), toNano(1));
        const deployResult1 = await pool.send(
            router.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'ProvideLiquidity',
                fromAddress: deployer.address,
                jettonAmount0: toNano(1),
                jettonAmount1: toNano(1),
                minLPOut: 1n,
            }
        );

        expect(deployResult1.transactions).toHaveTransaction({
            from: router.address,
            to: pool.address,
            success: true,
        });
        let data = await pool.getGetJettonData();
        expect(data.total_supply).toEqual(before_total_supply + expect_out);

        let deploy_lp_wallet_address = await pool.getGetWalletAddress(deployer.address);
        let deploy_lp_wallet =  blockchain.openContract(PoolWallet.ExampleJettonWallet.fromAddress(deploy_lp_wallet_address));
        let deploy_lp_wallet_data = await deploy_lp_wallet.getGetWalletData();
        expect(deploy_lp_wallet_data.balance).toEqual(expect_out);
        console.log(await pool.getGetPoolData());
        printTransactionFees(deployResult1.transactions);
    });

    it('should swap', async () => {

        // let expect_out = await pool.getGetAmountOut(wallet0.address, deployer.address, 200n);
        // console.log("expect_out: ", expect_out);
        let before_reserve0 = (await pool.getGetReserves()).reserve0;
        let before_reserve1 = (await pool.getGetReserves()).reserve1;

        const deployResult1 = await pool.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Swap',
                fromAddress: deployer.address,
                jettonAmount: 200n,
                tokenWallet: wallet0.address,
                toAddress: deployer.address,
                minOutput: 1n,
            }
        );

        expect(deployResult1.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true,
        });

        let reserves = await pool.getGetReserves();
        expect(reserves.reserve0).toEqual(before_reserve0 + 200n);
        // expect(reserves.reserve1).toEqual(before_reserve1 - 200n);
    });

    it('should remove liquidity', async () => {
        const deployResult1 = await pool.send(
            router.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'ProvideLiquidity',
                fromAddress: deployer.address,
                jettonAmount0: toNano(1),
                jettonAmount1: toNano(1),
                minLPOut: 1n,
            }
        );

        expect(deployResult1.transactions).toHaveTransaction({
            from: router.address,
            to: pool.address,
            success: true,
        });
        let before_total_supply = (await pool.getGetJettonData()).total_supply;
        let before_reserves = await pool.getGetReserves();

        let deploy_lp_wallet_address = await pool.getGetWalletAddress(deployer.address);
        let deploy_lp_wallet =  blockchain.openContract(PoolWallet.ExampleJettonWallet.fromAddress(deploy_lp_wallet_address));
        let deploy_lp_wallet_data = await deploy_lp_wallet.getGetWalletData();
        let before_lp_wallet_balance = deploy_lp_wallet_data.balance;

        let expect_out = await pool.getGetExpectedLiquidity(20n);
        // console.log("expect_out: ", expect_out);

        const deployResult2 = await deploy_lp_wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'JettonBurn',
                query_id: 0n,
                amount: 20n,
                response_destination: deployer.address,
                custom_payload: null,
            }
        );

        expect(deployResult2.transactions).toHaveTransaction({
            from: deployer.address,
            to: deploy_lp_wallet.address,
            success: true,
        });
        // console.log(await pool.getGetTest());
        expect((await pool.getGetJettonData()).total_supply).toEqual(before_total_supply - 20n);
        expect((await deploy_lp_wallet.getGetWalletData()).balance).toEqual(before_lp_wallet_balance - 20n);
        expect((await pool.getGetReserves()).reserve0).toEqual(before_reserves.reserve0 - expect_out.amount0);
        expect((await pool.getGetReserves()).reserve1).toEqual(before_reserves.reserve1 - expect_out.amount1);
    });
});
