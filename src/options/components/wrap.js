import React from 'react';
import escQuotes from '../utils/esc-quotes';
import style from '../style.css';

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