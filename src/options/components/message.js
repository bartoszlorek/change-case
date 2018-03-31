import React from 'react'
import bem from '../bem'

function Message({ data }) {
    if (data == null) {
        return null
    }
    let { type, text } = data
    return (
        <div
            className={bem('message').mod(type)}>
            {text}
        </div>
    )
}

export default Message
