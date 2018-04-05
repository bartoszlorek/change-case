import React from 'react'
import styled from 'styled-components'
import { bind } from '../../.utils/react/react-utils'

class Textarea extends React.PureComponent {
    constructor(props) {
        super(props)
        bind(this, ['handleChange'])
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <textarea
                {...this.props}
                value={this.props.value || ''}
                rows={this.props.rows || '5'}
                onChange={this.handleChange}
            />
        )
    }
}

export default styled(Textarea)`
    width: 100%;
    resize: vertical;
    border: 1px solid #dddfe2;
    padding: 4px 6px;
    box-sizing: border-box;
    outline: 0;

    &:focus {
        border-color: #009ff1;
    }
`
