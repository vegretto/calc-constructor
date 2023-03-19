import './operator.scss'
import React from 'react';

const Operator = ({symbol, onOperatorClick} : {symbol:string, onOperatorClick: (symbol:string) => void}) => {

    return (
        <div className={'operator'} onClick={() => onOperatorClick(symbol)}>
            {symbol}
        </div>
    );
};

export default Operator;