import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Pool$Data = {
    $$type: 'Pool$Data';
    routerAddress: Address;
    lpFee: bigint;
    protocolFee: bigint;
    protocolFeesAddress: Address;
    collectedTokenAProtocolFees: bigint;
    collectedTokenBProtocolFees: bigint;
    wallet0: Address;
    wallet1: Address;
    reserve0: bigint;
    reserve1: bigint;
    token0PrecisionMultiplier: bigint;
    token1PrecisionMultiplier: bigint;
    poolParams: PoolParams;
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    jetton_content: Cell;
    test: boolean;
}

export function storePool$Data(src: Pool$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.routerAddress);
        b_0.storeCoins(src.lpFee);
        b_0.storeCoins(src.protocolFee);
        b_0.storeAddress(src.protocolFeesAddress);
        b_0.storeCoins(src.collectedTokenAProtocolFees);
        let b_1 = new Builder();
        b_1.storeCoins(src.collectedTokenBProtocolFees);
        b_1.storeAddress(src.wallet0);
        b_1.storeAddress(src.wallet1);
        b_1.storeCoins(src.reserve0);
        b_1.storeCoins(src.reserve1);
        let b_2 = new Builder();
        b_2.storeInt(src.token0PrecisionMultiplier, 257);
        b_2.storeInt(src.token1PrecisionMultiplier, 257);
        let b_3 = new Builder();
        b_3.store(storePoolParams(src.poolParams));
        let b_4 = new Builder();
        b_4.storeInt(src.total_supply, 257);
        b_4.storeBit(src.mintable);
        b_4.storeAddress(src.owner);
        b_4.storeRef(src.jetton_content);
        b_4.storeBit(src.test);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPool$Data(slice: Slice) {
    let sc_0 = slice;
    let _routerAddress = sc_0.loadAddress();
    let _lpFee = sc_0.loadCoins();
    let _protocolFee = sc_0.loadCoins();
    let _protocolFeesAddress = sc_0.loadAddress();
    let _collectedTokenAProtocolFees = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _collectedTokenBProtocolFees = sc_1.loadCoins();
    let _wallet0 = sc_1.loadAddress();
    let _wallet1 = sc_1.loadAddress();
    let _reserve0 = sc_1.loadCoins();
    let _reserve1 = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _token0PrecisionMultiplier = sc_2.loadIntBig(257);
    let _token1PrecisionMultiplier = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _poolParams = loadPoolParams(sc_3);
    let sc_4 = sc_3.loadRef().beginParse();
    let _total_supply = sc_4.loadIntBig(257);
    let _mintable = sc_4.loadBit();
    let _owner = sc_4.loadAddress();
    let _jetton_content = sc_4.loadRef();
    let _test = sc_4.loadBit();
    return { $$type: 'Pool$Data' as const, routerAddress: _routerAddress, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeesAddress: _protocolFeesAddress, collectedTokenAProtocolFees: _collectedTokenAProtocolFees, collectedTokenBProtocolFees: _collectedTokenBProtocolFees, wallet0: _wallet0, wallet1: _wallet1, reserve0: _reserve0, reserve1: _reserve1, token0PrecisionMultiplier: _token0PrecisionMultiplier, token1PrecisionMultiplier: _token1PrecisionMultiplier, poolParams: _poolParams, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, test: _test };
}

function loadTuplePool$Data(source: TupleReader) {
    let _routerAddress = source.readAddress();
    let _lpFee = source.readBigNumber();
    let _protocolFee = source.readBigNumber();
    let _protocolFeesAddress = source.readAddress();
    let _collectedTokenAProtocolFees = source.readBigNumber();
    let _collectedTokenBProtocolFees = source.readBigNumber();
    let _wallet0 = source.readAddress();
    let _wallet1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0PrecisionMultiplier = source.readBigNumber();
    let _token1PrecisionMultiplier = source.readBigNumber();
    const _poolParams = loadTuplePoolParams(source);
    let _total_supply = source.readBigNumber();
    source = source.readTuple();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jetton_content = source.readCell();
    let _test = source.readBoolean();
    return { $$type: 'Pool$Data' as const, routerAddress: _routerAddress, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeesAddress: _protocolFeesAddress, collectedTokenAProtocolFees: _collectedTokenAProtocolFees, collectedTokenBProtocolFees: _collectedTokenBProtocolFees, wallet0: _wallet0, wallet1: _wallet1, reserve0: _reserve0, reserve1: _reserve1, token0PrecisionMultiplier: _token0PrecisionMultiplier, token1PrecisionMultiplier: _token1PrecisionMultiplier, poolParams: _poolParams, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, test: _test };
}

function loadGetterTuplePool$Data(source: TupleReader) {
    let _routerAddress = source.readAddress();
    let _lpFee = source.readBigNumber();
    let _protocolFee = source.readBigNumber();
    let _protocolFeesAddress = source.readAddress();
    let _collectedTokenAProtocolFees = source.readBigNumber();
    let _collectedTokenBProtocolFees = source.readBigNumber();
    let _wallet0 = source.readAddress();
    let _wallet1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0PrecisionMultiplier = source.readBigNumber();
    let _token1PrecisionMultiplier = source.readBigNumber();
    const _poolParams = loadGetterTuplePoolParams(source);
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jetton_content = source.readCell();
    let _test = source.readBoolean();
    return { $$type: 'Pool$Data' as const, routerAddress: _routerAddress, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeesAddress: _protocolFeesAddress, collectedTokenAProtocolFees: _collectedTokenAProtocolFees, collectedTokenBProtocolFees: _collectedTokenBProtocolFees, wallet0: _wallet0, wallet1: _wallet1, reserve0: _reserve0, reserve1: _reserve1, token0PrecisionMultiplier: _token0PrecisionMultiplier, token1PrecisionMultiplier: _token1PrecisionMultiplier, poolParams: _poolParams, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, test: _test };
}

function storeTuplePool$Data(source: Pool$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.routerAddress);
    builder.writeNumber(source.lpFee);
    builder.writeNumber(source.protocolFee);
    builder.writeAddress(source.protocolFeesAddress);
    builder.writeNumber(source.collectedTokenAProtocolFees);
    builder.writeNumber(source.collectedTokenBProtocolFees);
    builder.writeAddress(source.wallet0);
    builder.writeAddress(source.wallet1);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeNumber(source.token0PrecisionMultiplier);
    builder.writeNumber(source.token1PrecisionMultiplier);
    builder.writeTuple(storeTuplePoolParams(source.poolParams));
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.jetton_content);
    builder.writeBoolean(source.test);
    return builder.build();
}

function dictValueParserPool$Data(): DictionaryValue<Pool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPool$Data(src.loadRef().beginParse());
        }
    }
}

export type LPData = {
    $$type: 'LPData';
    wallet0: Address;
    wallet1: Address;
    precision0: bigint;
    precision1: bigint;
    min_lp_out: bigint;
}

export function storeLPData(src: LPData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.wallet0);
        b_0.storeAddress(src.wallet1);
        b_0.storeInt(src.precision0, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.precision1, 257);
        b_1.storeInt(src.min_lp_out, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPData(slice: Slice) {
    let sc_0 = slice;
    let _wallet0 = sc_0.loadAddress();
    let _wallet1 = sc_0.loadAddress();
    let _precision0 = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _precision1 = sc_1.loadIntBig(257);
    let _min_lp_out = sc_1.loadIntBig(257);
    return { $$type: 'LPData' as const, wallet0: _wallet0, wallet1: _wallet1, precision0: _precision0, precision1: _precision1, min_lp_out: _min_lp_out };
}

function loadTupleLPData(source: TupleReader) {
    let _wallet0 = source.readAddress();
    let _wallet1 = source.readAddress();
    let _precision0 = source.readBigNumber();
    let _precision1 = source.readBigNumber();
    let _min_lp_out = source.readBigNumber();
    return { $$type: 'LPData' as const, wallet0: _wallet0, wallet1: _wallet1, precision0: _precision0, precision1: _precision1, min_lp_out: _min_lp_out };
}

function loadGetterTupleLPData(source: TupleReader) {
    let _wallet0 = source.readAddress();
    let _wallet1 = source.readAddress();
    let _precision0 = source.readBigNumber();
    let _precision1 = source.readBigNumber();
    let _min_lp_out = source.readBigNumber();
    return { $$type: 'LPData' as const, wallet0: _wallet0, wallet1: _wallet1, precision0: _precision0, precision1: _precision1, min_lp_out: _min_lp_out };
}

function storeTupleLPData(source: LPData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet0);
    builder.writeAddress(source.wallet1);
    builder.writeNumber(source.precision0);
    builder.writeNumber(source.precision1);
    builder.writeNumber(source.min_lp_out);
    return builder.build();
}

function dictValueParserLPData(): DictionaryValue<LPData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLPData(src)).endCell());
        },
        parse: (src) => {
            return loadLPData(src.loadRef().beginParse());
        }
    }
}

export type RouterData = {
    $$type: 'RouterData';
    isLocked: boolean;
    adminAddress: Address;
}

export function storeRouterData(src: RouterData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isLocked);
        b_0.storeAddress(src.adminAddress);
    };
}

export function loadRouterData(slice: Slice) {
    let sc_0 = slice;
    let _isLocked = sc_0.loadBit();
    let _adminAddress = sc_0.loadAddress();
    return { $$type: 'RouterData' as const, isLocked: _isLocked, adminAddress: _adminAddress };
}

function loadTupleRouterData(source: TupleReader) {
    let _isLocked = source.readBoolean();
    let _adminAddress = source.readAddress();
    return { $$type: 'RouterData' as const, isLocked: _isLocked, adminAddress: _adminAddress };
}

function loadGetterTupleRouterData(source: TupleReader) {
    let _isLocked = source.readBoolean();
    let _adminAddress = source.readAddress();
    return { $$type: 'RouterData' as const, isLocked: _isLocked, adminAddress: _adminAddress };
}

function storeTupleRouterData(source: RouterData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isLocked);
    builder.writeAddress(source.adminAddress);
    return builder.build();
}

function dictValueParserRouterData(): DictionaryValue<RouterData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRouterData(src)).endCell());
        },
        parse: (src) => {
            return loadRouterData(src.loadRef().beginParse());
        }
    }
}

export type PoolState = {
    $$type: 'PoolState';
    init: StateInit;
    pool_address: Address;
}

