import React from 'react'
import styled, { css } from 'styled-components'
import { choose } from '../../.utils/react/react-utils'

const Ribbon = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #d1d6e0;
    box-shadow: 0 0 6px rgba(0, 159, 241, 0);
    transition: all 0.2s ease;
    height: 3px;

    ${choose('active', {
        true: css`
            background: #009ff1;
            box-shadow: 0 0 6px rgba(0, 159, 241, 0.85);`
    })};
`

export default Ribbon
