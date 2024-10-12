trait SendUtils {
    const NORMAL: Int = 0;
    const PAID_EXTERNALLY: Int = 1;
    const IGNORE_ERRORS: Int = 2;

    const DESTROY_IF_ZERO: Int = 32;
    const CARRY_REMAINING_GAS: Int = 64;
    const CARRY_ALL_BALANCE: Int = 128;

    fun send_empty_message(_value: Int,_to: Address, _mode: Int) {
        send(SendParameters{
            to: _to,
            value: _value,
            bounce: true,
            mode: _mode,
            body: emptyCell()
        });
    }

    fun send_simple_message(_value: Int, _to: Address, _body: Cell, _mode: Int) {
        send(SendParameters{
            to: _to,
            value: _value,
            bounce: true,
            mode: _mode,
            body: _body
        });
    }

    fun send_message_nobounce(_value: Int, _to: Address, _body: Cell, _mode: Int) {
        send(SendParameters{
            to: _to,
            value: _value,
            bounce: false,
            mode: _mode,
            body: _body
        });
    }

    fun send_message_with_stateinit(_value: Int, _to: Address, _body: Cell, _stateInit: StateInit, _mode: Int) {
        send(SendParameters{
            to: _to,
            value: _value,
            bounce: true,
            mode: _mode,
            body: _body,
            code: _stateInit.code,
            data: _stateInit.data
        });
    }
        // send(SendParameters{
        //     to: receiver,
        //     value: 0,
        //     bounce: true,
        //     mode: SendRemainingValue,
        //     body: JettonInternalTransfer{
        //         query_id: msg.query_id,
        //         amount: msg.amount,
        //         response_address: msg.response_destination,
        //         from: self.owner,
        //         forward_ton_amount: msg.forward_ton_amount,
        //         forward_payload: msg.forward_payload
        //     }.toCell(),
        //     code: init.code,
        //     data: init.data
        // });
}
    
    