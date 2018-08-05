import React from 'react'
import styled from 'styled-components'

class Checkbox extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onChange(e.target.checked)
    }

    render() {
        return (
            <div className={this.props.className}>
                <label>
                    <input
                        type="checkbox"
                        checked={!!this.props.value}
                        onChange={this.handleChange}
                    />
                    {this.props.label}
                </label>
            </div>
        )
    }
}

export default styled(Checkbox)`
    line-height: 2em;

    & label:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    & input {
        margin: 0 10px 0 0;
        vertical-align: -0.15em;
        cursor: pointer;
    }
`
