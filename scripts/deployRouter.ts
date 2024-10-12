import { PayTo, AmountOut } from './../build/Pool/tact_Pool';
import { beginCell, toNano, Address, Builder } from '@ton/core';
import * as Router from "../build/Router/tact_Router";
import * as Pool from "../build/Router/tact_Pool";
import * as PoolWallet from "../build/Router/tact_ExampleJettonWallet";
import * as SampleJetton from "../build/sample/tact_ExampleJettonMaster";
import * as SampleWallet from "../build/sample/tact_ExampleJettonWallet";
import '@ton/test-utils';
import { NetworkProvider, sleep } from '@ton/blueprint';

// interface GetPoolAddress {

// }

export async function run(provider: NetworkProvider) {
    // await deployRouter(provider);

    // get pool
    let pool_address = Address.parse('kQCCgqU2sUb6gH_svDCjWUkyVfoS1wZFE2r7cGazyDR9yxua');
    // await get_pool(provider, pool_address);

    // add liquidity
    const USDA_Address = Address.parse("EQAac07GkL_Fawf_XeK3V8Un53-2M50TsSBMpi-YQsa23btE");
    const USDB_Address = Address.parse("kQCfDaQpLIYnGlk6p06sfUt5Ru86fH4J52KpcF1w-rJuMrNY");
    const router_address = Address.parse('EQCnkCvVxsrZGDDDRa_FPpXWSuG659-j0_Jl7zImkO8LD2QW');
    // await provider_liquidity(provider, router_address, USDA_Address, USDB_Address, toNano('1000'));

    // swap
    // await swap(provider, router_address, false, USDA_Address, USDB_Address, pool_address, toNano('10'));
    await test();
}

async function test() {
    let packed_msg = beginCell()
    .store(
        Pool.storeDeploy({
            $$type: 'Deploy',
            queryId: 0n,
        })
    )
    .endCell();

    let builder = new Builder();
    Pool.storeDeploy({
        $$type: 'Deploy',
        queryId: 0n,
    })(builder);
    let packed_msg2 = builder.endCell();

    console.log(packed_msg2 == packed_msg);  // false
}

async function swap(provider: NetworkProvider, router_address: Address, a_to_b: boolean, token_master1: Address, token_master2: Address, pool_address: Address, amount: bigint) {
    const user = provider.sender().address as Address;
    // const router = provider.open(Router.Router.fromAddress(router_address));
    const sampleJettonMaster1 = provider.open(SampleJetton.ExampleJettonMaster.fromAddress(token_master1));
    const sampleJettonMaster2 = provider.open(SampleJetton.ExampleJettonMaster.fromAddress(token_master2));
    const user_sample1_wallet_address = await sampleJettonMaster1.getGetWalletAddress(user);
    const user_sample2_wallet_address = await sampleJettonMaster2.getGetWalletAddress(user);
    const router_sample1_wallet_address = await sampleJettonMaster1.getGetWalletAddress(router_address);
    const router_sample2_wallet_address = await sampleJettonMaster2.getGetWalletAddress(router_address);

    const user_sample1_wallet = provider.open(SampleWallet.ExampleJettonWallet.fromAddress(user_sample1_wallet_address));
    const user_sample2_wallet = provider.open(SampleWallet.ExampleJettonWallet.fromAddress(user_sample2_wallet_address));

    function fp_(wallet_to: Address, min_lp_out: bigint, to_address: Address, pool_address: Address) {
        return beginCell()
        .storeUint(0x25938561, 32)                  // transferred_op
        .storeAddress(wallet_to)               // token_wallet1
        .storeRef(
            beginCell()
                .storeCoins(min_lp_out)                     // min_out
                .storeAddress(to_address)     // to_address
                .storeAddress(pool_address)         // pool_address
            .endCell()
        )
    .endCell().asSlice();
    }

    let fp_1 = fp_(router_sample2_wallet_address, 1n, user, pool_address);
    let fp_2 = fp_(router_sample1_wallet_address, 1n, user, pool_address);
    if (a_to_b) {
        // A => B
        await user_sample1_wallet.send(
            provider.sender(),
            {
                value: toNano('0.22'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amount,
                destination: router_address,
                response_destination: user,
                custom_payload: null,
                forward_ton_amount: toNano('0.18'),
                forward_payload: fp_1,
            }
        );
    } else {
        // B => A
        await user_sample2_wallet.send(
            provider.sender(),
            {
                value: toNano('0.22'),
            },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: amount,
                destination: router_address,
                response_destination: user,
                custom_payload: null,
                forward_ton_amount: toNano('0.18'),
                forward_payload: fp_2,
            }
        );
    }
}

async function provider_liquidity(provider: NetworkProvider, router_address: Address, token_master1: Address, token_master2: Address, amount: bigint) {
    const user = provider.sender().address as Address;
    const router = provider.open(Router.Router.fromAddress(router_address));
    const sampleJettonMaster1 = provider.open(SampleJetton.ExampleJettonMaster.fromAddress(token_master1));
    const sampleJettonMaster2 = provider.open(SampleJetton.ExampleJettonMaster.fromAddress(token_master2));
    const user_sample1_wallet_address = await sampleJettonMaster1.getGetWalletAddress(user);
    const user_sample2_wallet_address = await sampleJettonMaster2.getGetWalletAddress(user);
    const router_sample1_wallet_address = await sampleJettonMaster1.getGetWalletAddress(router_address);
    const router_sample2_wallet_address = await sampleJettonMaster2.getGetWalletAddress(router_address);

    const user_sample1_wallet = provider.open(SampleWallet.ExampleJettonWallet.fromAddress(user_sample1_wallet_address));
    const user_sample2_wallet = provider.open(SampleWallet.ExampleJettonWallet.fromAddress(user_sample2_wallet_address));

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

    const fp_1 = fp_(router_sample2_wallet_address, 1n, 1n, 1n);
    const fp_2 = fp_(router_sample1_wallet_address, 1n, 1n, 1n);

    // await user_sample1_wallet.send(
    //     provider.sender(),
    //     {
    //         value: toNano('0.22'),
    //     },
    //     {
    //         $$type: 'JettonTransfer',
    //         query_id: 0n,
    //         amount: amount,
    //         destination: router_address,
    //         response_destination: user,
    //         custom_payload: null,
    //         forward_ton_amount: toNano('0.18'),
    //         forward_payload: fp_1,
    //     }
    // );

    sleep(2000);

    await user_sample2_wallet.send(
        provider.sender(),
        {
            value: toNano('0.22'),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 0n,
            amount: amount,
            destination: router_address,
            response_destination: user,
            custom_payload: null,
            forward_ton_amount: toNano('0.18'),
            forward_payload: fp_2,
        }
    );
}

async function get_pool(provider: NetworkProvider, pool_address: Address) {
    const pool = provider.open(Pool.Pool.fromAddress(pool_address));

    console.log(await pool.getGetPoolData());
}

async function get_router(provider: NetworkProvider, router_address: Address) {
    const router = provider.open(Router.Router.fromAddress(router_address));

    console.log(await router.getGetRouterData());
}


async function deployRouter(provider: NetworkProvider) {
    const deployer = provider.sender().address as Address;
    const router = provider.open(await Router.Router.fromInit(deployer));

    await router.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(router.address);
}