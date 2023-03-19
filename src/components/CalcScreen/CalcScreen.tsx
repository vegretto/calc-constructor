import './calcScreen.scss'
import React, {useEffect, useMemo, useRef} from 'react';
import {useAppSelector} from "../../store/hooks.js";
import {ItemTypes} from "../App/App";
import useCustomDrag from "../../hooks/useDrag.hook";
import {CalcPartProps} from "../Canvas/Canvas";
import classNames from "classnames";


const CalcScreen = ({isInConstructorMode, index, isInSidebar, id, dropClass, isInCanvas}: CalcPartProps) => {

    const screenValue = useAppSelector((state) => state.calcLogic.screenValue)
    const zeroDivisionError = useAppSelector(state => state.calcLogic.zeroDivisionError)
    const ref = useRef<HTMLDivElement>(null)
    const screenValueRef = useRef<HTMLDivElement>(null)
    const screenBgRef = useRef<HTMLDivElement>(null)
    const {isDragging, drag, drop, isOver} = useCustomDrag({
        type: ItemTypes.SCREEN,
        index,
        id,
        ref
    })
    drag(drop(ref))

    const compClass = classNames({
        'part': true,
        'screen': true,
        'error': zeroDivisionError,
        'disabled': isInSidebar && isInCanvas,
        'drop-spot': isOver
    })

    useEffect(() => {
        if (!isInSidebar && screenValueRef.current && screenBgRef.current) {
            let screenValueWidth = screenValueRef.current.offsetWidth
            const screenBgWidth = screenBgRef.current.offsetWidth

            while (screenValueWidth > screenBgWidth - 16) {
                let fontSize =  parseInt(screenValueRef.current.style.fontSize)
                screenValueRef.current.style.fontSize = fontSize - 3 + 'px'
                screenValueWidth = screenValueRef.current.offsetWidth
            }
        }
    } )

    const screenValueMarkup = isInSidebar ? 0 : !zeroDivisionError ? screenValue : 'Не определено'

    return (
        <div className={compClass + (!isInSidebar ? dropClass : '')} ref={ref}>
            <div className="screenBg" ref={screenBgRef}>
                <div className="screenValue" ref={screenValueRef} style={{fontSize: '36px'}}>
                    {screenValueMarkup}
                </div>
            </div>
        </div>
    );
};

export default CalcScreen;