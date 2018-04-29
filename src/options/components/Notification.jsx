import React from 'react'
import styled from 'styled-components'

class Notification extends React.PureComponent {
    render() {
        return (
            <div {...this.props}>
                {this.props.value}
            </div>
        )
    }
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
