import styled from 'styled-components'

export const Icon = styled.img`
  width: ${({ size }) => size || '100px'};
  height: ${({ size }) => size || '100px'};
  padding: ${({ pad }) => pad};
`
