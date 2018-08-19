import React from 'react'

class Input extends React.PureComponent {
    handleChange = event => {
        this.props.onChange(event.target.value)
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
