import { createGlobalStyle } from 'styled-components';

import { mixins } from './mixins';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    color: ${({ theme }) => theme.colors.grey[900]};
    background-color: ${({ theme }) => theme.colors.beige[100]};
    line-height: 1.5; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ul, ol {
    ${mixins.utils.resetList} 
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  .hidden {
    ${mixins.utils.visuallyHidden}
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    margin: 0 0 1rem 0;
  }

  iframe, embed, object, video {
    max-width: 100%;
  }

  @media print {
    body {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.grey[900]};
    }

    a {
      text-decoration: underline;
    }

    .no-print {
      display: none;
    }
  }
`;
