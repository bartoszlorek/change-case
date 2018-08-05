import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { choose } from '../.utils/react-utils'

const DEFAULT_TYPE = 'info'
const ERROR_TYPE = 'error'

class Console extends React.PureComponent {
    componentDidUpdate() {
        if (this.props.logger == null) {
            return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.props.handler(null)
        }, this.props.timeout)
    }

    render() {
        if (this.props.logger == null) {
            return null
        }
        return (
            <div className={this.props.className}>
                {this.props.logger.text}
            </div>
        )
    }
}

Console.propTypes = {
    logger: PropTypes.object,
    timeout: PropTypes.number,
    handler: PropTypes.func
}

Console.defaultProps = {
    logger: null,
    timeout: 3000,
    handler: () => {}
}

export default styled(Console)`
    margin: 0 auto 0 0;
    white-space: nowrap;
    overflow: hidden;

    ${choose('logger.type', {
        [DEFAULT_TYPE]: css`
            color: #009ff1;
            font-weight: bold;`,
        [ERROR_TYPE]: css`
            color: #f1002b;
            font-weight: bold;`
    })};
`

export function createLogger(text, type) {
    if (text == null) {
        return null
    }
    return {
        text,
        type: type || DEFAULT_TYPE
    }
}
