import React from 'react'
import styled from 'styled-components'
import { showIn } from '../animation'

class Button extends React.PureComponent {
    render() {
        if (this.props.hidden === true) {
            return null
        }
        return (
            <button {...this.props}>
                {this.props.children}
            </button>
        )
    }
}

const styledButton = styled(Button)`
    display: inline-block;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    text-decoration: none;
    user-select: none;
    outline: 0;
    border: 1px solid #c2c9d6;
    background: transparent;
    box-shadow: none;
    border-radius: 2px;
    padding: 0.5em 1em;
    line-height: 1.4em;
    font-size: 1em;
    transition: all 0.2s ease;
    animation: ${showIn} 0.5s normal forwards;
    cursor: pointer;

    &:hover {
        background: rgba(111, 127, 159, 0.075);
    }
    &:focus {
        border-color: #009ff1;
    }
    &:active {
        box-shadow: 0 0 4px #009ff1;
    }
    &:disabled,
    &:disabled:hover,
    &:disabled:focus,
    &:disabled:active {
        cursor: default;
        border-color: #d1d6e0;
        background: transparent;
        box-shadow: none;
        color: #b3bbcc;
    }
`

export const PrimaryButton = styledButton.extend`
    background: #009ff1;
    border-color: transparent;
    color: #fff;

    &:hover {
        background: #008fe6;
    }
    &:focus {
        border-color: #007ebd;
    }
`

export default styledButton
