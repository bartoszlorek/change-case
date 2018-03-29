import React from 'react'
import bem from '../bem'

function Ribbon({ active }) {
    return (
        <div
            className={bem('ribbon').mod('active', active)}>
        </div>
    )
}

export default Ribbon
