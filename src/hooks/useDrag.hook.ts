import {useDrag, useDrop, XYCoord} from "react-dnd";
import {ItemTypes} from "../components/App/App";
import React from "react";
import {useAppDispatch} from "../store/hooks.js";
import {clearDropClass, movePart} from "../store/reducers/partsSlice";
import {setDropClass} from "../store/reducers/partsSlice";

type CustomDragProps = {
    type: string,
    index: number,
    id: number,
    ref: React.RefObject<any>
}

const useCustomDrag = ({type, index, id, ref} : CustomDragProps)  => {

    const dispatch = useAppDispatch()

    const [{isOver}, drop] = useDrop(() => ({
        accept: [ItemTypes.SCREEN, ItemTypes.PART],

        drop(item:{name:string, index:number, id:number}, monitor) {
            if (!ref.current) {
                return
            }
            let dragIndex = item.index
            let dropIndex = index

            if (dragIndex === dropIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex - dropIndex === -1 && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex - dropIndex === 1 && hoverClientY > hoverMiddleY) {
                return
            }

            if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
                dropIndex++
            }
            if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
                dropIndex--
            }

            dispatch(movePart({dragId: item.id, dragIndex, dropIndex}))

            dispatch(clearDropClass())
        },

        hover(item, monitor) {
            const dragIndex = item.index
            const dropIndex = index

            if (dragIndex === dropIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex - dropIndex === -1 && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex - dropIndex === 1 && hoverClientY > hoverMiddleY) {
                return
            }

            if (hoverClientY > hoverMiddleY) {
                dispatch(setDropClass({id, dropClass: ' drop-spot--down'}))
            } else if (hoverClientY < hoverMiddleY) {
                dispatch(setDropClass({id, dropClass: ' drop-spot--up'}))
            }


        },

        collect(monitor) {
            return {
                isOver: monitor.isOver({ shallow: true }),
                canDrop: monitor.canDrop(),
            }
        },
    }), [index])

    const [{isDragging}, drag] = useDrag(() => ({
        type,
        item: () => {
            return {index, id}
        },

        collect: (monitor => ({
            isDragging: monitor.isDragging(),
        })),
    }), [index])

    return {isDragging, drag, drop, isOver}

};

export default useCustomDrag;