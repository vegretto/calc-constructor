import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {applyCalcResult} from "../helpers/calcHelper";


export type CalcLogicStateType = {
    currentValue: number,
    storedValue: number,
    screenValue: string,
    result: number
    currentOperator: string
    screenToRefresh: boolean
    zeroDivisionError: boolean,
    isForCalcNextStep: boolean,
    isCurrentValueChanged: boolean,
}

const initialState: CalcLogicStateType = {
    currentValue: 0,
    storedValue: 0,
    screenValue: '0',
    result: 0,
    currentOperator: '',
    screenToRefresh: true,
    zeroDivisionError: false,
    isForCalcNextStep: false,
    isCurrentValueChanged: false,
}

export const calcLogicSlice = createSlice({
    name: 'calcLogic',
    initialState,
    reducers: {
        setDigit: (state, action: PayloadAction<string>) => {
            if (state.zeroDivisionError) {
                Object.assign(state, initialState)
            }
            if (state.screenToRefresh) {
                state.screenValue = action.payload
                state.screenToRefresh = false;
            } else if (state.screenValue.length <= 17) {
                state.screenValue = state.screenValue + action.payload
            }
            if (state.screenValue[0] === ',') {
                state.screenValue = '0' + state.screenValue
            }
            state.currentValue = +(state.screenValue.replace(/,/g, '.'))
            state.isCurrentValueChanged = true
        },
        setOperator: (state, action: PayloadAction<string>) => {
            if (state.isForCalcNextStep) {
                if (state.isCurrentValueChanged) {
                    applyCalcResult(state)
                }
            } else {
                if (!state.screenToRefresh) {
                    state.storedValue = state.currentValue
                }
                state.isForCalcNextStep = true
            }
            state.currentOperator = action.payload
            state.screenToRefresh = true
            state.isCurrentValueChanged = false
        },
        doCalculations: (state) => {
            if (state.isCurrentValueChanged) {
                applyCalcResult(state)
                state.screenToRefresh = true
                state.isForCalcNextStep = false
            }
        }
    }
})

export const {setDigit, setOperator, doCalculations} = calcLogicSlice.actions

export default calcLogicSlice.reducer