import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import { montVariants } from '../styles/typography'
import { theme } from '../styles/theme'

/*
  Layout is a style entry point of the application.
  GlobalStyle handles setting all the fonts,
  font size base values,
  resetting margins/padding setting box-sizing
  and other things one would want.
*/

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url(${montVariants.mont300}) format('woff2');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url(${montVariants.mont400}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url(${montVariants.mont500}) format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url(${montVariants.mont600}) format('woff2');
    font-weight: 600;
    font-style: normal;
  }

  html {
    font-size: ${theme.fontSizeBase};
  }

  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
    width: auto!important;
    overflow-x: hidden!important;
  }

  /* ::-webkit-scrollbar {
    display: none;
  } */

  body {
    font-family: ${theme.fonts.montserrat};
    background: ${theme.colors.white};
    font-size: ${theme.fontSizeBaseRem};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.fontColorBase};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
`

const Layout = ({ children }) => {
  return (
    /*
      ThemeProvider takes an object and makes it's values
      accessible through props to all styled components.
      So all values inside the passed theme (all in /styled directory)
      can be used inside any styled component.
     */
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <StyledWrapper>
        {children}
      </StyledWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
