import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FlexContainer } from '../elements/FlexContainer'
import { theme } from '../styles/theme'

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  border-top: 4px solid ${theme.colors.primary};
`

const WidthWrapper = styled(FlexContainer)`
  width: 60vw;
  max-width: 1080px;

  @media ( max-width: 1080px ) {
    width: 600px;
  }

  @media ( max-width: 650px ) {
    width: 90%;
  }
`

const NavElementWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${({ justify }) => justify};
`

const NavElement = styled(Link)`
  /* Negating react-router-dom Link component styling */
  cursor: pointer;
  text-decoration: none;

  /* Typography */
  color: ${theme.colors.black};
  font-size: ${theme.fontSize.big};
  font-weight: ${theme.fontWeight.regular};

  /* Spacing */
  margin: .5rem;
  padding: 1rem;

  /* Underline animation */
  background:
    linear-gradient(${theme.colors.primary}, ${theme.colors.primary}) 
    bottom left no-repeat;

  background-size: 0px 3px;
  &:hover {
    background-size: 100% 3px;
    opacity: 1;
  }

  transition: opacity .3s, background-size .3s;

  @media ( max-width: 640px ) {
    font-size: 4vw;
  }
`

const Navbar = () => {
  return (
    <Wrapper>
      <WidthWrapper row>
        <NavElementWrapper>
          <NavElement to="/">atmosphere</NavElement>
        </NavElementWrapper>
        <NavElementWrapper>
        </NavElementWrapper>
        <NavElementWrapper justify="flex-end">
          <NavElement to="/city">City</NavElement>
        </NavElementWrapper>
      </WidthWrapper>
    </Wrapper>
  )
}

export default Navbar
