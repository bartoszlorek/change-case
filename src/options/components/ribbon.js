import React from 'react';
import style from '../style.css';

function Ribbon(props) {
    let className = style.ribbon;
    if (props.active) {
        className += ' ' + style.ribbonActive;
    }
    return (
        <div className={className}></div>
    )
}

export default Ribbon;