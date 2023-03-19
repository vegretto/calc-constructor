import {CalcLogicStateType} from "../reducers/calcLogicSlice";

export const doCalcs = (operator:string, value1:number, value2:number) => {
    let result = 0
    let zeroError = false
    let noOperatorError = false
    switch (operator) {
        case '+':
            result = value1 + value2
            break
        case '-':
            result = value1 - value2
            break
        case 'x':
            result = value1 * value2
            break
        case '/':
            result = +((value1 / value2).toFixed(15))
            if (result === Infinity || result === -Infinity) {
                zeroError = true
            }
            break
        default: noOperatorError = true
    }
    return {result, zeroError, noOperatorError}
}

export const applyCalcResult = (state: CalcLogicStateType) => {
    const {result, zeroError} = doCalcs(state.currentOperator, state.storedValue, state.currentValue)
    if (zeroError) {
        state.zeroDivisionError = true
        return
    }
    state.result = result
    state.screenValue = state.result.toString().replace(/\./g, ',')
    state.storedValue = state.result
}