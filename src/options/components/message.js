import React from 'react';
import bem from '../bem';

function Message(props) {
    if (props.data == null) {
        return null;
    }
    let { type, text } = props.data;
    return (
        <div
            className={bem('message').mod(type)}>
            {text}
        </div>
    )
}

export default Message;