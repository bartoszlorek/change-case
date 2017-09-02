import React from 'react';
import style from '../style.css';

import Message from './message';

function Controls(props) {
    return (
        <div className={style.controls}>
            <Message data={props.message} />
            <button
                type='submit'
                className='save'
                onClick={props.onSave}>
                Save
            </button>
        </div>
    )
}

export default Controls;