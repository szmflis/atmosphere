import dayjs from 'dayjs'
import React from 'react'

const AxisBottom = ({ xScale, height }) => {
  const ticks = xScale.ticks()

  const axis = ticks.map((d, i) => (
    <g key={i}>
      <line
        y1={0}
        y2={height}
        x1={xScale(d)}
        x2={xScale(d)}
      />
      <text
        style={{ textAnchor: 'middle' }}
        x={xScale(d)}
        y={height}
      >
        {dayjs.unix(d).format('HH:mm')}
      </text>
    </g>
  ))

  return <>{axis}</>
}

export default AxisBottom
