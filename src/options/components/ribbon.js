import React from 'react';
import bem from '../bem';

function Ribbon(props) {
    return (
        <div
            className={bem('ribbon').mod(
                'active', props.active
            )}>
        </div>
    )
}

export default Ribbon;