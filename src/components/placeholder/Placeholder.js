/*
  Representational component for placeholder animation,
  displayed everywhere where there is a peroid of waittime
  until something loads
*/

import styled, { keyframes } from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { theme } from '../../styles/theme'

const StyledPlaceholder = styled.div`
  margin: 5px;
  width: ${({ width }) => width};
  background-color: #eee;
`

const PlaceholderShimmer = keyframes`
  from {
    background-position: -468px 0;
  }
  to {
    background-position: 468px 0;
  }
`

const AnimatedBackground = styled.div`
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${PlaceholderShimmer};
  animation-timing-function: linear;
  background: darkgray;
  background: linear-gradient(
    to right,
    ${theme.colors.greyLighter} 10%,
    ${theme.colors.greyLight} 18%,
    ${theme.colors.greyLighter} 33%
  );
  background-size: 800px 154px;
  height: ${({ height }) => height};
  position: relative;

  border-radius: ${({ circle }) => circle ? '50%' : '16px'};
`

const Placeholder = ({ height, width, circle }) => (
  <StyledPlaceholder width={width}>
    <AnimatedBackground height={height} circle={circle}>
    </AnimatedBackground>
  </StyledPlaceholder>
)

Placeholder.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  circle: PropTypes.bool,
}

Placeholder.defaultProps = {
  height: '20px',
  width: '300px',
  circle: false,
}

export default Placeholder
