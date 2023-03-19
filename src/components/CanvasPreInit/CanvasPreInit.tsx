import './canvasPreInit.scss'
import React from 'react';
import { ReactComponent as PicSvg } from '../../assest/svg/pic.svg';

const CanvasPreInit = () => {
    return (
        <div className={'canvasPreInit'}>
            <div className="canvasPreInitContent">
                <div className="canvasPreInitIcon">
                    <PicSvg />
                </div>
                <div className="canvasPreInitTitle">Перетащите сюда</div>
                <div className="canvasPreInitText">любой элемент из&nbsp;левой панели</div>
            </div>

        </div>
    );
};

export default CanvasPreInit;