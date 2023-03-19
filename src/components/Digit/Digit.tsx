import './digit.scss'
import React from 'react';

const Digit = ({symbol, onDigitClick} : {symbol:string, onDigitClick: (digit:string) => void}) => {

    const zeroClass = symbol==='0' ? ' digit--zero' : ''

    return (
        <div className={'digit' + zeroClass} onClick={() => onDigitClick(symbol)}>
            {symbol}
        </div>
    );
};

export default Digit;