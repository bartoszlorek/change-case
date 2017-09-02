import React from 'react';
import style from '../style.css';

function Message(props) {
    let { data } = props;
    let type, text;

    if (data) {
        type = data.type === 'error' ? style.error : style.info;
        text = data.text;
    }
    return (
        <div className={type}>{text}</div>
    )
}

export default Message;