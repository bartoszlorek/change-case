import styled from 'styled-components'

const Link = styled.a`
    white-space: nowrap;

    &,
    &:visited,
    &:focus,
    &:active,
    &:hover {
        color: ${props => props.light ? '#fff' : '#000'};
        text-decoration: underline;
    }
    &:active,
    &:hover {
        text-decoration: none;
    }
`

export default Link
