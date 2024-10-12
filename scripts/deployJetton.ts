import { Address, toNano, beginCell } from '@ton/core';
import * as SampleJetton from "../build/sample/tact_ExampleJettonMaster";
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from "../utils/jetton-helpers";

export async function run(provider: NetworkProvider) {
    // const to = Address.parse("UQBcangUJkVLsWgSakP5zRgvq5tIiMirayk6HAfnP5fcAWe8");
    const to  = provider.sender().address as Address;
    const USDA_Address = Address.parse("EQAac07GkL_Fawf_XeK3V8Un53-2M50TsSBMpi-YQsa23btE");
    const USDB_Address = Address.parse("kQCfDaQpLIYnGlk6p06sfUt5Ru86fH4J52KpcF1w-rJuMrNY");
    const amount = toNano('1000000');
    // await mintJetton(provider, to, USDA_Address, amount);
    await mintJetton(provider, to, USDB_Address, amount);
    // await getData(provider, USDA_Address);
    // await getData(provider, USDB_Address);
}
async function getData(provider: NetworkProvider, jetton_Address: Address) {
    const jetton = provider.open(SampleJetton.ExampleJettonMaster.fromAddress(jetton_Address));
    const data = await jetton.getGetJettonData()
    console.log(data.total_supply);
}

async function mintJetton(provider: NetworkProvider, to: Address, jetton_Address: Address, amount: bigint) {
    const jetton = provider.open(SampleJetton.ExampleJettonMaster.fromAddress(jetton_Address));

    await jetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'JettonMint',
            origin: provider.sender().address as Address,
            receiver: to,
            amount: amount,
            custom_payload: null,
            forward_ton_amount: 0n,
            forward_payload: beginCell().endCell().asSlice(),
        }
    );
}

async function deployJetton(provider: NetworkProvider) {
    const jetton_prams_USDA = {
        name: "USDA",
        description: "This is USDA",
        symbol: "USDA",
        image: "",
    };

    const jetton_prams_USDB = {
        name: "USDB",
        description: "This is USDB",
        symbol: "USDB",
        image: "",
    };

    const content_USDA = buildOnchainMetadata(jetton_prams_USDA);
    const content_USDB = buildOnchainMetadata(jetton_prams_USDB);
    const USDA = provider.open(await SampleJetton.ExampleJettonMaster.fromInit(provider.sender().address as Address, content_USDA));
    const USDB = provider.open(await SampleJetton.ExampleJettonMaster.fromInit(provider.sender().address as Address, content_USDB));

    await USDA.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await USDB.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(USDA.address);
    await provider.waitForDeploy(USDB.address);
}