export function storePoolState(src: PoolState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeStateInit(src.init));
        b_0.storeAddress(src.pool_address);
    };
}

export function loadPoolState(slice: Slice) {
    let sc_0 = slice;
    let _init = loadStateInit(sc_0);
    let _pool_address = sc_0.loadAddress();
    return { $$type: 'PoolState' as const, init: _init, pool_address: _pool_address };
}

function loadTuplePoolState(source: TupleReader) {
    const _init = loadTupleStateInit(source);
    let _pool_address = source.readAddress();
    return { $$type: 'PoolState' as const, init: _init, pool_address: _pool_address };
}

function loadGetterTuplePoolState(source: TupleReader) {
    const _init = loadGetterTupleStateInit(source);
    let _pool_address = source.readAddress();
    return { $$type: 'PoolState' as const, init: _init, pool_address: _pool_address };
}

function storeTuplePoolState(source: PoolState) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleStateInit(source.init));
    builder.writeAddress(source.pool_address);
    return builder.build();
}

function dictValueParserPoolState(): DictionaryValue<PoolState> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolState(src)).endCell());
        },
        parse: (src) => {
            return loadPoolState(src.loadRef().beginParse());
        }
    }
}

export type CollectFees = {
    $$type: 'CollectFees';
    token0: Address;
    token1: Address;
}

export function storeCollectFees(src: CollectFees) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2367611937, 32);
        b_0.storeAddress(src.token0);
        b_0.storeAddress(src.token1);
    };
}

export function loadCollectFees(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2367611937) { throw Error('Invalid prefix'); }
    let _token0 = sc_0.loadAddress();
    let _token1 = sc_0.loadAddress();
    return { $$type: 'CollectFees' as const, token0: _token0, token1: _token1 };
}

function loadTupleCollectFees(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    return { $$type: 'CollectFees' as const, token0: _token0, token1: _token1 };
}

function loadGetterTupleCollectFees(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    return { $$type: 'CollectFees' as const, token0: _token0, token1: _token1 };
}

function storeTupleCollectFees(source: CollectFees) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    return builder.build();
}

function dictValueParserCollectFees(): DictionaryValue<CollectFees> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectFees(src)).endCell());
        },
        parse: (src) => {
            return loadCollectFees(src.loadRef().beginParse());
        }
    }
}

export type UpdateAdmin = {
    $$type: 'UpdateAdmin';
    newAdmin: Address;
}

export function storeUpdateAdmin(src: UpdateAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2286520683, 32);
        b_0.storeAddress(src.newAdmin);
    };
}

export function loadUpdateAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2286520683) { throw Error('Invalid prefix'); }
    let _newAdmin = sc_0.loadAddress();
    return { $$type: 'UpdateAdmin' as const, newAdmin: _newAdmin };
}

function loadTupleUpdateAdmin(source: TupleReader) {
    let _newAdmin = source.readAddress();
    return { $$type: 'UpdateAdmin' as const, newAdmin: _newAdmin };
}

function loadGetterTupleUpdateAdmin(source: TupleReader) {
    let _newAdmin = source.readAddress();
    return { $$type: 'UpdateAdmin' as const, newAdmin: _newAdmin };
}

function storeTupleUpdateAdmin(source: UpdateAdmin) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newAdmin);
    return builder.build();
}

function dictValueParserUpdateAdmin(): DictionaryValue<UpdateAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateAdmin(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Slice;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleJettonBurn(source: JettonBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonExcesses = {
    $$type: 'JettonExcesses';
    query_id: bigint;
}

export function storeJettonExcesses(src: JettonExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadJettonExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function loadTupleJettonExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function loadGetterTupleJettonExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function storeTupleJettonExcesses(source: JettonExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    }
}

export type JettonInternalTransfer = {
    $$type: 'JettonInternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_address: Address;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeJettonInternalTransfer(src: JettonInternalTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_address);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonInternalTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_address = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonInternalTransfer(source: JettonInternalTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_address);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonInternalTransfer(): DictionaryValue<JettonInternalTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonInternalTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadJettonBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleJettonBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadGetterTupleJettonBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    jetton: Address;
    jetton_wallet_code: Cell;
}

export function storeWalletData(src: WalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _jetton = sc_0.loadAddress();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function loadGetterTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleWalletData(source: WalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    admin_address: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.admin_address);
        b_0.storeRef(src.jetton_content);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _admin_address = sc_0.loadAddress();
    let _jetton_content = sc_0.loadRef();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin_address = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin_address = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.admin_address);
    builder.writeCell(source.jetton_content);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeJettonMint(src: JettonMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2310479113, 32);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.receiver);
        b_0.storeInt(src.amount, 257);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2310479113) { throw Error('Invalid prefix'); }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonMint(source: JettonMint) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonMint(): DictionaryValue<JettonMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
        }
    }
}

export type PoolParams = {
    $$type: 'PoolParams';
    initialA: bigint;
    futureA: bigint;
    initialTime: bigint;
    futureTime: bigint;
}

export function storePoolParams(src: PoolParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.initialA, 257);
        b_0.storeInt(src.futureA, 257);
        b_0.storeInt(src.initialTime, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.futureTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolParams(slice: Slice) {
    let sc_0 = slice;
    let _initialA = sc_0.loadIntBig(257);
    let _futureA = sc_0.loadIntBig(257);
    let _initialTime = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _futureTime = sc_1.loadIntBig(257);
    return { $$type: 'PoolParams' as const, initialA: _initialA, futureA: _futureA, initialTime: _initialTime, futureTime: _futureTime };
}

function loadTuplePoolParams(source: TupleReader) {
    let _initialA = source.readBigNumber();
    let _futureA = source.readBigNumber();
    let _initialTime = source.readBigNumber();
    let _futureTime = source.readBigNumber();
    return { $$type: 'PoolParams' as const, initialA: _initialA, futureA: _futureA, initialTime: _initialTime, futureTime: _futureTime };
}

function loadGetterTuplePoolParams(source: TupleReader) {
    let _initialA = source.readBigNumber();
    let _futureA = source.readBigNumber();
    let _initialTime = source.readBigNumber();
    let _futureTime = source.readBigNumber();
    return { $$type: 'PoolParams' as const, initialA: _initialA, futureA: _futureA, initialTime: _initialTime, futureTime: _futureTime };
}

function storeTuplePoolParams(source: PoolParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.initialA);
    builder.writeNumber(source.futureA);
    builder.writeNumber(source.initialTime);
    builder.writeNumber(source.futureTime);
    return builder.build();
}

function dictValueParserPoolParams(): DictionaryValue<PoolParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolParams(src)).endCell());
        },
        parse: (src) => {
            return loadPoolParams(src.loadRef().beginParse());
        }
    }
}

export type AmountOut = {
    $$type: 'AmountOut';
    amountOut: bigint;
    feeIn: bigint;
}

export function storeAmountOut(src: AmountOut) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.amountOut);
        b_0.storeCoins(src.feeIn);
    };
}

export function loadAmountOut(slice: Slice) {
    let sc_0 = slice;
    let _amountOut = sc_0.loadCoins();
    let _feeIn = sc_0.loadCoins();
    return { $$type: 'AmountOut' as const, amountOut: _amountOut, feeIn: _feeIn };
}

function loadTupleAmountOut(source: TupleReader) {
    let _amountOut = source.readBigNumber();
    let _feeIn = source.readBigNumber();
    return { $$type: 'AmountOut' as const, amountOut: _amountOut, feeIn: _feeIn };
}

function loadGetterTupleAmountOut(source: TupleReader) {
    let _amountOut = source.readBigNumber();
    let _feeIn = source.readBigNumber();
    return { $$type: 'AmountOut' as const, amountOut: _amountOut, feeIn: _feeIn };
}

function storeTupleAmountOut(source: AmountOut) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amountOut);
    builder.writeNumber(source.feeIn);
    return builder.build();
}

function dictValueParserAmountOut(): DictionaryValue<AmountOut> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAmountOut(src)).endCell());
        },
        parse: (src) => {
            return loadAmountOut(src.loadRef().beginParse());
        }
    }
}

export type ExampleJettonWallet$Data = {
    $$type: 'ExampleJettonWallet$Data';
    balance: bigint;
    owner: Address;
    jetton_master: Address;
}

export function storeExampleJettonWallet$Data(src: ExampleJettonWallet$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
    };
}

export function loadExampleJettonWallet$Data(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _jetton_master = sc_0.loadAddress();
    return { $$type: 'ExampleJettonWallet$Data' as const, balance: _balance, owner: _owner, jetton_master: _jetton_master };
}

function loadTupleExampleJettonWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton_master = source.readAddress();
    return { $$type: 'ExampleJettonWallet$Data' as const, balance: _balance, owner: _owner, jetton_master: _jetton_master };
}

function loadGetterTupleExampleJettonWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton_master = source.readAddress();
    return { $$type: 'ExampleJettonWallet$Data' as const, balance: _balance, owner: _owner, jetton_master: _jetton_master };
}

function storeTupleExampleJettonWallet$Data(source: ExampleJettonWallet$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton_master);
    return builder.build();
}

function dictValueParserExampleJettonWallet$Data(): DictionaryValue<ExampleJettonWallet$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExampleJettonWallet$Data(src)).endCell());
        },
        parse: (src) => {
            return loadExampleJettonWallet$Data(src.loadRef().beginParse());
        }
    }
}

export type PoolData = {
    $$type: 'PoolData';
    routerAddress: Address;
    reserve0: bigint;
    reserve1: bigint;
    token0Address: Address;
    token1Address: Address;
    lpFee: bigint;
    protocolFee: bigint;
    protocolFeeAddress: Address;
    collectedToken0ProtocolFee: bigint;
    collectedToken1ProtocolFee: bigint;
}

