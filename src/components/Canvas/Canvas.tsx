import './canvas.scss'
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks.js";

import CanvasModeSwitcher from "../CanvasModeSwitcher/CanvasModeSwitcher";

import {useDrop} from "react-dnd";
import {ItemTypes} from "../App/App";
import {clearDropClass, removeFromCanvas, setDropClass, setToCanvas} from "../../store/reducers/partsSlice";
import CalcScreen from "../CalcScreen/CalcScreen";
import Operators from "../Operators/Operators";
import Digits from "../Digits/Digits";
import EqualsOperator from "../EqualsOperator/EqualsOperator";
import CanvasPreInit from "../CanvasPreInit/CanvasPreInit";
import {deInitializeCanvas, initializeCanvas} from "../../store/reducers/modeSlice";
import classNames from "classnames";

export type CalcPartProps = {
    isInConstructorMode: boolean
    index: number
    isInSidebar: boolean
    id: number
    dropClass: string
    isInCanvas: boolean
}

const calcPartsMap: Record<string, (props: CalcPartProps) => JSX.Element> = {
    'screen': CalcScreen,
    'operators': Operators,
    'digits': Digits,
    'equals': EqualsOperator
}
const Canvas = () => {

    const canvasParts = useAppSelector(state => state.calcParts.canvasParts)
    const isInConstructorMode = useAppSelector(state => state.mode.isInConstructorMode)
    const isCanvasInitialized = useAppSelector(state => state.mode.isCanvasInitialized)
    const dispatch = useAppDispatch()

    const [, drop] = useDrop(() => ({
        accept: [ItemTypes.SCREEN, ItemTypes.PART],

        drop: (item: {id: number}, monitor) => {
            if (monitor.isOver({shallow: true})) {
                if (!isCanvasInitialized) {
                    dispatch(initializeCanvas())
                }
                dispatch(setToCanvas(item.id))
                dispatch(clearDropClass())

            }
        },

        hover(item, monitor) {
            if (!isCanvasInitialized) return

            if (monitor.isOver({shallow: true}) && monitor.canDrop()) {
                dispatch(setDropClass({id: canvasParts[canvasParts.length - 1].id, dropClass: ' drop-spot drop-spot--down'}))
            }
        },

        canDrop: () => {
            return canvasParts.length < 4
        },

        collect(monitor) {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }
        },
    }), [canvasParts])

    const onPartClick = (id: number) => {
        if (isInConstructorMode) {
            dispatch(removeFromCanvas(id))
            if (canvasParts.length <= 1) {
                dispatch(deInitializeCanvas())
            }
        }
    }

    const calcPartsMarkup = canvasParts.map((part, index) => {
        const CalcPart = calcPartsMap[part.name]
        return <div key={part.id} onDoubleClick={() => onPartClick(part.id)}><CalcPart isInConstructorMode={isInConstructorMode}
                         index={index} isInSidebar={false} id={part.id}
                              dropClass={part.dropClass} isInCanvas={part.isInCanvas} /></div>
    })

    const compClass = classNames ({
        'canvas': true,
        'canvas--initialized': isCanvasInitialized
    })
    return (
        <div className={'canvasWrapper'}>
            <div className={'modeSwitchersWrapper'}>
                <CanvasModeSwitcher type={'runtime'} active={!isInConstructorMode}/>
                <CanvasModeSwitcher type={'constructor'} active={isInConstructorMode}/>
            </div>
            <div className={compClass} ref={drop}>
                {!isCanvasInitialized && <CanvasPreInit/>}
                {calcPartsMarkup}
            </div>
        </div>

    );
};

export default Canvas;