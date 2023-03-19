import './sidebar.scss'
import React from 'react';
import {useAppSelector} from "../../store/hooks.js";
import CalcScreen from "../CalcScreen/CalcScreen";
import Operators from "../Operators/Operators";
import Digits from "../Digits/Digits";
import EqualsOperator from "../EqualsOperator/EqualsOperator";
import {CalcPartProps} from "../Canvas/Canvas";

const partsMap: Record<number, (props:CalcPartProps) => JSX.Element> = {
    0: CalcScreen,
    1: Operators,
    2: Digits,
    3: EqualsOperator,
}

const Sidebar = () => {
    const calcPartsState = useAppSelector(state => state.calcParts.sidebarParts)
    const isInConstructorMode = useAppSelector(state => state.mode.isInConstructorMode)

    const calcParts = calcPartsState.map((part, index) => {
        const CalcPart = partsMap[part.id]
        return (
            <CalcPart isInConstructorMode={isInConstructorMode} key={part.id} index={10} isInSidebar={true} id={part.id} dropClass={part.dropClass} isInCanvas={part.isInCanvas}/>
        )
    })

    return (
        <div className={'sidebar'}>
            {isInConstructorMode && calcParts}
        </div>
    );
};

export default Sidebar;