export function storePoolData(src: PoolData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.routerAddress);
        b_0.storeCoins(src.reserve0);
        b_0.storeCoins(src.reserve1);
        b_0.storeAddress(src.token0Address);
        let b_1 = new Builder();
        b_1.storeAddress(src.token1Address);
        b_1.storeCoins(src.lpFee);
        b_1.storeCoins(src.protocolFee);
        b_1.storeAddress(src.protocolFeeAddress);
        b_1.storeCoins(src.collectedToken0ProtocolFee);
        let b_2 = new Builder();
        b_2.storeCoins(src.collectedToken1ProtocolFee);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolData(slice: Slice) {
    let sc_0 = slice;
    let _routerAddress = sc_0.loadAddress();
    let _reserve0 = sc_0.loadCoins();
    let _reserve1 = sc_0.loadCoins();
    let _token0Address = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _token1Address = sc_1.loadAddress();
    let _lpFee = sc_1.loadCoins();
    let _protocolFee = sc_1.loadCoins();
    let _protocolFeeAddress = sc_1.loadAddress();
    let _collectedToken0ProtocolFee = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _collectedToken1ProtocolFee = sc_2.loadCoins();
    return { $$type: 'PoolData' as const, routerAddress: _routerAddress, reserve0: _reserve0, reserve1: _reserve1, token0Address: _token0Address, token1Address: _token1Address, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeeAddress: _protocolFeeAddress, collectedToken0ProtocolFee: _collectedToken0ProtocolFee, collectedToken1ProtocolFee: _collectedToken1ProtocolFee };
}

function loadTuplePoolData(source: TupleReader) {
    let _routerAddress = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0Address = source.readAddress();
    let _token1Address = source.readAddress();
    let _lpFee = source.readBigNumber();
    let _protocolFee = source.readBigNumber();
    let _protocolFeeAddress = source.readAddress();
    let _collectedToken0ProtocolFee = source.readBigNumber();
    let _collectedToken1ProtocolFee = source.readBigNumber();
    return { $$type: 'PoolData' as const, routerAddress: _routerAddress, reserve0: _reserve0, reserve1: _reserve1, token0Address: _token0Address, token1Address: _token1Address, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeeAddress: _protocolFeeAddress, collectedToken0ProtocolFee: _collectedToken0ProtocolFee, collectedToken1ProtocolFee: _collectedToken1ProtocolFee };
}

function loadGetterTuplePoolData(source: TupleReader) {
    let _routerAddress = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0Address = source.readAddress();
    let _token1Address = source.readAddress();
    let _lpFee = source.readBigNumber();
    let _protocolFee = source.readBigNumber();
    let _protocolFeeAddress = source.readAddress();
    let _collectedToken0ProtocolFee = source.readBigNumber();
    let _collectedToken1ProtocolFee = source.readBigNumber();
    return { $$type: 'PoolData' as const, routerAddress: _routerAddress, reserve0: _reserve0, reserve1: _reserve1, token0Address: _token0Address, token1Address: _token1Address, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeeAddress: _protocolFeeAddress, collectedToken0ProtocolFee: _collectedToken0ProtocolFee, collectedToken1ProtocolFee: _collectedToken1ProtocolFee };
}

function storeTuplePoolData(source: PoolData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.routerAddress);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.token0Address);
    builder.writeAddress(source.token1Address);
    builder.writeNumber(source.lpFee);
    builder.writeNumber(source.protocolFee);
    builder.writeAddress(source.protocolFeeAddress);
    builder.writeNumber(source.collectedToken0ProtocolFee);
    builder.writeNumber(source.collectedToken1ProtocolFee);
    return builder.build();
}

function dictValueParserPoolData(): DictionaryValue<PoolData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolData(src)).endCell());
        },
        parse: (src) => {
            return loadPoolData(src.loadRef().beginParse());
        }
    }
}

export type ExpectedLiquidity = {
    $$type: 'ExpectedLiquidity';
    amount0: bigint;
    amount1: bigint;
}

export function storeExpectedLiquidity(src: ExpectedLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.amount0);
        b_0.storeCoins(src.amount1);
    };
}

export function loadExpectedLiquidity(slice: Slice) {
    let sc_0 = slice;
    let _amount0 = sc_0.loadCoins();
    let _amount1 = sc_0.loadCoins();
    return { $$type: 'ExpectedLiquidity' as const, amount0: _amount0, amount1: _amount1 };
}

function loadTupleExpectedLiquidity(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    return { $$type: 'ExpectedLiquidity' as const, amount0: _amount0, amount1: _amount1 };
}

function loadGetterTupleExpectedLiquidity(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    return { $$type: 'ExpectedLiquidity' as const, amount0: _amount0, amount1: _amount1 };
}

function storeTupleExpectedLiquidity(source: ExpectedLiquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount0);
    builder.writeNumber(source.amount1);
    return builder.build();
}

function dictValueParserExpectedLiquidity(): DictionaryValue<ExpectedLiquidity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExpectedLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadExpectedLiquidity(src.loadRef().beginParse());
        }
    }
}

export type Reserves = {
    $$type: 'Reserves';
    reserve0: bigint;
    reserve1: bigint;
}

export function storeReserves(src: Reserves) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.reserve0);
        b_0.storeCoins(src.reserve1);
    };
}

export function loadReserves(slice: Slice) {
    let sc_0 = slice;
    let _reserve0 = sc_0.loadCoins();
    let _reserve1 = sc_0.loadCoins();
    return { $$type: 'Reserves' as const, reserve0: _reserve0, reserve1: _reserve1 };
}

function loadTupleReserves(source: TupleReader) {
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    return { $$type: 'Reserves' as const, reserve0: _reserve0, reserve1: _reserve1 };
}

function loadGetterTupleReserves(source: TupleReader) {
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    return { $$type: 'Reserves' as const, reserve0: _reserve0, reserve1: _reserve1 };
}

function storeTupleReserves(source: Reserves) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    return builder.build();
}

function dictValueParserReserves(): DictionaryValue<Reserves> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReserves(src)).endCell());
        },
        parse: (src) => {
            return loadReserves(src.loadRef().beginParse());
        }
    }
}

export type PayTo = {
    $$type: 'PayTo';
    owner: Address;
    tokenAAmount: bigint;
    walletTokenAAddress: Address;
    tokenBAmount: bigint;
    walletTokenBAddress: Address;
    remainRef: Slice;
}

export function storePayTo(src: PayTo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2200270478, 32);
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.tokenAAmount);
        b_0.storeAddress(src.walletTokenAAddress);
        b_0.storeCoins(src.tokenBAmount);
        let b_1 = new Builder();
        b_1.storeAddress(src.walletTokenBAddress);
        b_1.storeRef(src.remainRef.asCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPayTo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2200270478) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _tokenAAmount = sc_0.loadCoins();
    let _walletTokenAAddress = sc_0.loadAddress();
    let _tokenBAmount = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _walletTokenBAddress = sc_1.loadAddress();
    let _remainRef = sc_1.loadRef().asSlice();
    return { $$type: 'PayTo' as const, owner: _owner, tokenAAmount: _tokenAAmount, walletTokenAAddress: _walletTokenAAddress, tokenBAmount: _tokenBAmount, walletTokenBAddress: _walletTokenBAddress, remainRef: _remainRef };
}

function loadTuplePayTo(source: TupleReader) {
    let _owner = source.readAddress();
    let _tokenAAmount = source.readBigNumber();
    let _walletTokenAAddress = source.readAddress();
    let _tokenBAmount = source.readBigNumber();
    let _walletTokenBAddress = source.readAddress();
    let _remainRef = source.readCell().asSlice();
    return { $$type: 'PayTo' as const, owner: _owner, tokenAAmount: _tokenAAmount, walletTokenAAddress: _walletTokenAAddress, tokenBAmount: _tokenBAmount, walletTokenBAddress: _walletTokenBAddress, remainRef: _remainRef };
}

function loadGetterTuplePayTo(source: TupleReader) {
    let _owner = source.readAddress();
    let _tokenAAmount = source.readBigNumber();
    let _walletTokenAAddress = source.readAddress();
    let _tokenBAmount = source.readBigNumber();
    let _walletTokenBAddress = source.readAddress();
    let _remainRef = source.readCell().asSlice();
    return { $$type: 'PayTo' as const, owner: _owner, tokenAAmount: _tokenAAmount, walletTokenAAddress: _walletTokenAAddress, tokenBAmount: _tokenBAmount, walletTokenBAddress: _walletTokenBAddress, remainRef: _remainRef };
}

function storeTuplePayTo(source: PayTo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.tokenAAmount);
    builder.writeAddress(source.walletTokenAAddress);
    builder.writeNumber(source.tokenBAmount);
    builder.writeAddress(source.walletTokenBAddress);
    builder.writeSlice(source.remainRef.asCell());
    return builder.build();
}

function dictValueParserPayTo(): DictionaryValue<PayTo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePayTo(src)).endCell());
        },
        parse: (src) => {
            return loadPayTo(src.loadRef().beginParse());
        }
    }
}

export type ProvideLiquidity = {
    $$type: 'ProvideLiquidity';
    fromAddress: Address;
    jettonAmount0: bigint;
    jettonAmount1: bigint;
    minLPOut: bigint;
}

export function storeProvideLiquidity(src: ProvideLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(895103077, 32);
        b_0.storeAddress(src.fromAddress);
        b_0.storeCoins(src.jettonAmount0);
        b_0.storeCoins(src.jettonAmount1);
        b_0.storeCoins(src.minLPOut);
    };
}

export function loadProvideLiquidity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 895103077) { throw Error('Invalid prefix'); }
    let _fromAddress = sc_0.loadAddress();
    let _jettonAmount0 = sc_0.loadCoins();
    let _jettonAmount1 = sc_0.loadCoins();
    let _minLPOut = sc_0.loadCoins();
    return { $$type: 'ProvideLiquidity' as const, fromAddress: _fromAddress, jettonAmount0: _jettonAmount0, jettonAmount1: _jettonAmount1, minLPOut: _minLPOut };
}

function loadTupleProvideLiquidity(source: TupleReader) {
    let _fromAddress = source.readAddress();
    let _jettonAmount0 = source.readBigNumber();
    let _jettonAmount1 = source.readBigNumber();
    let _minLPOut = source.readBigNumber();
    return { $$type: 'ProvideLiquidity' as const, fromAddress: _fromAddress, jettonAmount0: _jettonAmount0, jettonAmount1: _jettonAmount1, minLPOut: _minLPOut };
}

function loadGetterTupleProvideLiquidity(source: TupleReader) {
    let _fromAddress = source.readAddress();
    let _jettonAmount0 = source.readBigNumber();
    let _jettonAmount1 = source.readBigNumber();
    let _minLPOut = source.readBigNumber();
    return { $$type: 'ProvideLiquidity' as const, fromAddress: _fromAddress, jettonAmount0: _jettonAmount0, jettonAmount1: _jettonAmount1, minLPOut: _minLPOut };
}

