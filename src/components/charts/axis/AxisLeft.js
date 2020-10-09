import React from 'react'

const AxisLeft = ({ yScale, width }) => {
  const ticks = yScale.ticks()

  const axis = ticks.map((d, i) => {
    return (
      <g key={i}>
        <line
          style={{ stroke: '#e4e5eb' }}
          y1={yScale(d)}
          y2={yScale(d)}
          x1={0}
          x2={width}
        />
        <text y={yScale(d)}>
          {d}
        </text>
      </g>
    )
  })

  return (
    <>{axis}</>
  )
}

export default AxisLeft
