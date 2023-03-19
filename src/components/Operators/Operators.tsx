import './operators.scss'
import React, {useRef} from 'react';
import Operator from "../Operator/Operator";
import {setOperator} from "../../store/reducers/calcLogicSlice";
import {useAppDispatch} from "../../store/hooks.js";
import {ItemTypes} from "../App/App";
import useCustomDrag from "../../hooks/useDrag.hook";
import {CalcPartProps} from "../Canvas/Canvas";
import classNames from "classnames";

const Operators = ({isInConstructorMode, index, isInSidebar, id, dropClass, isInCanvas} : CalcPartProps) => {
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLDivElement>(null)
    const {isDragging, drag, drop, isOver} = useCustomDrag({type:ItemTypes.PART, index, id, ref})

    const operators = ['/', 'x', '-', '+']

    const onOperatorClick = (symbol: string) => {
        !isInConstructorMode && dispatch(setOperator(symbol))
    }

    const operatorsMarkup = operators.map((operator, index) => {
        return <Operator symbol={operator} key={index} onOperatorClick={onOperatorClick} />
    })

    drag(drop(ref))

    const compClass = classNames ( {
        'part': true,
        'operators': true,
        'inSidebar': isInSidebar,
        'disabled': isInSidebar && isInCanvas,
        'drop-spot': isOver
    })

    return (
        <div className={compClass + (!isInSidebar ? dropClass: '')} ref={ref}>
            {operatorsMarkup}
        </div>
    );
};

export default Operators;