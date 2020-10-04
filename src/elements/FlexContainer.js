/*
  Very basic flex container with values adjustable through props.
*/

import styled from 'styled-components'

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ row }) => row ? 'row' : 'column'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
`
