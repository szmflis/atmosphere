import styled from 'styled-components'
import { theme } from '../styles/theme'

export const P = styled.h3`

  /* Typography */
  font-size: ${({ size }) => size || theme.fontSize.regular};
  font-weight: ${({ weight }) => weight || theme.fontWeight.regular};

  /* Styling */
  color: ${({ color }) => color};
  padding: ${({ pad }) => pad || 0};
  margin: ${({ mar }) => mar || 0};

  /* Alignments */
  text-align: ${({ alignCenter }) => alignCenter ? 'center' : 'start'};
  margin-bottom: ${({ marBot }) => marBot || 0};

  /*
    Max width allows to limit the amount of width paragraphs take
    without wrapping them inside other container
  */
  max-width: ${({ maxWidth }) => maxWidth};
`
