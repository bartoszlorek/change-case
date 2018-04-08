import React from 'react'
import styled from 'styled-components'

class Notification extends React.PureComponent {
    render() {
        return (
            <div {...this.props}>
                <h2>{this.props.value}</h2>
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
    color: #fff;

    & h2 {
        font-weight: normal;
        margin: 0;
    }
`
