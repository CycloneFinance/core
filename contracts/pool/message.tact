struct PoolData {
    routerAddress: Address;
    reserve0: Int as coins;
    reserve1: Int as coins;
    token0Address: Address;
    token1Address: Address;
    lpFee: Int as coins;
    protocolFee: Int as coins;
    protocolFeeAddress: Address;
    collectedToken0ProtocolFee: Int as coins;
    collectedToken1ProtocolFee: Int as coins;
}

struct ExpectedLiquidity{
    amount0: Int as coins;
    amount1: Int as coins;
}

struct Reserves{
    reserve0: Int as coins;
    reserve1: Int as coins;
}

message PayTo{
    owner: Address;
    tokenAAmount: Int as coins;
    walletTokenAAddress: Address;
    tokenBAmount: Int as coins;
    walletTokenBAddress: Address;
    remainRef: Slice;
}


message(0x355a3065) ProvideLiquidity {
    fromAddress: Address;
    jettonAmount0: Int as coins;
    jettonAmount1: Int as coins;
    minLPOut: Int as coins;
}

message BurnNotification {
    fromAddress: Address;
    jettonAmount: Int as coins;
    responseAddress: Address;
}

message RefundMe {
    tot_am0: Int;
    tot_am1: Int;
    user_address: Address;
}

message SetFees {
    newLPFee: Int as coins;
    newProtocolFees: Int as coins;
    newProtocolFeeAddress: Address;
}

message Swap {
    fromAddress: Address;
    jettonAmount: Int as coins;
    tokenWallet: Address;
    toAddress: Address;
    minOutput: Int as coins;
    remainRef: Slice;
}