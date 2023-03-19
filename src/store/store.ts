import {configureStore} from "@reduxjs/toolkit"
import canvasReducer from './reducers/partsSlice'
import calcLogicReducer from './reducers/calcLogicSlice'
import modeReducer from './reducers/modeSlice'
import dragAndDropReducer from './reducers/dragAndDropSlice'

const store = configureStore({
    reducer: {
        calcParts: canvasReducer,
        calcLogic: calcLogicReducer,
        mode: modeReducer,
        dragAndDrop: dragAndDropReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store