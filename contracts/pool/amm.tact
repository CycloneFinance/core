trait IMath{
    fun within1(a: Int, b: Int): Bool{
        if (a > b) {
            return a - b <= 1;
        }
        return b - a <= 1;
    }
}

trait AMM with IMath{
    const MAX_FEE: Int = 10000;

    token0PrecisionMultiplier: Int;
    token1PrecisionMultiplier: Int;

    fun _getSwapFee(sender: Address, tokenIn: Address, tokenOut: Address): Int {
        let sd: Address = context().sender;
        // return self.getSwapFee(sender, tokenIn, tokenOut, sd);
        return 50; // 0.05%
    }

    // fun getSwapFee(sender: Address, tokenIn: Address, tokenOut: Address, data: Address): Int {
    //     To be supplemented
        
    //     return 50; // 0.05%
    // }


    fun _getAmountOut(
        a: Int,              // Amplification factor A
        swapFee: Int,        // Swap Fee
        amountIn: Int,       // Number of tokens entered by the user
        reserve0: Int,       // Reserve for Token 0
        reserve1: Int,       // Reserve for Token 1
        token0In: Bool       // Whether Token0 or not
    ): AmountOut {
        let dy: Int = 0;
        let feeIn: Int = 0;
        if (amountIn != 0) {
            // Adjusting accuracy
            let adjustedReserve0 = reserve0 * self.token0PrecisionMultiplier; 
            let adjustedReserve1 = reserve1 * self.token1PrecisionMultiplier;

            // Calculation of swap fees
            feeIn = (amountIn * swapFee) / self.MAX_FEE;
            let feeDeductedAmountIn = amountIn - feeIn;

            // Calculate the invariant D
            let d = self.computeDFromAdjustedBalances(a, adjustedReserve0, adjustedReserve1);

            
            if (token0In) {
                // The input is token0, the output is token1.
                let x = adjustedReserve0 + (feeDeductedAmountIn * self.token0PrecisionMultiplier);
                let y = self.getY(a, x, d);  // Calculation of invariants based on new reserves
                dy = (adjustedReserve1 - y - 1) / self.token1PrecisionMultiplier; // Number of tokens exported
            } else {
                // Input is token1, output is token0.
                let x = adjustedReserve1 + (feeDeductedAmountIn * self.token1PrecisionMultiplier);
                let y = self.getY(a, x, d);
                dy = (adjustedReserve0 - y - 1) / self.token0PrecisionMultiplier;
            }
        }
        return AmountOut{amountOut: dy, feeIn: feeIn};
    }

    // computeD
    fun computeDFromAdjustedBalances(a: Int, xp0: Int, xp1: Int): Int {
        // The D formula for StableSwap is implemented here.
        let s = xp0 + xp1;

        if (s != 0) {
            let prevD: Int = 0;
            let d = s;

            let nA = 2 * a;
            let nA_ = nA - 1;

            let i = 0;

            repeat (256) {
                // Calculate dP = (((d * d) / xp0) * d) / xp1 / 4;
                let dP = (((d * d) / xp0) * d) / xp1 / 4;
                prevD = d;

                // Calculate new d = (((2000 * s) + 2 * dP) * d) / ((2000 - 1) * d + 3 * dP);
                d = (((nA * s) + 2 * dP) * d) / (nA_ * d + 3 * dP);

                i += 1;
                if (self.within1(d, prevD)) {
                    return d;
                }
            }

            return d;
        }

        return 0;
    }

    // getY function, which calculates the output token amount based on the input token amount and D
    fun getY(a: Int, x: Int, d: Int): Int {
        // (d * d) / (x * 2)
        let c = (d * d) / (x * 2);
        // c * d / (a * 4) 
        c = c * d / (a * 4);

        let b = x + d / (2 * a);
        let yPrev: Int = 0;
        let y = d;

        let i = 0;
        repeat (256) {
            yPrev = y;
            // y = (y * y + c) / (y * 2 + b - d);
            y = (y * y + c) / (y * 2 + b - d);

            i += 1;
            if (self.within1(y, yPrev)) {
                return y;
            }
        }

        return y;
    }

    fun getA(params: PoolParams): Int{
        // Ramps A.
        if (now() < params.futureTime) {
            if (params.futureA < params.initialA) {
                let diff: Int = params.initialA - params.futureA;
                let elapsed: Int = now() - params.initialTime;
                let duration: Int = params.futureTime - params.initialTime;

                return params.initialA - (diff * elapsed / duration);
            }
        }

        return params.futureA;
    }

}

struct PoolParams {
    initialA: Int;
    futureA: Int;
    initialTime: Int;
    futureTime: Int;
}

struct AmountOut{
    amountOut: Int as coins;
    feeIn: Int as coins;
}