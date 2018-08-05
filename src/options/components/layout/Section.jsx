import React from 'react'
import styled from 'styled-components'

import mark from './mark'
import Wrap from './Wrap'

const Description = styled.p`
    margin: 0 0 1em;
    line-height: 1.5em;
`

class Section extends React.PureComponent {
    render() {
        let { title, description, children } = this.props
        return (
            <Wrap>
                {(title || description) && (
                    <Description>
                        {title && <b>{title}: </b>}
                        {mark(description)}
                    </Description>
                )}
                {children}
            </Wrap>
        )
    }
}

export default Section
