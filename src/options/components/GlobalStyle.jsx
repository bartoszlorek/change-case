import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        background: #f6f7f9;
    }

    ::selection {
        background: #edd55e;
        color: #000;
    }
`;

export default GlobalStyle;
