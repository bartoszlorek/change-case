import React from 'react'
import styled from 'styled-components'
import { confirmable } from 'react-confirm'
import { showIn } from '../animation'

import Button, { PrimaryButton } from './Button'
import Wrap from './Wrap'

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

class Dialog extends React.PureComponent {
    render() {
        let { className, proceed, dismiss, message } = this.props
        return (
            <div className={className}>
                <Window>
                    <Wrap>{message}</Wrap>
                    <WrapButtons>
                        <Button value="No" onClick={dismiss} />
                        <PrimaryButton value="Yes" onClick={proceed} />
                    </WrapButtons>
                </Window>
            </div>
        )
    }
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
