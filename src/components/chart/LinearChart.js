import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { opacify } from 'polished'

const ChartContainer = styled.div`
  max-height: 350px;
  width: 100%;

  padding: 2rem;
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

LinearChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number,
      pressure: PropTypes.number,
      pop: PropTypes.number,
      temp: PropTypes.number,
      wind_speed: PropTypes.number,
      uvi: PropTypes.number,
      rain: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  lineColor: PropTypes.string.isRequired,
}

export default LinearChart
