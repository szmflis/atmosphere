import styled from 'styled-components'
import { variant } from 'styled-system'
import { theme } from '../styles/theme'
import buttons from '../styles/variants/buttons'

const buttonVariant = variant({ variants: buttons })

export const Button = styled.button`
  /* Counteracting effects applied by react-router-dom Link */
  text-decoration: none;
  outline: none;
  border: none;
  color: ${theme.colors.white};

  &:hover {
    color: ${theme.colors.white};
  }

  /* Styling */
  font-size: ${theme.fontSize.big};
  font-weight: ${theme.fontWeight.semibold};
  
  display: flex;
  justify-content: center;
  align-items: center;

  width: 250px;
  height: 50px;

  box-shadow: ${theme.effects.boxShadowPrimary};
  border-radius: 8px;

  transition: all .3s;

  /* Adjustable values */
  margin: ${({ mar }) => mar};

  /* applying styling from styled-system variants */
  /* all variants are in root/styles/variants/buttons dir */
  ${buttonVariant}
`

export const DestinationButton = styled(Button)`
  /* To rewrite */
`
