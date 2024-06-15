import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  ::selection {
    background: #edd55e;
    color: #000;
  }
`;

export default GlobalStyle;
