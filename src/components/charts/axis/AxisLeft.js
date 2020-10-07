import React from 'react'

const AxisLeft = ({ yScale, width }) => {
  const [yStart, yEnd] = yScale.range()
  const ticksY = yScale.ticks()

  const axis = ticksY.map((d, i) => (
    <g key={i}>
      <line
        y1={yScale(d)}
        y2={yScale(d)}
        x1={0}
        x2={width}
      />
      <text
        style={{ fontSize:12 }}
        x={-20}
        dy=".32em"
        y={yScale(d)}
      >
        {d}
      </text>
    </g>
  ))

  return <>{axis}</>
}

export default AxisLeft