function storeTupleProvideLiquidity(source: ProvideLiquidity) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.fromAddress);
    builder.writeNumber(source.jettonAmount0);
    builder.writeNumber(source.jettonAmount1);
    builder.writeNumber(source.minLPOut);
    return builder.build();
}

function dictValueParserProvideLiquidity(): DictionaryValue<ProvideLiquidity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadProvideLiquidity(src.loadRef().beginParse());
        }
    }
}

export type BurnNotification = {
    $$type: 'BurnNotification';
    fromAddress: Address;
    jettonAmount: bigint;
    responseAddress: Address;
}

export function storeBurnNotification(src: BurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1023788527, 32);
        b_0.storeAddress(src.fromAddress);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.responseAddress);
    };
}

export function loadBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1023788527) { throw Error('Invalid prefix'); }
    let _fromAddress = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadCoins();
    let _responseAddress = sc_0.loadAddress();
    return { $$type: 'BurnNotification' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, responseAddress: _responseAddress };
}

function loadTupleBurnNotification(source: TupleReader) {
    let _fromAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _responseAddress = source.readAddress();
    return { $$type: 'BurnNotification' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, responseAddress: _responseAddress };
}

function loadGetterTupleBurnNotification(source: TupleReader) {
    let _fromAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _responseAddress = source.readAddress();
    return { $$type: 'BurnNotification' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, responseAddress: _responseAddress };
}

function storeTupleBurnNotification(source: BurnNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.fromAddress);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.responseAddress);
    return builder.build();
}

function dictValueParserBurnNotification(): DictionaryValue<BurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type RefundMe = {
    $$type: 'RefundMe';
    tot_am0: bigint;
    tot_am1: bigint;
    user_address: Address;
}

export function storeRefundMe(src: RefundMe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1209260035, 32);
        b_0.storeInt(src.tot_am0, 257);
        b_0.storeInt(src.tot_am1, 257);
        b_0.storeAddress(src.user_address);
    };
}

export function loadRefundMe(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1209260035) { throw Error('Invalid prefix'); }
    let _tot_am0 = sc_0.loadIntBig(257);
    let _tot_am1 = sc_0.loadIntBig(257);
    let _user_address = sc_0.loadAddress();
    return { $$type: 'RefundMe' as const, tot_am0: _tot_am0, tot_am1: _tot_am1, user_address: _user_address };
}

function loadTupleRefundMe(source: TupleReader) {
    let _tot_am0 = source.readBigNumber();
    let _tot_am1 = source.readBigNumber();
    let _user_address = source.readAddress();
    return { $$type: 'RefundMe' as const, tot_am0: _tot_am0, tot_am1: _tot_am1, user_address: _user_address };
}

function loadGetterTupleRefundMe(source: TupleReader) {
    let _tot_am0 = source.readBigNumber();
    let _tot_am1 = source.readBigNumber();
    let _user_address = source.readAddress();
    return { $$type: 'RefundMe' as const, tot_am0: _tot_am0, tot_am1: _tot_am1, user_address: _user_address };
}

function storeTupleRefundMe(source: RefundMe) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tot_am0);
    builder.writeNumber(source.tot_am1);
    builder.writeAddress(source.user_address);
    return builder.build();
}

function dictValueParserRefundMe(): DictionaryValue<RefundMe> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRefundMe(src)).endCell());
        },
        parse: (src) => {
            return loadRefundMe(src.loadRef().beginParse());
        }
    }
}

export type SetFees = {
    $$type: 'SetFees';
    newLPFee: bigint;
    newProtocolFees: bigint;
    newProtocolFeeAddress: Address;
}

export function storeSetFees(src: SetFees) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1422094576, 32);
        b_0.storeCoins(src.newLPFee);
        b_0.storeCoins(src.newProtocolFees);
        b_0.storeAddress(src.newProtocolFeeAddress);
    };
}

export function loadSetFees(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1422094576) { throw Error('Invalid prefix'); }
    let _newLPFee = sc_0.loadCoins();
    let _newProtocolFees = sc_0.loadCoins();
    let _newProtocolFeeAddress = sc_0.loadAddress();
    return { $$type: 'SetFees' as const, newLPFee: _newLPFee, newProtocolFees: _newProtocolFees, newProtocolFeeAddress: _newProtocolFeeAddress };
}

function loadTupleSetFees(source: TupleReader) {
    let _newLPFee = source.readBigNumber();
    let _newProtocolFees = source.readBigNumber();
    let _newProtocolFeeAddress = source.readAddress();
    return { $$type: 'SetFees' as const, newLPFee: _newLPFee, newProtocolFees: _newProtocolFees, newProtocolFeeAddress: _newProtocolFeeAddress };
}

function loadGetterTupleSetFees(source: TupleReader) {
    let _newLPFee = source.readBigNumber();
    let _newProtocolFees = source.readBigNumber();
    let _newProtocolFeeAddress = source.readAddress();
    return { $$type: 'SetFees' as const, newLPFee: _newLPFee, newProtocolFees: _newProtocolFees, newProtocolFeeAddress: _newProtocolFeeAddress };
}

function storeTupleSetFees(source: SetFees) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newLPFee);
    builder.writeNumber(source.newProtocolFees);
    builder.writeAddress(source.newProtocolFeeAddress);
    return builder.build();
}

function dictValueParserSetFees(): DictionaryValue<SetFees> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetFees(src)).endCell());
        },
        parse: (src) => {
            return loadSetFees(src.loadRef().beginParse());
        }
    }
}

export type Swap = {
    $$type: 'Swap';
    fromAddress: Address;
    jettonAmount: bigint;
    tokenWallet: Address;
    toAddress: Address;
    minOutput: bigint;
    remainRef: Slice;
}

export function storeSwap(src: Swap) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(213427222, 32);
        b_0.storeAddress(src.fromAddress);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.tokenWallet);
        b_0.storeAddress(src.toAddress);
        let b_1 = new Builder();
        b_1.storeCoins(src.minOutput);
        b_1.storeRef(src.remainRef.asCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwap(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 213427222) { throw Error('Invalid prefix'); }
    let _fromAddress = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadCoins();
    let _tokenWallet = sc_0.loadAddress();
    let _toAddress = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _minOutput = sc_1.loadCoins();
    let _remainRef = sc_1.loadRef().asSlice();
    return { $$type: 'Swap' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, tokenWallet: _tokenWallet, toAddress: _toAddress, minOutput: _minOutput, remainRef: _remainRef };
}

function loadTupleSwap(source: TupleReader) {
    let _fromAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _tokenWallet = source.readAddress();
    let _toAddress = source.readAddress();
    let _minOutput = source.readBigNumber();
    let _remainRef = source.readCell().asSlice();
    return { $$type: 'Swap' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, tokenWallet: _tokenWallet, toAddress: _toAddress, minOutput: _minOutput, remainRef: _remainRef };
}

function loadGetterTupleSwap(source: TupleReader) {
    let _fromAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _tokenWallet = source.readAddress();
    let _toAddress = source.readAddress();
    let _minOutput = source.readBigNumber();
    let _remainRef = source.readCell().asSlice();
    return { $$type: 'Swap' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, tokenWallet: _tokenWallet, toAddress: _toAddress, minOutput: _minOutput, remainRef: _remainRef };
}

function storeTupleSwap(source: Swap) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.fromAddress);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.tokenWallet);
    builder.writeAddress(source.toAddress);
    builder.writeNumber(source.minOutput);
    builder.writeSlice(source.remainRef.asCell());
    return builder.build();
}

function dictValueParserSwap(): DictionaryValue<Swap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwap(src)).endCell());
        },
        parse: (src) => {
            return loadSwap(src.loadRef().beginParse());
        }
    }
}

export type Router$Data = {
    $$type: 'Router$Data';
    isLocked: boolean;
    adminAddress: Address;
    lp_data: Dictionary<Address, ProvideLiquidity>;
    test: boolean;
}

export function storeRouter$Data(src: Router$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isLocked);
        b_0.storeAddress(src.adminAddress);
        b_0.storeDict(src.lp_data, Dictionary.Keys.Address(), dictValueParserProvideLiquidity());
        b_0.storeBit(src.test);
    };
}

export function loadRouter$Data(slice: Slice) {
    let sc_0 = slice;
    let _isLocked = sc_0.loadBit();
    let _adminAddress = sc_0.loadAddress();
    let _lp_data = Dictionary.load(Dictionary.Keys.Address(), dictValueParserProvideLiquidity(), sc_0);
    let _test = sc_0.loadBit();
    return { $$type: 'Router$Data' as const, isLocked: _isLocked, adminAddress: _adminAddress, lp_data: _lp_data, test: _test };
}

function loadTupleRouter$Data(source: TupleReader) {
    let _isLocked = source.readBoolean();
    let _adminAddress = source.readAddress();
    let _lp_data = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserProvideLiquidity(), source.readCellOpt());
    let _test = source.readBoolean();
    return { $$type: 'Router$Data' as const, isLocked: _isLocked, adminAddress: _adminAddress, lp_data: _lp_data, test: _test };
}

function loadGetterTupleRouter$Data(source: TupleReader) {
    let _isLocked = source.readBoolean();
    let _adminAddress = source.readAddress();
    let _lp_data = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserProvideLiquidity(), source.readCellOpt());
    let _test = source.readBoolean();
    return { $$type: 'Router$Data' as const, isLocked: _isLocked, adminAddress: _adminAddress, lp_data: _lp_data, test: _test };
}

function storeTupleRouter$Data(source: Router$Data) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isLocked);
    builder.writeAddress(source.adminAddress);
    builder.writeCell(source.lp_data.size > 0 ? beginCell().storeDictDirect(source.lp_data, Dictionary.Keys.Address(), dictValueParserProvideLiquidity()).endCell() : null);
    builder.writeBoolean(source.test);
    return builder.build();
}

function dictValueParserRouter$Data(): DictionaryValue<Router$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRouter$Data(src)).endCell());
        },
        parse: (src) => {
            return loadRouter$Data(src.loadRef().beginParse());
        }
    }
}

export type Reback = {
    $$type: 'Reback';
    to: Address;
}

