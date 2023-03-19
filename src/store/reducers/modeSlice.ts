import {createSlice} from "@reduxjs/toolkit";

export const modeSlice = createSlice({
    name: 'mode',
    initialState: {
        isInConstructorMode: true,
        isCanvasInitialized: false,
    },
    reducers: {
        setMode: (state, action) => {
            if (action.payload === 'constructor') {
                state.isInConstructorMode = true
            } else if (action.payload === 'runtime') {
                state.isInConstructorMode = false
            }
        },
        initializeCanvas: (state) => {
          state.isCanvasInitialized = true
        },
        deInitializeCanvas: (state) => {
          state.isCanvasInitialized = false
        }
    }
})

export const { setMode, initializeCanvas, deInitializeCanvas } = modeSlice.actions

export default modeSlice.reducer