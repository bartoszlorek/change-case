import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import makeBem from '../../.utils/react/make-bem';
import style from '../style.css';

let block = makeBem('button', style);
console.log(block(null, 'primary'));

function Button(props) {
    let { state, label } = props;

    if (state === 'hidden') {
        return null;
    }
    let modifier = style['button--' + state],
        newProps = omit(props, ['state', 'label']);
    return (
        <button
            {...newProps}
            className={classNames(
                style['button'],
                props.className,
                modifier
            )}>
            {label}
        </button>
    )
}

export default Button;