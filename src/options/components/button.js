import React from 'react'
import bem from '../bem'

function Button(props) {
    if (props.state === 'hidden') {
        return null
    }
    let newProps = Object.assign({}, props)
    newProps.state = null

    return (
        <button
            {...newProps}
            className={bem('button')
                .extra(props.className)
                .mod(state)}
        >
            {props.children}
        </button>
    )
}

export default Button
