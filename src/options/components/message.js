import React from 'react';
import classNames from 'classnames';
import style from '../style.css';

function Message(props) {
    if (props.data == null) {
        return null;
    }
    let { type, text } = props.data;
    return (
        <div
            className={classNames(
                style['message'],
                style[type]
            )}>
            {text}
        </div>
    )
}

export default Message;