import React from 'react'
import onClickOutside from 'react-onclickoutside'
import { uniq } from 'lodash'
import { bind } from '../../.utils/react/react-utils'
import bem from '../bem'

const record = require('mousetrap-record')
const mousetrap = record(require('mousetrap'))

const dots = (
    <div className={bem('dots')}>
        <span></span>
        <span></span>
        <span></span>
    </div>
)

const escKeys = code => {
    if (code != null) {
        return uniq(code
            .split(/[\+\s]/))
            .join('+')
    }
}

const containsClass = className => event => {
    return event.target.classList.contains(className)
}
const isItem = containsClass(bem('item'))

class ShortcutsItem extends React.Component {
    constructor(props) {
        super(props)
        bind(this, [
            'handleClick'
        ])
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active === false) {
            return
        }
        mousetrap.record(code => {
            this.props.onClick()
            this.props.onAssign(
                this.props.data.name,
                code
            );
            return false
        })
    }

    handleClick() {
        this.props.onClick(this.props.data.name)
        mousetrap.record(() => false)
    }

    handleClickOutside(e) {
        if (this.props.active && !isItem(e)) {
            this.handleClick()
        }
    }

    render() {
        let { data, value, active } = this.props
        return (
            <div
                className={bem('item').mod('active', active)}
                onClick={this.handleClick}>
                <div>{data.label}</div>
                <div>{escKeys(value)}</div>
                {active && dots}
            </div>
        )
    }
}

export default onClickOutside(ShortcutsItem)