export function storeReback(src: Reback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(727571334, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadReback(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 727571334) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    return { $$type: 'Reback' as const, to: _to };
}

function loadTupleReback(source: TupleReader) {
    let _to = source.readAddress();
    return { $$type: 'Reback' as const, to: _to };
}

function loadGetterTupleReback(source: TupleReader) {
    let _to = source.readAddress();
    return { $$type: 'Reback' as const, to: _to };
}

function storeTupleReback(source: Reback) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserReback(): DictionaryValue<Reback> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReback(src)).endCell());
        },
        parse: (src) => {
            return loadReback(src.loadRef().beginParse());
        }
    }
}

 type Pool_init_args = {
    $$type: 'Pool_init_args';
    routerAddress: Address;
    lpFee: bigint;
    protocolFee: bigint;
    protocolFeesAddress: Address;
    collectedTokenAProtocolFees: bigint;
    collectedTokenBProtocolFees: bigint;
    wallet0: Address;
    wallet1: Address;
    reserve0: bigint;
    reserve1: bigint;
    total_supply: bigint;
    token0PrecisionMultiplier: bigint;
    token1PrecisionMultiplier: bigint;
}

function initPool_init_args(src: Pool_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.routerAddress);
        b_0.storeInt(src.lpFee, 257);
        b_0.storeInt(src.protocolFee, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.protocolFeesAddress);
        b_1.storeInt(src.collectedTokenAProtocolFees, 257);
        b_1.storeInt(src.collectedTokenBProtocolFees, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.wallet0);
        b_2.storeAddress(src.wallet1);
        b_2.storeInt(src.reserve0, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.reserve1, 257);
        b_3.storeInt(src.total_supply, 257);
        b_3.storeInt(src.token0PrecisionMultiplier, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.token1PrecisionMultiplier, 257);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function Pool_init(routerAddress: Address, lpFee: bigint, protocolFee: bigint, protocolFeesAddress: Address, collectedTokenAProtocolFees: bigint, collectedTokenBProtocolFees: bigint, wallet0: Address, wallet1: Address, reserve0: bigint, reserve1: bigint, total_supply: bigint, token0PrecisionMultiplier: bigint, token1PrecisionMultiplier: bigint) {
    const __code = Cell.fromBase64('te6ccgECiAEAIOsAART/APSkE/S88sgLAQIBYgIDA8rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggn4EBQIBIDY3BPDtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQNVowZbqOuzDTHwGCEDVaMGW68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA+gBVMGwU2zx/4CCCEEgT2AO64wIgghAMuKQWuuMCIIIQVMNw8LoGBwgJATjI+EMBzH8BygARFREUERMREhERERBV4Ns8ye1UEQPwMFR7qSsAERgRGxEYERcRGhEXERYRGREWERURGxEVERQRGhEUERMRGRETERIRGxESERERGhERERARGREQDxEbDw4RGg4NERkNDBEbDAsRGgsKERkKCREbCQgRGggHERkHBhEbBgURGgUEERkE2zwwVhZWFts8JcAAb0cUAYww0x8BghBIE9gDuvLggYEBAdcAgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE3CAQMjJ0EVA2zx/MQIQMNs8bBaK2H8KCwTIjjww0x8BghBUw3DwuvLggfoA+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE1cUVxRXFH/gIIIQe92X3rrjAiCCEIm3HQm6jwgw2zxsFts8f+AgghCUapi2uh0eHyAB9tMfAYIQDLikFrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0PoA1DDQECYQJQwC/u2i7ftwIIBAVhFWEVYRVhEAERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEhDw4RIA4NER8NDBEeDAsRHQsKERwKCREbCQgRGggHERkHBhEhBgURIAUEER8E2zxS8BEaxwVvDQAIECQQIwMw4w8nwQGTVx1/nSLBAZNXHX+UER0ivuLiDg8QAv5XHRETERURExESERQREhERERMREREQERIREA8REQ8OERAOLREQLREQEN8QzhC9EKwQmxCKEHkQaBBXEEYQNRAkAxEeAwIRGAIBER4BERjbPBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q738uERAufBcC/lccERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4tERAtERAQ3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQDER0DAhEYAgERGAERHds8ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvcC4REC58GAOijsZbVxZXFxESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsVVUQRRAkcASAQFBEA9s8jwZWHMMA4w/iMRkaAfIBERUBERQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERL6AgEREPoCUA4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQDPoCyFAL+gJQCSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAHEgH+INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAX6AlAD+gIByIEBAc8AEoEBAc8AyEQUUFdQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAcwEyIEBAc8AFcoAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYWzBMAIBTKAMlQA8zJWMzJWMzJAcwB3I4mVxiNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASSERjiERcdoBEVG6ARExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0Qzw0QnBCLEHoQaRBYEEcQNkVAE9s8FQH2+EFvJMjJcMjJ0CgFEEkIVSARFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERHlYbVhtWHlYgVh1WHVYdFgHIVh1WHVYnXwqBdW0k8vQRFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QThA9TLoQeRBoEGfbPCkBUBEQEO8Q3hDNELwQqxCaEIkQeBBnEFYQRQQRGgRWG1AjAREbAds8VhhgAWIREBDvEN4QzRC8EKsQmhCJEHgQZxBWEEUEERoEVhsDAhEbAts8VhgRGBEdERgRHBEYYAL4ERgeoC1WGKAdoQEREAERF6ArhHe8kX+UVhbBAeKOxDxXFxESERgREhERERcREREQERYREA8RFQ8OERQOChETCgwREgwLERELCREQCRDvEI4QfRBsVVUQNRRwBIBABAPbPNsx4FcZVxlwIBEUERoRFBETERkRExESERgREjEbAvRcoB+hERgdoAEREQENoCyEd7yRf5RWFsEB4o7FO1cXERIRGBESERERFxERERARFhEQDxEVDwkRFAkNERMNDBESDAsREQsJERAJEK8QjhB9EGxVVRA1ECRwBIBABAPbPNsx4FcZVxlwIBEUERoRFBETERkRExESERgREjEcAYQREREXEREREBEWERARExEVERMOERQODRETDQsREgsREBERERAKERAKEJ8QjhB9EGwQWxBKEDkQKBAnEDZQUhQT2zwxAXwREREXERERExEWERMPERUPDhEUDg0REw0NERINDBERDAoREAoQnxCOEH0QbBBbEEoQORAoECcQRkUFBAPbPDEBsjDTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBRDMGwU2zx/IQDG0x8BghCJtx0JuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANIAAZHUkm0B4voAUVUVFEMwAej4QW8kERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBER5WF1YXVhdWIVYhViFWIVYhViFWISgCZI6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAJEw4w1wLS4C9PhBbyQRFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREVBQQRHAQDERsDAhEaAgERGQERGFYbVhtWG1YbVhtWG1YbViPbPFYbVhtWG1YbIiMCrhVfBTIRFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJERYIBwZVQPhD+CgS2zwBgSYLAoYkAphWG1YbVhtWI9s8ERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVd1UzJSYA1HBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAREXxwUBERYB8vQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4C9DBQVl8FVHqYKgARGBEaERgRFxEZERcRFhEaERYRFREZERURFBEaERQRExEZERMREhEaERIREREZEREREBEaERAPERkPDhEaDg0RGQ0MERoMCxEZCwoRGgoJERkJCBEaCAcRGQcGERoGBREZBQQRGgTbPDBWFi2oJakEbycBgjFQVl8FFqGNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQmxwWzjo0FcHCAQkMwbW1t2zwwkTXiNAHQERcsqCWpBA1WF6FRzaFwgEDIydARGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREPERIPAxERAw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRkVA2zwxAaxfCoF1bSTy9BEUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYQXxBOVZPbPCkC6DI1NTU1ERURGREVERQRGBEUERMRFxETERIRFhESERERGRERERARGBEQDxEXDw4RFg4NERkNDBEYDAsRFwsKERYKCREZCQgRGAgHERcHBhEWBgURGQUEERgEAxEXAwIRFgIBERkBERj4Q/goEts8BlYYoFMWhioD/nBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcH+AQCL4KBUEER4EAxEfAwIBESABER0QI8hVUNs8yQYRGwYFERkFBBEaBAMRGANABxBGEEXbPDAREBEUERArNCwAqoIQF41FGVAHyx8Vyz9QA/oCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIBzxYATg8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGFFAzBQE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwNALC+QEggvDqDLZ1yblnuaULztwN7wJBT+ZwKUREbVvBn+QNYGri57qOkzD4J28QggiYloChVhVw2zx/2zHggvCj+YETbEMy96X5L5jLhqPUizcBMRju5Nbiks7Lk+27GLrjAi8wAR5/yMkQNBIQJBAjbW3bPDA0AVaCALVmVhHCAJRWEMIAkXDi8vRwgEDIydBWFFYUVhRVAts8Pz9wUf8Pf9sxMQIiVhRZVhQByFVQ2zzJVhcC2zwyMwD2ghCDJXaOUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQA88WyVjMyQHMARoQI3ACECQQI21t2zwwNAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wg1AJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgODkCASA+PwIBIDo7AgEgT1ACbbdWG2eCIoIiwiKCImIioiJiIkIigiJCIiIiYiIiIgIiQiIB4iIh4cIiAcIb6qObZ4riC+HtijB+PAIBIENEAvJUepgqABEYERoRGBEXERkRFxEWERoRFhEVERkRFREUERoRFBETERkRExESERoREhERERkREREQERoREA8RGQ8OERoODREZDQwRGgwLERkLChEaCgkRGQkIERoIBxEZBwYRGgYFERkFBBEaBNs8ERURFxEVERQRFhEUbz0BTBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9VHNs8cgIBZmlqAgFiQEEAEa1fdqJoaQAAwAIZr8ttnm2eK4gvh7YowH5CAhZUeHYoANs8U9zbPG9xAgEgRUYCAVhLTAJtrJDtngiKCIsIigiJiIqIiYiJCIoIiQiIiImIiIiICIkIiAeIiIeHCIgHCG+qjm2eK4gvh7YowH5HAhmsdu2ebZ4riC+HtijAfkoC7lR6mCoAERgRGhEYERcRGREXERYRGhEWERURGREVERQRGhEUERMRGRETERIRGhESERERGRERERARGhEQDxEZDw4RGg4NERkNDBEaDAsRGQsKERoKCREZCQgRGggHERkHBhEaBgURGQUEERoE2zxS0BEXoFLAERigb0gD/BEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMCERGAHbPFPcAhEYAts8JcAAkzARFZ0RFlYWoVJQqAERFqkE4hEUERURFBETERQRExESERMREhERERIREXFxSQBIERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwAAIgAh6pV9s82zxXElcQXw81M1t+TQIUqxnbPNs8bKpsun5OAARTywAiVhRUfc9WEVYYVhhWGFYYVhgCASBRUgIBIFRVAhmwjvbPNs8VxBfD2xRgflMC7bNTAIg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBEUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxBfD2xRgflsBDlR4digA2zxvAhmyTXbPNs8VxBfD2xRgflYCAVhXWAACKwIYqRTbPNs8VxBfD2xRflkCZqkD2zwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcSVxBfDzUzW35aAAIsABhTDagmqQRRHagmqQQD6lR7qSsAERgRGxEYERcRGhEXERYRGREWERURGxEVERQRGhEUERMRGRETERIRGxESERERGhERERARGREQDxEbDw4RGg4NERkNDBEbDAsRGgsKERkKCREbCQgRGggHERkHBhEbBgURGgUEERkE2zxS8BEZxwXjD29cXQL8ERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDy4REC4REBDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAhEYAgERGNs8ERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5/LhERLhERfF4C/hEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8uERAuERAQ7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDQQIwIRGAIBERgB2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDnAuEREuERF8XwE8DhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGA0RU2zwwYAFADhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGA1BERRXbPDBgARRwUwTDAJJsYuMNYQT2WwJWEKhRH6hSNaiBJxCpBFEzoREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERoODREZDQwRGAwLERcLChEWCgkRFQkIERoIBxEZBwYRGAYFERcFBBEWBAMRFQMCERoCAREZAREYVhdWGlYY2zwRG+MPcmJjZAGuERgqqAERGQGgERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0ZQBBEYBAERGds8AREXAaGlKakEZQGyERgpqAERFgGgERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0YFBBEZ2zwBERYBoaUqqQQRFREWERVlAHwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEAwFK7aLt+1MAqCKqAKkEIagjqgGpBAOqAFIQqQQSoCFwgweK5BRfBGYD9lRxEagmoAOqACSgJaETqQQBpBEVERoRFREUERkRFBETERgRExESERcREhERERYREREQERoREA8RGQ8OERgODREXDQwRFgwLERoLChEZCgkRGAkIERcIBxEWBwYRGgYFERkFBBEYBAMRFwMCERYCAREaAVYaAREX2zzjAnVnaABMVxVXFVcVVxUREBEVERAPERQPDhETDg0REg0MEREMCxEQC1VK2zEAihEUERkRFBETERgRExESERcREhERERYREREQERUREA8RFA8OERMODRESDQwREQwLERALEK8QnhCNEHwQaxBaEEkQOEdVBgIDob5rbAIBIHd4ApVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sUZ+bQJpZ2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPFcQXw9sUZ+bgGQ+EP4KBLbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIhgLuVHqYKgARGBEaERgRFxEZERcRFhEaERYRFREZERURFBEaERQRExEZERMREhEaERIREREZEREREBEaERAPERkPDhEaDg0RGQ0MERoMCxEZCwoRGgoJERkJCBEaCAcRGQcGERoGBREZBQQRGgTbPFLQERegUsARGKBvcABW7aLt+/gjIbmOG1MjuY4RUjOh+CMioVqhWagBqQSh2zHgECNfA5QQI18D4gGMERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RDDbPHEBEFLSqFLCqNs8cgE47aLt+1ygIMMAjo1SBKoAIKVwgweK5F8G4F8EcHMB+FNmqCapBCeoJakEqwFUdzSoIqoAoCmoUkqoAqcDEqAYqQQBpBEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RFg8OERwODREbDQwRGgwLERkLChEYCgkRFwkIERYIBxEcBwYRGwYFERoFBBEZBAMRGAN0AvwCERcCAREWAVYWAREd2zyOKlcWVxZXFlcWVxZXFg4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPVWfbMeARFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QfhBtEFx1dgAWXLyTocEC4AGhwQIAEBBLEDpJF1CGAgEgeXoCFKot2zzbPGz1bGV+fwLfpNoCQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEAJBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtngiKCIsIigiJiIqIiYiJCIoIiQiIiImIiIiICIkIiAeIiIeHCIgHCG+qjm2eK4gvh7Yo357AhelE7Z5tniuIL4e2KN+fQEKMFPv2zx8AAhfA4AyAEiNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQDhO1E0NQB+GPSAAGOots8VxURExEUERMREhETERIRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4InbPA3RVQvbPICBggL0VHQyJPgoERURGREVERQRGBEUERMRFxETERIRFhESERERGRERERARGBEQDxEXDw4RFg4NERkNDBEYDAsRFwsKERYKCREZCQgRGAgHERcHBhEWBgURGQUEERgEAxEXAwIRFgIBERkB+EP4KBLbPDAEERgEAxEXAwIRFgKGhwHW+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6ANQB0PoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGDAfT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYUAPIEH0CBwIHBWEX/IyQIRFAIQmhCJEHgQZxBWEEVQAwH8+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA1DDQgQEB1wCBAQHXANQw0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBRDMATUMNCBAQHXANIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHU0gAwhABIERARFREQERARFBEQERARExEQERAREhEQERAREREQEHgQZxBWAIz6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA1DDQgQEB1wCBAQHXAIEBAdcA1DDQgQEB1wAwEK0QrBCrANoC0PQEMG0BggCd5QGAEPQPb6Hy4IcBggCd5SICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAIwBERkBERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZ');
    const __system = Cell.fromBase64('te6cckECpgEAJ3IAAQHAAQIBIAKHAQW/ovwDART/APSkE/S88sgLBAIBYgU1A8rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggngGMQTw7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEDVaMGW6jrsw0x8BghA1WjBluvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6APoAVTBsFNs8f+AgghBIE9gDuuMCIIIQDLikFrrjAiCCEFTDcPC6BwsMGgPwMFR7qSsAERgRGxEYERcRGhEXERYRGREWERURGxEVERQRGhEUERMRGRETERIRGxESERERGhERERARGREQDxEbDw4RGg4NERkNDBEbDAsRGgsKERkKCREbCQgRGggHERkHBhEbBgURGgUEERkE2zwwVhZWFts8JcAAgD4IAdyOJlcYjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEkhEY4hEXHaARFRugERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8NEJwQixB6EGkQWBBHEDZFQBPbPAkB9vhBbyTIyXDIydAoBRBJCFUgERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBER5WG1YbVh5WIFYdVh1WHQoByFYdVh1WJ18KgXVtJPL0ERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUy6EHkQaBBn2zwmAYww0x8BghBIE9gDuvLggYEBAdcAgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE3CAQMjJ0EVA2zx/LgIQMNs8bBaK2H8NDwH20x8BghAMuKQWuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQ+gDUMNAQJhAlDgAIECQQIwL+7aLt+3AggEBWEVYRVhFWEQARGBEhERgRFxEgERcRFhEfERYRFREeERURFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPESEPDhEgDg0RHw0MER4MCxEdCwoRHAoJERsJCBEaCAcRGQcGESEGBREgBQQRHwTbPFLwERrHBYAQAzDjDyfBAZNXHX+dIsEBk1cdf5QRHSK+4uIRExUC/lcdERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4tERAtERAQ3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQDER4DAhEYAgERHgERGNs8ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvfy4REC5vEgFQERAQ7xDeEM0QvBCrEJoQiRB4EGcQVhBFBBEaBFYbUCMBERsB2zxWGFIC/lccERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4tERAtERAQ3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQDER0DAhEYAgERGAERHds8ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvcC4REC5vFAFiERAQ7xDeEM0QvBCrEJoQiRB4EGcQVhBFBBEaBFYbAwIRGwLbPFYYERgRHREYERwRGFIDoo7GW1cWVxcREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbFVVEEUQJHAEgEBQRAPbPI8GVhzDAOMP4i4WGAL4ERgeoC1WGKAdoQEREAERF6ArhHe8kX+UVhbBAeKOxDxXFxESERgREhERERcREREQERYREA8RFQ8OERQOChETCgwREgwLERELCREQCRDvEI4QfRBsVVUQNRRwBIBABAPbPNsx4FcZVxlwIBEUERoRFBETERkRExESERgREi4XAYQREREXEREREBEWERARExEVERMOERQODRETDQsREgsREBERERAKERAKEJ8QjhB9EGwQWxBKEDkQKBAnEDZQUhQT2zwuAvRcoB+hERgdoAEREQENoCyEd7yRf5RWFsEB4o7FO1cXERIRGBESERERFxERERARFhEQDxEVDwkRFAkNERMNDBESDAsREQsJERAJEK8QjhB9EGxVVRA1ECRwBIBABAPbPNsx4FcZVxlwIBEUERoRFBETERkRExESERgREi4ZAXwREREXERERExEWERMPERUPDhEUDg0REw0NERINDBERDAoREAoQnxCOEH0QbBBbEEoQORAoECcQRkUFBAPbPC4EyI48MNMfAYIQVMNw8Lry4IH6APoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBNXFFcUVxR/4CCCEHvdl9664wIgghCJtx0Juo8IMNs8bBbbPH/gIIIQlGqYtrobIyQpAbIw0x8BghB73ZfeuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgUQzBsFNs8fxwC9PhBbyQRFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREVBQQRHAQDERsDAhEaAgERGQERGFYbVhtWG1YbVhtWG1YbViPbPFYbVhtWG1YbHR8CrhVfBTIRFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJERYIBwZVQPhD+CgS2zwBgSYLAqQeANRwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAERF8cFAREWAfL0ERMRFBETERIRExESEREREhERERAREREQDxEQD1UOAphWG1YbVhtWI9s8ERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVd1UzICIC9DBQVl8FVHqYKgARGBEaERgRFxEZERcRFhEaERYRFREZERURFBEaERQRExEZERMREhEaERIREREZEREREBEaERAPERkPDhEaDg0RGQ0MERoMCxEZCwoRGgoJERkJCBEaCAcRGQcGERoGBREZBQQRGgTbPDBWFi2oJakEgCEB0BEXLKglqQQNVhehUc2hcIBAyMnQERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERDxESDwMREQMOERAOEN8QzhC9EKwQmxCKEHkQaBBXEEZFQNs8LgGCMVBWXwUWoY0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCbHBbOOjQVwcIBCQzBtbW3bPDCRNeKbAMbTHwGCEIm3HQm68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gABkdSSbQHi+gBRVRUUQzAB6PhBbyQRFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERHlYXVhdWF1YhViFWIVYhViFWIVYhJQGsXwqBdW0k8vQRFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QTlWT2zwmAugyNTU1NREVERkRFREUERgRFBETERcRExESERYREhERERkREREQERgREA8RFw8OERYODREZDQwRGAwLERcLChEWCgkRGQkIERgIBxEXBwYRFgYFERkFBBEYBAMRFwMCERYCAREZAREY+EP4KBLbPAZWGKBTFqQnA/5wWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHB/gEAi+CgVBBEeBAMRHwMCAREgAREdECPIVVDbPMkGERsGBREZBQQRGgQDERgDQAcQRhBF2zwwERARFBEQkJsoAE4PERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RhRQMwUCZI6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAJEw4w1wKisBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MJsCwvkBIILw6gy2dcm5Z7mlC87cDe8CQU/mcClERG1bwZ/kDWBq4ue6jpMw+CdvEIIImJaAoVYVcNs8f9sx4ILwo/mBE2xDMvel+S+Yy4aj1Is3ATEY7uTW4pLOy5Ptuxi64wIsLQEef8jJEDQSECQQI21t2zwwmwFWggC1ZlYRwgCUVhDCAJFw4vL0cIBAyMnQVhRWFFYUVQLbPD8/cFH/D3/bMS4CIlYUWVYUAchVUNs8yVYXAts8LzAA9oIQgyV2jlAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUAPPFslYzMkBzAEaECNwAhAkECNtbds8MJsBOMj4QwHMfwHKABEVERQRExESEREREFXg2zzJ7VQyAfIBERUBERQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERL6AgEREPoCUA4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQDPoCyFAL+gJQCSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAHMwH+INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAX6AlAD+gIByIEBAc8AEoEBAc8AyEQUUFdQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAcwEyIEBAc8AFcoAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYWzDQAIBTKAMlQA8zJWMzJWMzJAcwCASA2YwIBIDdIAgEgODsCbbdWG2eCIoIiwiKCImIioiJiIkIigiJCIiIiYiIiIgIiQiIB4iIh4cIiAcIb6qObZ4riC+HtijB4OQLyVHqYKgARGBEaERgRFxEZERcRFhEaERYRFREZERURFBEaERQRExEZERMREhEaERIREREZEREREBEaERAPERkPDhEaDg0RGQ0MERoMCxEZCwoRGgoJERkJCBEaCAcRGQcGERoGBREZBQQRGgTbPBEVERcRFREUERYRFIA6AUwRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPIICASA8QwIBID1BAm2skO2eCIoIiwiKCImIioiJiIkIigiJCIiIiYiIiIgIiQiIB4iIh4cIiAcIb6qObZ4riC+HtijAeD4C7lR6mCoAERgRGhEYERcRGREXERYRGhEWERURGREVERQRGhEUERMRGRETERIRGhESERERGRERERARGhEQDxEZDw4RGg4NERkNDBEaDAsRGQsKERoKCREZCQgRGggHERkHBhEaBgURGQUEERoE2zxS0BEXoFLAERiggD8D/BEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMCERGAHbPFPcAhEYAts8JcAAkzARFZ0RFlYWoVJQqAERFqkE4hEUERURFBETERQRExESERMREhERERIREYGBQABIERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwAhmsdu2ebZ4riC+HtijAeEIAAiACAVhERgIeqVfbPNs8VxJXEF8PNTNbeEUABFPLAhSrGds82zxsqmy6eEcAIlYUVH3PVhFWGFYYVhhWGFYYAgEgSVsCASBKTAIZsI72zzbPFcQXw9sUYHhLAQ5UeHYoANs8gALts1MAiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvlUq2zxXEF8PbFGB4TQPqVHupKwARGBEbERgRFxEaERcRFhEZERYRFREbERURFBEaERQRExEZERMREhEbERIREREaEREREBEZERAPERsPDhEaDg0RGQ0MERsMCxEaCwoRGQoJERsJCBEaCAcRGQcGERsGBREaBQQRGQTbPFLwERnHBeMPgE5QAvwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPLhEQLhEQEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0ECMCERgCAREY2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDn8uEREuERFvTwE8DhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGA0RU2zwwUgL+ERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDy4REC4REBDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAhEYAgERGAHbPBEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOcC4RES4REW9RAUAOERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYDUERFFds8MFIBFHBTBMMAkmxi4w1TBPZbAlYQqFEfqFI1qIEnEKkEUTOhERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RGg4NERkNDBEYDAsRFwsKERYKCREVCQgRGggHERkHBhEYBgURFwUEERYEAxEVAwIRGgIBERkBERhWF1YaVhjbPBEb4w+CVFVaAa4RGCqoAREZAaARExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlAEERgEAREZ2zwBERcBoaUpqQRWAbIRGCmoAREWAaARExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RgUEERnbPAERFgGhpSqpBBEVERYRFVYBSu2i7ftTAKgiqgCpBCGoI6oBqQQDqgBSEKkEEqAhcIMHiuQUXwRXA/ZUcRGoJqADqgAkoCWhE6kEAaQRFREaERURFBEZERQRExEYERMREhEXERIREREWEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEaCwoRGQoJERgJCBEXCAcRFgcGERoGBREZBQQRGAQDERcDAhEWAgERGgFWGgERF9s84wKFWFkATFcVVxVXFVcVERARFREQDxEUDw4REw4NERINDBERDAsREAtVStsxAIoRFBEZERQRExEYERMREhEXERIREREWEREREBEVERAPERQPDhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDhHVQYAfBEUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQDAgEgXF4CGbJNds82zxXEF8PbFGB4XQACKwIBWF9hAhipFNs82zxXEF8PbFF4YAACLAJmqQPbPBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxJXEF8PNTNbeGIAGFMNqCapBFEdqCapBAIBIGR1AgFmZWsCA6G+ZmgClWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xRnhnAZD4Q/goEts8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IikAmlnbPBEUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9VHNs8VxBfD2xRnhpAu5UepgqABEYERoRGBEXERkRFxEWERoRFhEVERkRFREUERoRFBETERkRExESERoREhERERkREREQERoREA8RGQ8OERoODREZDQwRGgwLERkLChEaCgkRGQkIERoIBxEZBwYRGgYFERkFBBEaBNs8UtARF6BSwBEYoIBqAYwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEMNs8gQIBIGxyAgEgbXAC36TaAkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRACQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4IigiLCIoIiYiKiImIiQiKCIkIiIiJiIiIiAiJCIgHiIiHhwiIBwhvqo5tniuIL4e2KN4bgEKMFPv2zxvAAhfA4AyAhelE7Z5tniuIL4e2KN4cQBIjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAhSqLds82zxs9WxleHMC9FR0MiT4KBEVERkRFREUERgRFBETERcRExESERYREhERERkREREQERgREA8RFw8OERYODREZDQwRGAwLERcLChEWCgkRGQkIERgIBxEXBwYRFgYFERkFBBEYBAMRFwMCERYCAREZAfhD+CgS2zwwBBEYBAMRFwMCERYCpHQAjAERGQERFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkCAWJ2dwARrV92omhpAADAAhmvy22ebZ4riC+HtijAeH8DhO1E0NQB+GPSAAGOots8VxURExEUERMREhETERIRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4InbPA3RVQvbPHl8fgHW+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6ANQB0PoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAF6Afz6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA+gDUMNCBAQHXAIEBAdcA1DDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwBNQw0IEBAdcA0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdTSADB7AEgREBEVERAREBEUERAREBETERAREBESERAREBERERAQeBBnEFYB9PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBfQCM+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQw0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAMBCtEKwQqwA8gQfQIHAgcFYRf8jJAhEUAhCaEIkQeBBnEFYQRVADAhZUeHYoANs8U9zbPICBAFbtou37+CMhuY4bUyO5jhFSM6H4IyKhWqFZqAGpBKHbMeAQI18DlBAjXwPiARBS0qhSwqjbPIIBOO2i7ftcoCDDAI6NUgSqACClcIMHiuRfBuBfBHCDAfhTZqgmqQQnqCWpBKsBVHc0qCKqAKApqFJKqAKnAxKgGKkEAaQRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRHAcGERsGBREaBQQRGQQDERgDhAL8AhEXAgERFgFWFgERHds8jipXFlcWVxZXFlcWVxYOERUODREUDQwREwwLERILChERCgkREAkQj1Vn2zHgERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH4QbRBchYYAFly8k6HBAuABocECABAQSxA6SRdQhgEFvO8siAEU/wD0pBP0vPLIC4kCAWKKngN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLggqCLnQLuAY5bgCDXIXAh10nCH5UwINcLH94gghAXjUUZuo4aMNMfAYIQF41FGbry4IHTP/oAWWwSMROgAn/gghB73Zfeuo4Z0x8BghB73ZfeuvLggdM/+gBZbBIxE6ACf+Awf+BwIddJwh+VMCDXCx/eIIIQD4p+pbrjAiCMkQIQMNs8bBfbPH+NjgDG0x8BghAPin6luvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABkdSSbQHi+gBRZhYVFEMwAs74QW8kUdmhgTMxIcL/8vRAy1RzvFYQVH7cVH7cLhCaXwoigWy3AscF8vRUc7xWEFR+3FR+3C4VXwVxMsIAkjBy3lQUMoIAkUEG2zwSqIIJMS0AoIIImJaAoLzy9E3LEDpHiRA2XkABmI8D4DI2NjY2EDhHZfhDURLbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBhwUId/gEBUR94QI8hVUNs8yRBJEDhAFxBGEEXbPDCkkJsAqoIQF41FGVAHyx8Vyz9QA/oCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIBzxYDvoIQWV8HvLqOwjDTHwGCEFlfB7y68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABkdSSbQHiVTBsFNs8f+CCEBeNRRm6jwfbPGwW2zx/4DBwkpSVAWD4QW8kUaahggDrwiHC//L0QJhUc4lUfalTuhBnXwciggC3yALHBfL0SpgQN0YWUFSTAdIwbDMzcIBAVBMmfwbIVTCCEHvdl95QBcsfE8s/AfoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJJFBEFEMwbW3bPDCbALLTHwGCEBeNRRm68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMAE2+EFvJFHIoIFxzSHC//L0QLpUc6tUf8tUfcstlgLeEDdfBzJTIMcFs47WVTD4Q1ES2zwBgQj4AnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIUAXHBRTy9FiRW+JUc6tUf8tUfcstpJcDdBVfBfgnbxAjoYIImJaAZrYIoYIImJaAoFIwoSHCAI6HVTHbPFigoZJsUeImwgDjABA9TLAQSl5xXjGYmZoAZGwx+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDD6ADFx1yH6ADH6ADCnA6sAAchVIFR0vFYQVH7cVH7cMjU1NTUhwgCOxwFxUFRwBMhVMIIQc2LQnFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WySVVMBRDMG1t2zwwkl8F4lUCmwGwNFsybDMzjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIccFs5MiwgCRcOKOnXByA8gBghDVMnbbWMsfyz/JQUATECQQI21t2zwwkl8D4psByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsInACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzACeyPhDAcx/AcoAVSBa+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVAIBIJ+lAhG/2BbZ5tnjYaSgowG67UTQ1AH4Y9IAAY5F+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT4Pgo1wsKgwm68uCJoQGK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8ogAEcFkBIlRyEFQUMfhDURLbPDAQNkVApADaAtD0BDBtAYIAneUBgBD0D2+h8uCHAYIAneUiAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQARvhX3aiaGkAAMtf/QVg==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPool_init_args({ $$type: 'Pool_init_args', routerAddress, lpFee, protocolFee, protocolFeesAddress, collectedTokenAProtocolFees, collectedTokenBProtocolFees, wallet0, wallet1, reserve0, reserve1, total_supply, token0PrecisionMultiplier, token1PrecisionMultiplier })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Pool_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2296: { message: `JettonWallet: Only Jetton master or Jetton wallet can call this function` },
    9739: { message: `Sender is not a Jetton wallet` },
    13105: { message: `JettonWallet: Not enough jettons to transfer` },
    20741: { message: `Router: Sender is not admin` },
    27831: { message: `Only owner can call this function` },
    29133: { message: `JettonWallet: Not allow negative balance after internal transfer` },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    37185: { message: `Not enough funds to transfer` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    46438: { message: `Pool: No fees to collect` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
}

const Pool_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Pool$Data","header":null,"fields":[{"name":"routerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"lpFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolFeesAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"collectedTokenAProtocolFees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"collectedTokenBProtocolFees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"wallet0","type":{"kind":"simple","type":"address","optional":false}},{"name":"wallet1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"token0PrecisionMultiplier","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token1PrecisionMultiplier","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"poolParams","type":{"kind":"simple","type":"PoolParams","optional":false}},{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"test","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"LPData","header":null,"fields":[{"name":"wallet0","type":{"kind":"simple","type":"address","optional":false}},{"name":"wallet1","type":{"kind":"simple","type":"address","optional":false}},{"name":"precision0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"precision1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"min_lp_out","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RouterData","header":null,"fields":[{"name":"isLocked","type":{"kind":"simple","type":"bool","optional":false}},{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PoolState","header":null,"fields":[{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}},{"name":"pool_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CollectFees","header":2367611937,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateAdmin","header":2286520683,"fields":[{"name":"newAdmin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"JettonInternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"admin_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"PoolParams","header":null,"fields":[{"name":"initialA","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"futureA","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"initialTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"futureTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AmountOut","header":null,"fields":[{"name":"amountOut","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"feeIn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExampleJettonWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PoolData","header":null,"fields":[{"name":"routerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"token0Address","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Address","type":{"kind":"simple","type":"address","optional":false}},{"name":"lpFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolFeeAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"collectedToken0ProtocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"collectedToken1ProtocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExpectedLiquidity","header":null,"fields":[{"name":"amount0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"amount1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Reserves","header":null,"fields":[{"name":"reserve0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PayTo","header":2200270478,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenAAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"walletTokenAAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenBAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"walletTokenBAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"remainRef","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"ProvideLiquidity","header":895103077,"fields":[{"name":"fromAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minLPOut","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"BurnNotification","header":1023788527,"fields":[{"name":"fromAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RefundMe","header":1209260035,"fields":[{"name":"tot_am0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tot_am1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetFees","header":1422094576,"fields":[{"name":"newLPFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"newProtocolFees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"newProtocolFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Swap","header":213427222,"fields":[{"name":"fromAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"toAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"minOutput","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"remainRef","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Router$Data","header":null,"fields":[{"name":"isLocked","type":{"kind":"simple","type":"bool","optional":false}},{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"lp_data","type":{"kind":"dict","key":"address","value":"ProvideLiquidity","valueFormat":"ref"}},{"name":"test","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Reback","header":727571334,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"get_pool_data","arguments":[],"returnType":{"kind":"simple","type":"PoolData","optional":false}},
    {"name":"get_amount_out","arguments":[{"name":"tokenIn","type":{"kind":"simple","type":"address","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"amountIn","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_swap_fee","arguments":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenIn","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTokenOut","arguments":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_expected_liquidity","arguments":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"ExpectedLiquidity","optional":false}},
    {"name":"get_reserve0","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_reserve1","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getReserves","arguments":[],"returnType":{"kind":"simple","type":"Reserves","optional":false}},
    {"name":"getter_A","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getter_oldInvariant","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getter_newInvariant","arguments":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getter_computeDFromAdjustedBalances","arguments":[{"name":"xp0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"xp1","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getter_ADD_NONE","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_test","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

export const Pool_getterMapping: { [key: string]: string } = {
    'get_pool_data': 'getGetPoolData',
    'get_amount_out': 'getGetAmountOut',
    'get_swap_fee': 'getGetSwapFee',
    'getTokenOut': 'getGetTokenOut',
    'get_expected_liquidity': 'getGetExpectedLiquidity',
    'get_reserve0': 'getGetReserve0',
    'get_reserve1': 'getGetReserve1',
    'getReserves': 'getGetReserves',
    'getter_A': 'getGetterA',
    'getter_oldInvariant': 'getGetterOldInvariant',
    'getter_newInvariant': 'getGetterNewInvariant',
    'getter_computeDFromAdjustedBalances': 'getGetterComputeDFromAdjustedBalances',
    'getter_ADD_NONE': 'getGetterAddNone',
    'get_jetton_data': 'getGetJettonData',
    'get_wallet_address': 'getGetWalletAddress',
    'get_test': 'getGetTest',
}

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideLiquidity"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RefundMe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Swap"}},
    {"receiver":"internal","message":{"kind":"text","text":"reset_gas"}},
    {"receiver":"internal","message":{"kind":"text","text":"collect_fees"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetFees"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Pool implements Contract {
    
    static async init(routerAddress: Address, lpFee: bigint, protocolFee: bigint, protocolFeesAddress: Address, collectedTokenAProtocolFees: bigint, collectedTokenBProtocolFees: bigint, wallet0: Address, wallet1: Address, reserve0: bigint, reserve1: bigint, total_supply: bigint, token0PrecisionMultiplier: bigint, token1PrecisionMultiplier: bigint) {
        return await Pool_init(routerAddress, lpFee, protocolFee, protocolFeesAddress, collectedTokenAProtocolFees, collectedTokenBProtocolFees, wallet0, wallet1, reserve0, reserve1, total_supply, token0PrecisionMultiplier, token1PrecisionMultiplier);
    }
    
    static async fromInit(routerAddress: Address, lpFee: bigint, protocolFee: bigint, protocolFeesAddress: Address, collectedTokenAProtocolFees: bigint, collectedTokenBProtocolFees: bigint, wallet0: Address, wallet1: Address, reserve0: bigint, reserve1: bigint, total_supply: bigint, token0PrecisionMultiplier: bigint, token1PrecisionMultiplier: bigint) {
        const init = await Pool_init(routerAddress, lpFee, protocolFee, protocolFeesAddress, collectedTokenAProtocolFees, collectedTokenBProtocolFees, wallet0, wallet1, reserve0, reserve1, total_supply, token0PrecisionMultiplier, token1PrecisionMultiplier);
        const address = contractAddress(0, init);
        return new Pool(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Pool(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Pool_types,
        getters: Pool_getters,
        receivers: Pool_receivers,
        errors: Pool_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ProvideLiquidity | RefundMe | Swap | 'reset_gas' | 'collect_fees' | SetFees | JettonBurnNotification | JettonMint | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProvideLiquidity') {
            body = beginCell().store(storeProvideLiquidity(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RefundMe') {
            body = beginCell().store(storeRefundMe(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Swap') {
            body = beginCell().store(storeSwap(message)).endCell();
        }
        if (message === 'reset_gas') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'collect_fees') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetFees') {
            body = beginCell().store(storeSetFees(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonBurnNotification') {
            body = beginCell().store(storeJettonBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonMint') {
            body = beginCell().store(storeJettonMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetPoolData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_pool_data', builder.build())).stack;
        const result = loadGetterTuplePoolData(source);
        return result;
    }
    
    async getGetAmountOut(provider: ContractProvider, tokenIn: Address, sender: Address, amountIn: bigint) {
        let builder = new TupleBuilder();
        builder.writeAddress(tokenIn);
        builder.writeAddress(sender);
        builder.writeNumber(amountIn);
        let source = (await provider.get('get_amount_out', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetSwapFee(provider: ContractProvider, sender: Address, tokenIn: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(sender);
        builder.writeAddress(tokenIn);
        let source = (await provider.get('get_swap_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetTokenOut(provider: ContractProvider, amount0: bigint, amount1: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(amount0);
        builder.writeNumber(amount1);
        let source = (await provider.get('getTokenOut', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetExpectedLiquidity(provider: ContractProvider, amount: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(amount);
        let source = (await provider.get('get_expected_liquidity', builder.build())).stack;
        const result = loadGetterTupleExpectedLiquidity(source);
        return result;
    }
    
    async getGetReserve0(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_reserve0', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetReserve1(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_reserve1', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetReserves(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getReserves', builder.build())).stack;
        const result = loadGetterTupleReserves(source);
        return result;
    }
    
    async getGetterA(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getter_A', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetterOldInvariant(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getter_oldInvariant', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetterNewInvariant(provider: ContractProvider, amount0: bigint, amount1: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(amount0);
        builder.writeNumber(amount1);
        let source = (await provider.get('getter_newInvariant', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetterComputeDFromAdjustedBalances(provider: ContractProvider, xp0: bigint, xp1: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(xp0);
        builder.writeNumber(xp1);
        let source = (await provider.get('getter_computeDFromAdjustedBalances', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetterAddNone(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getter_ADD_NONE', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadGetterTupleJettonData(source);
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner_address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner_address);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetTest(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_test', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}