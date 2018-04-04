import React from 'react'
import styled, { css } from 'styled-components'
import { choose } from '../../.utils/react/react-utils'

function Message(props) {
    if (props.data == null) {
        return null
    }
    return <div {...props}>{props.data.text}</div>
}

export default styled(Message)`
    margin: 0 auto 0 0;
    white-space: nowrap;
    overflow: hidden;

    ${choose('data.type', {
        info: css`
            color: #009ff1;
            font-weight: bold;`,
        error: css`
            color: #f1002b;
            font-weight: bold;`
    })};
`
