import styled from 'styled-components'
import { theme } from '../styles/theme'

export const H = styled.h3`
  font-size: ${({ size }) => size || theme.fontSize.bigger};
  font-weight: ${({ weight }) => weight || theme.fontWeight.regular};
  color: ${({ color }) => color};
  padding: ${({ pad }) => pad || 0};
  margin: ${({ mar }) => mar || 0};

  text-align: ${({ alignText }) => alignText};

  margin-bottom: ${({ marBot }) => marBot || 0};
`

/* Above is to delete once everything using it is refactored to use H1, H2... */

/*
  H1 is the main header element
  all other H elements can be styled through it's props
  all other H elements differ only by font size
*/
export const H1 = styled.h1`

  /* Typography */
  font-size: ${theme.fontSize.hugeExtra};
  font-weight: ${({ bold }) => bold ? theme.fontWeight.semibold : theme.fontWeight.regular};
  color: ${({ color }) => color};
  line-height: 1.2;

  /* Adjustable whitespace */
  padding: ${({ pad }) => pad || 0};
  margin: ${({ mar }) => mar || 0};
  margin-bottom: ${({ marBot }) => marBot || 0};

  /* Additional props */
  text-align: ${({ alignCenter }) => alignCenter ? 'center' : 'start'};
  opacity: ${({ opaque }) => opaque ? 0.5 : 1};
`

export const H2 = styled(H1)`
  font-size: ${theme.fontSize.huge};
`
export const H3 = styled(H1)`
  font-size: ${theme.fontSize.bigger};
`
export const H4 = styled(H1)`
  font-size: ${theme.fontSize.big};
`
export const H5 = styled(H1)`
  font-size: ${theme.fontSize.regular};
`
