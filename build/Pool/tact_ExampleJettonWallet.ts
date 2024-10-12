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
        b_0.storeCoins(src.reserve0);
        b_0.storeCoins(src.reserve1);
        b_0.storeAddress(src.token0Address);
        b_0.storeAddress(src.token1Address);
        b_0.storeCoins(src.lpFee);
        let b_1 = new Builder();
        b_1.storeCoins(src.protocolFee);
        b_1.storeAddress(src.protocolFeeAddress);
        b_1.storeCoins(src.collectedToken0ProtocolFee);
        b_1.storeCoins(src.collectedToken1ProtocolFee);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolData(slice: Slice) {
    let sc_0 = slice;
    let _reserve0 = sc_0.loadCoins();
    let _reserve1 = sc_0.loadCoins();
    let _token0Address = sc_0.loadAddress();
    let _token1Address = sc_0.loadAddress();
    let _lpFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _protocolFee = sc_1.loadCoins();
    let _protocolFeeAddress = sc_1.loadAddress();
    let _collectedToken0ProtocolFee = sc_1.loadCoins();
    let _collectedToken1ProtocolFee = sc_1.loadCoins();
    return { $$type: 'PoolData' as const, reserve0: _reserve0, reserve1: _reserve1, token0Address: _token0Address, token1Address: _token1Address, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeeAddress: _protocolFeeAddress, collectedToken0ProtocolFee: _collectedToken0ProtocolFee, collectedToken1ProtocolFee: _collectedToken1ProtocolFee };
}

function loadTuplePoolData(source: TupleReader) {
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0Address = source.readAddress();
    let _token1Address = source.readAddress();
    let _lpFee = source.readBigNumber();
    let _protocolFee = source.readBigNumber();
    let _protocolFeeAddress = source.readAddress();
    let _collectedToken0ProtocolFee = source.readBigNumber();
    let _collectedToken1ProtocolFee = source.readBigNumber();
    return { $$type: 'PoolData' as const, reserve0: _reserve0, reserve1: _reserve1, token0Address: _token0Address, token1Address: _token1Address, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeeAddress: _protocolFeeAddress, collectedToken0ProtocolFee: _collectedToken0ProtocolFee, collectedToken1ProtocolFee: _collectedToken1ProtocolFee };
}

function loadGetterTuplePoolData(source: TupleReader) {
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0Address = source.readAddress();
    let _token1Address = source.readAddress();
    let _lpFee = source.readBigNumber();
    let _protocolFee = source.readBigNumber();
    let _protocolFeeAddress = source.readAddress();
    let _collectedToken0ProtocolFee = source.readBigNumber();
    let _collectedToken1ProtocolFee = source.readBigNumber();
    return { $$type: 'PoolData' as const, reserve0: _reserve0, reserve1: _reserve1, token0Address: _token0Address, token1Address: _token1Address, lpFee: _lpFee, protocolFee: _protocolFee, protocolFeeAddress: _protocolFeeAddress, collectedToken0ProtocolFee: _collectedToken0ProtocolFee, collectedToken1ProtocolFee: _collectedToken1ProtocolFee };
}

function storeTuplePoolData(source: PoolData) {
    let builder = new TupleBuilder();
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
}

export function storePayTo(src: PayTo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3294648920, 32);
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.tokenAAmount);
        b_0.storeAddress(src.walletTokenAAddress);
        b_0.storeCoins(src.tokenBAmount);
        let b_1 = new Builder();
        b_1.storeAddress(src.walletTokenBAddress);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPayTo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3294648920) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _tokenAAmount = sc_0.loadCoins();
    let _walletTokenAAddress = sc_0.loadAddress();
    let _tokenBAmount = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _walletTokenBAddress = sc_1.loadAddress();
    return { $$type: 'PayTo' as const, owner: _owner, tokenAAmount: _tokenAAmount, walletTokenAAddress: _walletTokenAAddress, tokenBAmount: _tokenBAmount, walletTokenBAddress: _walletTokenBAddress };
}

function loadTuplePayTo(source: TupleReader) {
    let _owner = source.readAddress();
    let _tokenAAmount = source.readBigNumber();
    let _walletTokenAAddress = source.readAddress();
    let _tokenBAmount = source.readBigNumber();
    let _walletTokenBAddress = source.readAddress();
    return { $$type: 'PayTo' as const, owner: _owner, tokenAAmount: _tokenAAmount, walletTokenAAddress: _walletTokenAAddress, tokenBAmount: _tokenBAmount, walletTokenBAddress: _walletTokenBAddress };
}

function loadGetterTuplePayTo(source: TupleReader) {
    let _owner = source.readAddress();
    let _tokenAAmount = source.readBigNumber();
    let _walletTokenAAddress = source.readAddress();
    let _tokenBAmount = source.readBigNumber();
    let _walletTokenBAddress = source.readAddress();
    return { $$type: 'PayTo' as const, owner: _owner, tokenAAmount: _tokenAAmount, walletTokenAAddress: _walletTokenAAddress, tokenBAmount: _tokenBAmount, walletTokenBAddress: _walletTokenBAddress };
}

function storeTuplePayTo(source: PayTo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.tokenAAmount);
    builder.writeAddress(source.walletTokenAAddress);
    builder.writeNumber(source.tokenBAmount);
    builder.writeAddress(source.walletTokenBAddress);
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
}

