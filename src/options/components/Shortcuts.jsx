import React from 'react'
import { findKey } from 'lodash'
import { bind } from '../../.utils/react/react-utils'

import ShortcutsItem from './Shortcuts-Item'

class Shortcuts extends React.PureComponent {
    constructor(props) {
        super(props)
        bind(this, [
            'handelActive',
            'handleAssign',
            'isAssigned',
            'validKeys'
        ])
        this.state = {
            active: null
        }
    }

    handelActive(itemName) {
        this.setState(({ active }) => ({
            active: itemName && itemName !== active ? itemName : null
        }))
    }

    handleAssign(itemName, code) {
        let result = this.validKeys(itemName, code)
        if (result !== false) {
            this.props.onChange({
                [itemName]: result
            })
        }
    }

    isAssigned(code) {
        return findKey(this.props.value, key => key === code) || false
    }

    validKeys(itemName, code) {
        if (code[0] === 'del') {
            return ''
        }
        let { onMessage } = this.props

        // don't press too long
        let last = code.length - 1
        if (code[last] === code[last - 1]) {
            return onMessage('invalid keys', 'error')
        }

        code = code.join(' ')
        let result = this.isAssigned(code)
        if (result !== false) {
            let text = 'already assigned'
            if (result !== itemName) {
                text += ` to ${result}`
            }
            return onMessage(text, 'error')
        }

        onMessage('correctly assigned')
        return code
    }

    render() {
        let { items, value } = this.props
        return (
            <div>
                {items && items.map(item => (
                    <ShortcutsItem
                        key={item.name}
                        data={item}
                        value={value && value[item.name]}
                        active={this.state.active === item.name}
                        onClick={this.handelActive}
                        onAssign={this.handleAssign}
                    />
                ))}
            </div>
        )
    }
}

export default Shortcuts
