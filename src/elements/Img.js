import styled from 'styled-components'

export const Img = styled.img`
  width: ${({ size }) => size || '100px'};
  height: ${({ size }) => size || '100px'};
`
