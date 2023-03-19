import {createSlice} from "@reduxjs/toolkit";

type calcPartType = {
    id: number,
    name: string,
    isInCanvas: boolean
    dropClass: string
}

export const calcPartsSlice = createSlice({
    name: 'calcParts',
    initialState: {
        sidebarParts: [
            {id: 0, name: 'screen', isInCanvas: false, dropClass: ''},
            {id: 1, name: 'operators', isInCanvas: false, dropClass: ''},
            {id: 2, name: 'digits', isInCanvas: false, dropClass: ''},
            {id: 3, name: 'equals', isInCanvas: false, dropClass: ''}
        ] as Array<calcPartType>,
        canvasParts: [] as Array<calcPartType>
    },
    reducers: {
        setToCanvas: (state, action) => {
            state.sidebarParts.map(part => {
                if (part.id === action.payload) {
                    part.isInCanvas = true
                    state.canvasParts.push(part)
                }
                return part
            })
        },
        movePart: (state, action) => {
            const calcPart = state.sidebarParts.find(part => part.id === action.payload.dragId)
            if (!calcPart) return

            if (calcPart.isInCanvas) {
                const partToMove = state.canvasParts.splice(action.payload.dragIndex, 1)[0]
                state.canvasParts.splice(action.payload.dropIndex, 0, partToMove)
            } else {
                state.sidebarParts.map(part => {
                    if (part.id === action.payload.dragId) {
                        part.isInCanvas = true
                    }
                    return part
                })
                state.canvasParts.splice(action.payload.dropIndex, 0, calcPart)
            }

        },
        removeFromCanvas: (state, action) => {
            state.sidebarParts.map(part => {
                if (part.id === action.payload) {
                    part.isInCanvas = false
                }
                return part
            })
            const partForDelete = state.canvasParts.find(part => part.id === action.payload)
            const index = state.canvasParts.findIndex(part => part.id === partForDelete?.id)

            state.canvasParts.splice(index, 1)
        },

        setDropClass: (state, action) => {
            state.canvasParts.map(part => {
                if (part.id === action.payload.id) {
                    part.dropClass = action.payload.dropClass
                }
                return part
            })
        },
        clearDropClass: (state) => {
            state.canvasParts.map(part => {
                part.dropClass = ''
                return part
            })
        }
    }
})

export const { setToCanvas, removeFromCanvas, movePart, setDropClass, clearDropClass } = calcPartsSlice.actions

export default calcPartsSlice.reducer