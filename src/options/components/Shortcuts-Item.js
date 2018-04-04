import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import { bind, choose } from '../../.utils/react/react-utils'
import { wave } from '../animation'
import { uniq } from 'lodash'

const record = require('mousetrap-record')
const mousetrap = record(require('mousetrap'))

const Dots = styled(props => (
    <div {...props}>
        <span />
        <span />
        <span />
    </div>
))`
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

class ShortcutsItem extends React.PureComponent {
    constructor(props) {
        super(props)
        bind(this, ['handleClick'])
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active === false) {
            return
        }
        mousetrap.record(code => {
            this.props.onClick()
            this.props.onAssign(
                this.props.data.name,
                code
            )
            return false
        })
    }

    handleClick() {
        this.props.onClick(this.props.data.name)
        mousetrap.record(() => false)
    }

    handleClickOutside(e) {
        if (this.props.active && !this.isItem(e)) {
            this.handleClick()
        }
    }

    isItem(e) {
        return !this.props.className.indexOf(
            e.target.classList[0]
        )
    }

    toValue() {
        let value = this.props.value
        if (value == null) {
            return ''
        }
        return uniq(value
            .split(/[\+\s]/))
            .join('+')
    }

    render() {
        let { className, data, active } = this.props
        return (
            <div
                className={className}
                onClick={this.handleClick}
            >
                <div>{data.label}</div>
                <div>{this.toValue()}</div>
                {active && <Dots />}
            </div>
        )
    }
}

export default styled(onClickOutside(ShortcutsItem))`
    position: relative;
    padding: 0.75em;
    border-top: 1px dashed #dddfe2;
    display: flex;
    justify-content: space-between;

    &:first-child {
        border-top: 0;
    }
    &:hover {
        background: #eaedf0;
        cursor: pointer;
    }
    ${choose('active', {
        true: css`
            &,
            &:hover {
                color: #fff;
                background: #009ff1;
                border-top-color: #009ff1;
                border-top-style: solid;
            }
            & + * {
                border-top: 1px solid #009ff1;
            }`
    })};
`
