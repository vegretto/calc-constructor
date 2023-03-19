import './digits.scss'
import React, {useRef, useState} from 'react';
import Digit from "../Digit/Digit";
import {useAppDispatch} from "../../store/hooks.js";
import {setDigit} from "../../store/reducers/calcLogicSlice";
import useCustomDrag from "../../hooks/useDrag.hook";
import {ItemTypes} from "../App/App";
import {CalcPartProps} from "../Canvas/Canvas";
import classNames from "classnames";

const Digits = ({isInConstructorMode, index, isInSidebar, id, dropClass, isInCanvas} : CalcPartProps) => {
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLDivElement>(null)
    const {isDragging, drag, drop, isOver} = useCustomDrag({type:ItemTypes.PART, index, id, ref})
    const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']

    const onDigitClick = (symbol: string) => {
        !isInConstructorMode && dispatch(setDigit(symbol))
    }

    const digitsMarkup = digits.map((digit, index) => {
        return <Digit symbol={digit} key={index} onDigitClick={onDigitClick} />
    })

    drag(drop(ref))

    const compClass = classNames ( {
        'part': true,
        'digits': true,
        'inSidebar': isInSidebar,
        'disabled': isInSidebar && isInCanvas,
        'drop-spot': isOver
    })

    return (
        <div className={compClass + (!isInSidebar ? dropClass: '')} ref={ref}>
            {digitsMarkup}
        </div>
    );
};

export default Digits;