import React from 'react';
import style from '../style.css';

function Button(props) {
    let { label, visible, onClick } = props;

    if (visible === false) {
        return null;
    }
    return (
        <button
            className={style.button}
            onClick={onClick}>
            {label}
        </button>
    )
}

export default Button;