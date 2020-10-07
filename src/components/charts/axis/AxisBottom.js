import React from 'react'

const AxisBottom = ({ xScale, height }) => {
  const [xStart, xEnd] = xScale.range()
  const ticksX = xScale.ticks()

  const axis = ticksX.map((d, i) => (
    <g key={i}>
      <line
        y1={0}
        y2={height}
        x1={xScale(d)}
        x2={xScale(d)}
      />
      <text
        style={{ textAnchor: "middle", fontSize: 12 }}
        x={xScale(d)}
        dy=".71em"
        y={height + 10}
      >
        {d}
      </text>
    </g>
  ))

  return <>{axis}</>
}

export default AxisBottom
