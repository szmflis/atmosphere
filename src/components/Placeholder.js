/*
  Representational component for placeholder animation,
  displayed everywhere where there is a peroid of waittime
  until something loads
*/

import styled, { keyframes } from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

const StyledPlaceholder = styled.div`
  margin: 2rem;
  width: 400px;
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
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 154px;
  height: ${({ height }) => height};
  position: relative;
`

const Placeholder = ({ height, width }) => (
  <StyledPlaceholder width={width}>
    <AnimatedBackground height={height}>
    </AnimatedBackground>
  </StyledPlaceholder>
)

Placeholder.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
}

Placeholder.defaultProps = {
  height: '20px',
  width: '400px',
}

export default Placeholder
