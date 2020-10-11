import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { opacify, parseToRgb } from 'polished'

const ChartContainer = styled.div`
  max-height: 350px;
  width: 100%;
`

const LinearChart = ({
  data, type, title, unit, lineColor
}) => {
  const [chartData, setChartData] = useState()
  const [chartOptions, setChartOptions] = useState()

  const chart = () => {
    const timeLabels = data.map(dataObj => dayjs.unix(dataObj.dt).format('ddd HH:mm'))
    const values = data.map(dataObj => dataObj[type])

    setChartData({
      labels: timeLabels,
      datasets: [
        {
          label: `${title} ${unit}`,
          data: values,
          borderColor: lineColor,
          backgroundColor: opacify(-0.7, lineColor),
          borderWidth: 2,
          pointRadius: 3,
        }
      ]
    })

    setChartOptions({
      scales: {
        xAxes: [{
          ticks: {
            callback(tick, index, array) {
              return (index % 3) ? '' : tick
            }
          }
        }]
      },
      resonsive: true,
      maintainAspectRatio: false,
    })
  }

  useEffect(() => {
    chart()
  }, [type, data])

  return (
    <ChartContainer>
      <Line
        data={chartData}
        options={chartOptions}
      />
    </ChartContainer>
  )
}

export default LinearChart
