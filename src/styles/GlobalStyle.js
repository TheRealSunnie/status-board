import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    box-sizing: border-box;
  }

  body {
  min-height: 100%;
  background-color: black;
  margin: 0;
  font-family: 'Larsseit',-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  #root {
    height: 100%;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
