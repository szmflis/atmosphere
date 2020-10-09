import React from 'react'
import * as d3 from 'd3'
import AxisBottom from './axis/AxisBottom'
import AxisLeft from './axis/AxisLeft'

const LineChart = ({ data }) => {
  const w = 800
  const h = 250

  const margin = {
    top: 20, right: 20, bottom: 20, left: 20
  }

  console.log(data)

  const width = w - margin.right - margin.left
  const height = h - margin.bottom - margin.top

  /* Init scales and line */

  const xScale = d3.scaleLinear()
    .range([margin.left, width])

  const yScale = d3.scaleLinear()
    .range([height, margin.top])

  const lineGenerator = d3.line()

  /* Config scales and line */

  const timeDomain = d3.extent(data, d => d.dt)
  xScale.domain(timeDomain)
  lineGenerator.x(d => xScale(d.dt))

  const maxTemp = d3.max(data, d => d.temp)
  const minTemp = d3.min(data, d => d.temp)
  yScale.domain([minTemp, maxTemp])
  lineGenerator.y(d => yScale(d.temp))

  /* Setting data for visual line */
  const temps = lineGenerator(data)

  return (
    <svg width={w} height={h} style={{ border: '1px solid blue' }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <path d={temps} fill="none" stroke="blue" strokeWidth="2" />
        <AxisBottom xScale={xScale} height={height} />
        <AxisLeft yScale={yScale} width={width} />
      </g>
    </svg>
  )
}

export default LineChart
