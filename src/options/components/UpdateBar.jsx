import React from 'react'
import styled from 'styled-components'

class UpdateBar extends React.PureComponent {
    render() {
        return (
            <div {...this.props}>
                <h2>The extension has been successfully updated!</h2>
            </div>
        )
    }
}

export default styled(UpdateBar)`
    position: relative;
    padding: 18px;
    text-align: center;
    background: #858a8e;
    color: #fff;

    & h2 {
        font-weight: normal;
        margin: 0;
    }
`
