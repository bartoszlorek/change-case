import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import makeBem from '../../.utils/react/make-bem';
import style from '../style.css';

const button = makeBem('button', style);

function Button(props) {
    let { state, label } = props;

    if (state === 'hidden') {
        return null;
    }
    let newProps = omit(props, ['state', 'label']),
        modifier = button.mod(state);
    return (
        <button
            {...newProps}
            className={classNames(
                button(),
                modifier,
                props.className
            )}>
            {label}
        </button>
    )
}

export default Button;