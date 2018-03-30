import React from 'react'
import { confirmable } from 'react-confirm'
import Button from './button'
import bem from '../bem'

function Dialog({ proceed, dismiss, message }) {
    return (
        <div className={bem('dialog')}>
            <div className={bem('dialog', 'window')}>
                <div className={bem('wrap')}>{message}</div>
                <div className={bem('wrap').extra(bem('dialog', 'buttons'))}>
                    <Button
                        onClick={dismiss}>
                        No
                    </Button>
                    <Button
                        className={bem('button').mod('primary')}
                        onClick={proceed}>
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default confirmable(Dialog)
