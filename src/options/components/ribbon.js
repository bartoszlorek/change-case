import React from 'react';
import classNames from 'classnames';
import style from '../style.css';

function Ribbon(props) {
    let { active } = props;
    return (
        <div
            className={classNames(
                active &&
                style['ribbon--active'],
                style['ribbon']
            )}>
        </div>
    )
}

export default Ribbon;