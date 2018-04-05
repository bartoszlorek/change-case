import React from 'react'
import { bind } from '../../.utils/react/react-utils'

class Input extends React.PureComponent {
    constructor(props) {
        super(props)
        bind(this, [
            'handleChange'
        ])
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <input
                {...this.props}
                type="text"
                value={this.props.value || ''}
                onChange={this.handleChange}
            />
        )
    }
}

export default Input
