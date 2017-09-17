import React from 'react';
import style from '../style.css';

function Message(props) {
    let { data } = props;
    let className = style.message,
        text;

    if (data != null) {
        text = data.text;
        className += ' ' + (data.type === 'error'
            ? style.error
            : style.info
        )
    }
    return (
        <div className={className}>{text}</div>
    )
}

export default Message;