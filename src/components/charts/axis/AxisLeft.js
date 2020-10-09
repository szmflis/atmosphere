import React from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { theme } from '../../../styles/theme'

const Text = styled.text`
  text-anchor: middle;
  font-size: ${theme.fontSize.regular};
  font-weight: ${theme.fontWeight.semibold};
`

const chooseUnit = (weatherProperty) => {
  console.log(weatherProperty)
  switch (weatherProperty) {
    case 'temp':
      console.log('hi')
      return '°C'
    case 'pressure':
      return 'hPa'
    case 'humidity':
      return '% H2O'
    case 'wind_speed':
      return 'm/s'
    default:
      return ''
  }
}

const AxisLeft = ({ yScale, weatherProperty }) => {
  const unit = chooseUnit(weatherProperty)
  console.log(unit)

  const ticks = yScale.ticks(5)

  const axis = ticks.map((d, i) => {
    return (
      <g key={i}>
        <line
          y1={yScale(d)}
          y2={yScale(d)}
          x1={20}
          x2={30}
          stroke="black"
        />
        <Text
          y={yScale(d)}
          dy=".32em"
        >
          {d}
        </Text>
      </g>
    )
  })

  return <>
    {axis}
    <Text
      y={20}
    >
      {unit}
    </Text>
  </>
}

export default AxisLeft
