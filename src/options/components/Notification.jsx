import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import applyMarkdown from '../../.utils/react/apply-markdown'

const Link = styled.a`
    white-space: nowrap;

    &,
    &:visited,
    &:focus,
    &:active,
    &:hover {
        color: #fff;
        text-decoration: underline;
    }
    &:active,
    &:hover {
        text-decoration: none;
    }
`

const mark = applyMarkdown({
    '[]': Link
})

class Notification extends React.PureComponent {
    render() {
        return (
            <div className={this.props.className}>
                {mark(this.props.value)}
            </div>
        )
    }
}

Notification.propTypes = {
    value: PropTypes.string
}

Notification.defaultProps = {
    value: ''
}

export default styled(Notification)`
    position: relative;
    padding: 18px;
    margin-top: 4px;
    text-align: center;
    background: #009ff1;
    font-size: 1.25em;
    color: #fff;

    & h2 {
        font-weight: normal;
        margin: 0;
    }
`
