import styled from 'styled-components'
import { theme } from '../styles/theme'

export const P = styled.h3`

  /* Typography */
  font-size: ${({ size }) => size || theme.fontSize.regular};
  font-weight: ${({ bold }) => bold ? theme.fontWeight.semibold : theme.fontWeight.regular};

  line-height: 1.6;

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

  opacity: ${({ opaque }) => opaque ? 0.5 : 1};
`
