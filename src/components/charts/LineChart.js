import React from 'react'
import * as d3 from 'd3'
import AxisBottom from './axis/AxisBottom'
import AxisLeft from './axis/AxisLeft'

const LineChart = ({ data, weatherProperty }) => {
  const w = 500
  const h = 250

  const margin = {
    top: 10, right: 40, bottom: 40, left: 40
  }

  console.log(data)

  const width = w - margin.right - margin.left
  const height = h - margin.bottom - margin.top

  /* Init scales and line */

  const xScale = d3.scaleLinear()
    .range([margin.left, width])

  const yScale = d3.scaleLinear()
    .range([height, margin.bottom])

  const lineGenerator = d3.line()

  /* Config x scale */
  const timeDomain = d3.extent(data, d => d.dt)
  xScale.domain(timeDomain)

  /* Config y scale */
  const valueDomain = d3.extent(data, d => d[weatherProperty])
  yScale.domain(valueDomain)

  /* Config line based on scales */
  lineGenerator.x(d => xScale(d.dt))
  lineGenerator.y(d => yScale(d[weatherProperty]))

  /* Setting data for visual line */
  const temps = lineGenerator(data)

  return (
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <path d={temps} fill="none" stroke="blue" strokeWidth="2" />
        <AxisBottom xScale={xScale} height={height} width={width} marginLeft={margin.left} />
        <AxisLeft yScale={yScale} width={width} height={height} weatherProperty={weatherProperty} />
      </g>
    </svg>
  )
}

export default LineChart
