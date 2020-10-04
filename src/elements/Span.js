import styled from 'styled-components'
import { theme } from '../styles/theme'

export const Span = styled.span`

  /* Typography */
  font-size: ${({ size }) => size || theme.fontSize.regular};
  font-weight: ${({ bold }) => bold ? theme.fontWeight.bold : theme.fontWeight.regular};
  color: ${({ color }) => color};


  /* Whitespace */
  padding: ${({ pad }) => pad || 0};
  margin: ${({ mar }) => mar || 0};
  margin-bottom: ${({ marBot }) => marBot || 0};

  /* Additional Props */
  width: ${({ width }) => width}; /* Simpler than using another wrapper to avoid long lines on wider screens */
  text-align: ${({ alignCenter }) => alignCenter ? 'center' : 'start'};
  opacity: ${({ opaque }) => opaque ? 0.5 : 1};
`
