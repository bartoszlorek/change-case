import React from 'react';
import { omit } from 'lodash';
import bem from '../bem';

function Button(props) {
    let { state, label } = props;

    if (state === 'hidden') {
        return null;
    }
    let newProps = omit(props, ['state', 'label']);
    return (
        <button
            {...newProps}
            className={bem('button')
                .extra(props.className)
                .mod(state)}>
            {label}
        </button>
    )
}

export default Button;