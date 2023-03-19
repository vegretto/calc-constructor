import {createSlice} from "@reduxjs/toolkit";

export const dragAndDropSlice = createSlice({
    name: 'dragAndDrop',
    initialState: [
        {id: 0, calcPart: ''},
        // {id: 1, calcPart: ''},
        // {id: 2, calcPart: ''},
        // {id: 3, calcPart: ''},
    ],
    reducers: {
        moveToSlot: (state, action) => {
            state.map(part => {
                if (part.calcPart === action.payload.calcPart) {
                    part.calcPart = ''
                }
                if (part.id === action.payload.id) {
                    part.calcPart = action.payload.calcPart
                }

                return part
            })
        },
        removeFromSlot: (state, action) => {
            state.map(part => {
                if (part.id === action.payload) {
                    part.calcPart = ''
                }
                return part
            })
        }
    }
})

export const { moveToSlot, removeFromSlot } = dragAndDropSlice.actions

export default dragAndDropSlice.reducer