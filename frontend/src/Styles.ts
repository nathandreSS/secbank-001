// In your global styles file (e.g., GlobalStyles.js)
import { createGlobalStyle } from "styled-components";
import { COLORS } from "./Constants";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
  }

  html, body {
    height: 100vh;
    width: 100%;
    font-family: Roboto Mono, sans-serif;
    background: ${COLORS.primary};
    color: ${COLORS.text};
    
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
  }
  
  button {
    cursor: pointer;
    
    outline: none;
    border: 0;
    padding: 10px 20px;
    
    background-color: ${COLORS.accent};
    color: ${COLORS.secondary};
  }
`;

export default GlobalStyle;
