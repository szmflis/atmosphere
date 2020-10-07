import React, { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import AxisLeft from './axis/AxisLeft'
import AxisBottom from './axis/AxisBottom'

const width = 600
const height = 600
const margin = {
  top: 40, right: 40, bottom: 40, left: 40
}
const red = 'red'
const blue = 'blue'

const LinearChart = ({ data }) => {
  const xScale = d3.scaleLinear().range([margin.left, width - margin.right])
  const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top])
  const linearGenerator = d3.line()

  // TODO learn about svg, g path line etc in general

  const timeDomain = d3.extent(data, d => d.dt)
  const maxTemp = d3.max(data, d => d.temp)

  xScale.domain(timeDomain)
  yScale.domain([0, maxTemp])

  linearGenerator.x(d => xScale(d.dt))
  linearGenerator.y(d => yScale(d.temp))

  const temps = linearGenerator(data)

  /* AXIS */
  const [xStart, xEnd] = xScale.range()
  const [yStart, yEnd] = yScale.range()
  const ticksX = xScale.ticks()
  const ticksY = yScale.ticks()

  return (
    <svg width={width} height={height}>
      <path d={temps} fill='none' stroke={red} strokeWidth='2' />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisLeft yScale={yScale} width={width} />
        <AxisBottom xScale={xScale} height={height} />
      </g>
      {/* <g>
        <g transform={`translate(0, ${height - margin.bottom})`} />
        <g transform={`translate(${margin.left}, 0)`} />
      </g> */}
    </svg>)
}

export default LinearChart

/*
import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'

const width = 650
const height = 400
const margin = {
  top: 20, right: 5, bottom: 20, left: 35
}
const red = 'red'
const blue = 'blue'

const LinearChart = ({ data }) => {
  console.log(data)

  const xScale = d3.scaleLinear().range([margin.left, width - margin.right])
  const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top])
  const linearGenerator = d3.line()

  const timeDomain = d3.extent(data, d => d.dt)
  const maxTemp = d3.max(data, d => d.temp)

  xScale.domain(timeDomain)
  yScale.domain([0, maxTemp])

  linearGenerator.x(d => xScale(d.dt))
  linearGenerator.y(d => yScale(d.temp))

  const temps = linearGenerator(data)

  return (
    <svg width={width} height={height}>
      <path d={temps} fill='none' stroke={red} strokeWidth='2' />
      <g>
        <g transform={`translate(0, ${height - margin.bottom})`} />
        <g transform={`translate(${margin.left}, 0)`} />
      </g>
    </svg>)
}

export default LinearChart
*/
