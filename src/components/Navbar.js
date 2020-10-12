import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
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
  font-weight: ${theme.fontWeight.semibold};

  /* Spacing */
  margin: 0rem 3rem;
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

  /*
    Each transition specified separately to avoid
    animating margin and font-size changes from medias.
  */
  transition: opacity .3s, background-size .3s;

  /* medias */
  @media ( max-width: 640px ) {
    margin: 0;
    font-size: ${theme.fontSize.regular};
  }
`

const Navbar = () => {
  return (
    <Wrapper>
      <NavElementWrapper>
        <NavElement to="/">atmosphere</NavElement>
      </NavElementWrapper>
      <NavElementWrapper>
      </NavElementWrapper>
      <NavElementWrapper justify="flex-end">
        <NavElement to="city">City</NavElement>
      </NavElementWrapper>
    </Wrapper>
  )
}

export default Navbar
