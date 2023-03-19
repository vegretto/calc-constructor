import './canvasModeSwitcher.scss'
import { ReactComponent as EyeSvg } from '../../assest/svg/eye.svg';
import { ReactComponent as SelectorSvg } from '../../assest/svg/selector.svg';
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks.js";
import {setMode} from "../../store/reducers/modeSlice";

const CanvasModeSwitcher = ({type, active}: { type: string, active: boolean }) => {
    const dispatch = useAppDispatch()
    const isCanvasInitialized = useAppSelector(state => state.mode.isCanvasInitialized)



    return (
        <div className={'modeSwitcher' + (active ?  ' modeSwitcher--selected' : '')} onClick={() => isCanvasInitialized && dispatch( setMode(type))}>
            <div className="modeSwitcher__icon">
                {type==="runtime" ? <EyeSvg /> : <SelectorSvg />}
            </div>
            <div className="modeSwitcher__name">
                {type === 'constructor' ? 'Конструктор' : 'Калькулятор'}
            </div>

        </div>
    );
};

export default CanvasModeSwitcher;