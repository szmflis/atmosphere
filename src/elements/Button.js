import styled from 'styled-components'
import { variant } from 'styled-system'
import { theme } from '../styles/theme'
import buttons from '../styles/variants/buttons'

const buttonVariant = variant({ variants: buttons })

export const Button = styled.button`
  /* Counteracting effects applied by react-router-dom Link */
  cursor: pointer;
  text-decoration: none;
  outline: none;
  border: none;
  color: ${theme.colors.white};
  font-family: inherit;

  &:hover {
    color: ${theme.colors.white};
  }

  /* Styling */
  font-size: ${theme.fontSize.big};
  font-weight: ${theme.fontWeight.semibold};
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  
  padding: 0 2rem;
  
  box-shadow: ${theme.effects.boxShadowPrimary};
  border-radius: 3rem;

  transition: all .3s;

  /* Adjustable values */
  margin: ${({ mar }) => mar};
  
  /* applying styling from styled-system variants */
  /* all variants are in root/styles/variants/buttons dir */
  ${buttonVariant}
`
