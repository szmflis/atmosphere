/*
  Very basic flex container with values adjustable through props.
*/

import styled from 'styled-components'
import { animated } from 'react-spring'

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ row }) => row ? 'row' : 'column'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
`

export const AnimatedFlexContainer = styled(animated.div)`
  display: flex;
  flex-direction: ${({ row }) => row ? 'row' : 'column'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
`
