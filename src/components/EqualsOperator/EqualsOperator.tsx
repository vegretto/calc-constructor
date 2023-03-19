import './equalsOperator.scss'

import React, {useRef, useState} from 'react';
import {useAppDispatch} from "../../store/hooks.js";
import {doCalculations} from "../../store/reducers/calcLogicSlice";
import useCustomDrag from "../../hooks/useDrag.hook";
import {ItemTypes} from "../App/App";
import {CalcPartProps} from "../Canvas/Canvas";
import classNames from "classnames";

const EqualsOperator = ({isInConstructorMode, index, isInSidebar, id, dropClass, isInCanvas} : CalcPartProps) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null)
    const {isDragging, drag, drop, isOver} = useCustomDrag({type:ItemTypes.PART, index, id, ref})

    drag(drop(ref))

    const compClass = classNames ( {
        'part': true,
        'equals': true,
        'inSidebar': isInSidebar,
        'disabled': isInSidebar && isInCanvas,
        'drop-spot': isOver
    })


    return (
        <div className={compClass + (!isInSidebar ? dropClass: '')} ref={ref}
             onClick={() => { !isInConstructorMode && dispatch(doCalculations())}}>
            <div className="equalsBg">
                =
            </div>
        </div>
    );
};

export default EqualsOperator;