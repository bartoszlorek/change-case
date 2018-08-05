import React from 'react'
import styled, { keyframes } from 'styled-components'

const wave = keyframes`
    0%, 60%, 100% {
        transform: initial;
    }
    30% {
        transform: translateY(-75%);
    }
`

const Dots = props => (
    <div {...props}>
        <span />
        <span />
        <span />
    </div>
)

export default styled(Dots)`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 0 0 -15px;
    display: flex;

    & > span {
        position: relative;
        width: 6px;
        height: 6px;
        margin: 0 2px 0;
        border-radius: 100%;
        background: rgba(255, 255, 255, 0.6);
        display: inline-block;
        animation: ${wave} 1.4s linear infinite;
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);

        &:nth-child(2) {
            animation-delay: 0.35s;
        }
        &:nth-child(3) {
            animation-delay: 0.7s;
        }
    }
`
