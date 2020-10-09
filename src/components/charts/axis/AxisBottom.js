import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../styles/theme'

const Text = styled.text`
  text-anchor: middle;
  font-size: ${theme.fontSize.regular};
  font-weight: ${theme.fontWeight.semibold};
`

const AxisBottom = ({ xScale, height, width, marginLeft }) => {
  const ticks = xScale.ticks()

  const axis = ticks.map((d, i) => (
    <g key={i}>
      <line
        x1={xScale(d)}
        x2={xScale(d)}
        y1={height}
        y2={height + 10}
        stroke="black"
      />
      <Text x={xScale(d)} y={height + 23}>
        {dayjs.unix(d).format('HH:mm')}
      </Text>
      <Text x={xScale(d)} y={height + 38}>
        {dayjs.unix(d).format('ddd')}
      </Text>
    </g>
  ))

  return <>
    {axis}
    <line
      x1={marginLeft}
      x2={width}
      y1={height}
      y2={height}
      stroke="black"
    />
  </>
}

export default AxisBottom
