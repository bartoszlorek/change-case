import React from 'react'
import { confirmable } from 'react-confirm'
import styled, { keyframes } from 'styled-components'

import Button, { PrimaryButton } from './Button'
import Wrap from './Wrap'

const showIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`

const Window = styled.div`
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    width: 60%;
`

const WrapButtons = Wrap.extend`
    background: #f6f7f9;
    display: flex;
    justify-content: space-between;
`

function Dialog({ className, proceed, dismiss, message }) {
    return (
        <div className={className}>
            <Window>
                <Wrap>{message}</Wrap>
                <WrapButtons>
                    <Button onClick={dismiss}>No</Button>
                    <PrimaryButton onClick={proceed}>Yes</PrimaryButton>
                </WrapButtons>
            </Window>
        </div>
    )
}

export default styled(confirmable(Dialog))`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(42, 45, 53, 0.4);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${showIn} 0.5s normal forwards;
`
