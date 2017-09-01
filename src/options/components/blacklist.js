import React from 'react';
import style from '../style.css';

export default function(props) {
    return (
        <div className={style.wrap}>
            <p className={style.description}>
                <b>Blacklist:</b> comma-separated list of words to ignore during conversion, <i>e.g. Hello World, New York, John, ...</i>
            </p>
            <textarea rows='5'></textarea>
        </div>
    )
}