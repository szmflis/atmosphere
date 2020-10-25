import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { opacify } from 'polished'
import styled from 'styled-components'
import { Doughnut } from 'react-chartjs-2'
import { theme } from '../../styles/theme'

const ChartContainer = styled.div`
  width: 100%;

  padding: 2rem;
`

const DoughnutChart = ({
  data, unit
}) => {
  const [chartData, setChartData] = useState()
  console.log(data)

  const chart = () => {
    setChartData({
      labels: data.map(o => o.propName),
      datasets: [
        {
          label: 'somelabel123',
          data: data.map(o => o.propValue),
          borderColor: [
            theme.colors.lineBlue,
            theme.colors.lineRed,
            theme.colors.lineTurkoise,
            theme.colors.lineBrightBlue,
            theme.colors.linePurple,
            theme.colors.lineOrange,
          ],
          backgroundColor: [
            opacify(-0.7, theme.colors.lineBlue),
            opacify(-0.7, theme.colors.lineRed),
            opacify(-0.7, theme.colors.lineTurkoise),
            opacify(-0.7, theme.colors.lineBrightBlue),
            opacify(-0.7, theme.colors.linePurple),
            opacify(-0.7, theme.colors.lineOrange),
          ],
          borderWidth: 0.5,
          weight: 3,
        }
      ]
    })
  }

  useEffect(() => {
    chart()
  }, [data])

  return (
    <ChartContainer>
      <Doughnut
        data={chartData}
      />
    </ChartContainer>
  )
}

DoughnutChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(
    {
      propName: PropTypes.string,
      propValue: PropTypes.number,
    }
  )).isRequired,
  unit: PropTypes.string
}

DoughnutChart.defaultProps = {
  unit: '',
}

export default DoughnutChart