export function storeSwap(src: Swap) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(961172390, 32);
        b_0.storeAddress(src.fromAddress);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.tokenWallet);
        b_0.storeAddress(src.toAddress);
        let b_1 = new Builder();
        b_1.storeCoins(src.minOutput);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwap(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 961172390) { throw Error('Invalid prefix'); }
    let _fromAddress = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadCoins();
    let _tokenWallet = sc_0.loadAddress();
    let _toAddress = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _minOutput = sc_1.loadCoins();
    return { $$type: 'Swap' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, tokenWallet: _tokenWallet, toAddress: _toAddress, minOutput: _minOutput };
}

function loadTupleSwap(source: TupleReader) {
    let _fromAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _tokenWallet = source.readAddress();
    let _toAddress = source.readAddress();
    let _minOutput = source.readBigNumber();
    return { $$type: 'Swap' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, tokenWallet: _tokenWallet, toAddress: _toAddress, minOutput: _minOutput };
}

function loadGetterTupleSwap(source: TupleReader) {
    let _fromAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _tokenWallet = source.readAddress();
    let _toAddress = source.readAddress();
    let _minOutput = source.readBigNumber();
    return { $$type: 'Swap' as const, fromAddress: _fromAddress, jettonAmount: _jettonAmount, tokenWallet: _tokenWallet, toAddress: _toAddress, minOutput: _minOutput };
}

function storeTupleSwap(source: Swap) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.fromAddress);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.tokenWallet);
    builder.writeAddress(source.toAddress);
    builder.writeNumber(source.minOutput);
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

 type ExampleJettonWallet_init_args = {
    $$type: 'ExampleJettonWallet_init_args';
    owner: Address;
    jetton_master: Address;
}

function initExampleJettonWallet_init_args(src: ExampleJettonWallet_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
    };
}

async function ExampleJettonWallet_init(owner: Address, jetton_master: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initExampleJettonWallet_init_args({ $$type: 'ExampleJettonWallet_init_args', owner, jetton_master })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ExampleJettonWallet_errors: { [key: number]: { message: string } } = {
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
    27831: { message: `Only owner can call this function` },
    29133: { message: `JettonWallet: Not allow negative balance after internal transfer` },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    37185: { message: `Not enough funds to transfer` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    46438: { message: `Pool: No fees to collect` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
}

const ExampleJettonWallet_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
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
    {"name":"PoolData","header":null,"fields":[{"name":"reserve0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"token0Address","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Address","type":{"kind":"simple","type":"address","optional":false}},{"name":"lpFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolFeeAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"collectedToken0ProtocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"collectedToken1ProtocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExpectedLiquidity","header":null,"fields":[{"name":"amount0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"amount1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Reserves","header":null,"fields":[{"name":"reserve0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PayTo","header":3294648920,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenAAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"walletTokenAAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenBAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"walletTokenBAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProvideLiquidity","header":895103077,"fields":[{"name":"fromAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minLPOut","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"BurnNotification","header":1023788527,"fields":[{"name":"fromAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RefundMe","header":1209260035,"fields":[{"name":"tot_am0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tot_am1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetFees","header":1422094576,"fields":[{"name":"newLPFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"newProtocolFees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"newProtocolFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Swap","header":961172390,"fields":[{"name":"fromAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"toAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"minOutput","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Pool$Data","header":null,"fields":[{"name":"routerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"lpFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolFeesAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"collectedTokenAProtocolFees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"collectedTokenBProtocolFees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"wallet0","type":{"kind":"simple","type":"address","optional":false}},{"name":"wallet1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"token0PrecisionMultiplier","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token1PrecisionMultiplier","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"poolParams","type":{"kind":"simple","type":"PoolParams","optional":false}},{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"test","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const ExampleJettonWallet_getters: ABIGetter[] = [
    {"name":"get_wallet_data","arguments":[],"returnType":{"kind":"simple","type":"WalletData","optional":false}},
]

export const ExampleJettonWallet_getterMapping: { [key: string]: string } = {
    'get_wallet_data': 'getGetWalletData',
}

const ExampleJettonWallet_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonBurn"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonInternalTransfer"}},
]

export class ExampleJettonWallet implements Contract {
    
    static async init(owner: Address, jetton_master: Address) {
        return await ExampleJettonWallet_init(owner, jetton_master);
    }
    
    static async fromInit(owner: Address, jetton_master: Address) {
        const init = await ExampleJettonWallet_init(owner, jetton_master);
        const address = contractAddress(0, init);
        return new ExampleJettonWallet(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ExampleJettonWallet(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ExampleJettonWallet_types,
        getters: ExampleJettonWallet_getters,
        receivers: ExampleJettonWallet_receivers,
        errors: ExampleJettonWallet_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonTransfer | JettonBurn | JettonInternalTransfer) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransfer') {
            body = beginCell().store(storeJettonTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonBurn') {
            body = beginCell().store(storeJettonBurn(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonInternalTransfer') {
            body = beginCell().store(storeJettonInternalTransfer(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetWalletData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_wallet_data', builder.build())).stack;
        const result = loadGetterTupleWalletData(source);
        return result;
    }
    
}