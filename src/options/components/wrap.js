import React from 'react';
import style from '../style.css';

function escQuotes(string) {
    if (!string) {
        return null;
    }
    let parts = string.trim().split('"');
    if (parts.length < 3) {
        return string;
    }
    let atStart = +(parts[0] === '');
    if (parts[0] === '') {
        parts.shift();
    }
    if (parts[parts.length - 1] === '') {
        parts.pop();
    }
    return parts.map((part, index) => index % 2 === atStart
        ? <span key={index}>{part}</span>
        : <i key={index}>{part}</i>
    )
}

export default function (props) {
    let { title, description, children } = props;
    return (
        <div className={style.wrap}>
            <p className={style.description}>
                {title && <b>{title}: </b>}{escQuotes(description)}
            </p>
            {children}
        </div>
    )
}
