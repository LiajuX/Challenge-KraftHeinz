import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media only screen and (max-width: 1024px) {
    html {
      font-size: 93.75%;
    }
  }

  @media only screen and (max-width: 768px) {
    html {
      font-size: 87.5%;
    }
  }

  @media only screen and (max-width: 640px) {
  }

  :focus {
    outline: 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme['grey-100']};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme['grey-200']};
  }

  body {
    color: ${(props) => props.theme.black};
    background: ${(props) => props.theme.white};

    -webbkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-size: 1.25rem; 
    font-weight: 400;
    font-family: 'Source Sans Pro', sans-serif;
  }

  h1 {
    color: ${(props) => props.theme['blue-800']};

    font-size: 3.125rem;
    font-weight: 900;
  }

  button {
    border: 0;

    cursor: pointer;
  }

  a {
    color: inherit; 

    text-decoration: none;
  }
`
