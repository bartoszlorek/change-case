import React from 'react';
import style from '../style.css';

function Message(props) {
    let { data } = props;
    let text, type;

    if (data) {
        text = data.text;
        type = data.type === 'error'
            ? style.error
            : style.info;
    }
    return (
        <div className={type}>{text}</div>
    )
}

export default Message;