import React from 'react'

class Input extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
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
