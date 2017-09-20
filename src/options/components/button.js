import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import style from '../style.css';

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
                modifier
            )}>
            {label}
        </button>
    )
}

export default Button;