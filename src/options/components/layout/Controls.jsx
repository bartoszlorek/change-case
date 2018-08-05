import styled from 'styled-components'

const Controls = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding: 14px 17px;
    background: #fff;
    border-top: 1px solid #dddfe2;
    box-shadow: 0px -3px 1px 0px rgba(50, 60, 70, 0.04);

    & > button {
        margin: 0 0 0 6px;
        flex-shrink: 0;
    }
`

export default Controls
