import styled from 'styled-components'
import { theme } from '../styles/theme'

export const Anchor = styled.a`
  text-decoration: none;

  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary};

  padding: ${({ pad }) => pad || 0};
  margin: ${({ mar }) => mar || 0};

  &:hover {
    color: ${theme.colors.primaryBright};
  }
`
