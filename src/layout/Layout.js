import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import { theme } from '../styles/theme'

/*
  Layout is a style entry point of the application.
  GlobalStyle handles setting all the fonts,
  font size base values,
  resetting margins/padding setting box-sizing
  and other things one would want.
*/

/*
  fontface's are specified in external css file at /assets/global-static-styles.css
  and loaded into index.js and not specified here becouse
  there is a problem with loading them using createGlobalStyle
  https://github.com/react-boilerplate/react-boilerplate/issues/2552
  https://github.com/styled-components/styled-components/issues/1593
*/

const GlobalStyle = createGlobalStyle`
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

  ::-webkit-scrollbar {
    display: none;
  }

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
