// struct SwapStep {
//     pool: Address;
//     tokenIn: Address;
//     to: Address;
//     withdrawMode: Int;
//     callback: Address;
// }
struct LPData{
    wallet0: Address;
    wallet1: Address;
    precision0: Int;
    precision1: Int;
    min_lp_out: Int;
}

struct RouterData{
    isLocked: Bool;
    adminAddress: Address;
}

struct PoolState{
    init: StateInit;
    pool_address: Address;
}

message CollectFees{
    token0: Address;
    token1: Address;
}

message UpdateAdmin{
    newAdmin: Address;
}
