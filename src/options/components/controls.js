import React from 'react';
import style from '../style.css';

function controls(props) {
    return (
        <div className={style.controls}>
            <button
                type='submit'
                className='save'
                onClick={props.onSave}>
                Save
            </button>
        </div>
    )
}

export default controls;