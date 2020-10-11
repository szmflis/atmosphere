import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { FlexContainer } from '../../../elements/FlexContainer'
import { Button } from '../../../elements/Button'
import LinearChart from '../../chart/LinearChart'
import { theme } from '../../../styles/theme'
import { H3, H5 } from '../../../elements/H'

const Wrapper = styled.div`
  width: 50vw;
  max-width: 750px;

  margin: 2rem;

  @media ( max-width: 900px ) {
    width: 90vw;
    max-width: 850px;
  }
`

const TypeButton = styled(Button)`
  background-color: ${({ id, selectedButton }) => id === selectedButton ? theme.colors.primaryDim : theme.colors.greyDark};
  font-size: ${theme.fontSize.regular};
  border-radius: 0;
  width: auto;
  height: 30px;
`

const ButtonsContainer = styled(FlexContainer)`
  padding: 2rem;
  margin-bottom: 2rem;
`

const ShorttermForecast = ({ hourlyData }) => {
  const [selectedButton, setSelectedButton] = useState(0)
  const [forecastType, setForecastType] = useState({
    type: 'temp',
    title: 'Temperature',
    unit: '°C',
    color: theme.colors.lineRed,
  })

  const handleButtonClick = (id) => {
    setSelectedButton(id)
    switch (id) {
      case 0:
        setForecastType({
          type: 'temp', title: 'Temperature', unit: '°C', color: theme.colors.lineRed
        })
        break
      case 1:
        setForecastType({
          type: 'pressure', title: 'Pressure', unit: 'hPa', color: theme.colors.lineTurkoise
        })
        break
      case 2:
        setForecastType({
          type: 'pop', title: 'Chance of rain', unit: '%', color: theme.colors.lineBlue
        })
        break
      case 3:
        setForecastType({
          type: 'humidity', title: 'Humidity', unit: '%', color: theme.colors.lineBlue
        })
        break
      case 4:
        setForecastType({
          type: 'wind_speed', title: 'Wind speed', unit: 'm/s', color: theme.colors.linePurple
        })
        break
      default:
        //
    }
  }

  const getTimeSpan = () => {
    if (hourlyData !== null) {
      const minDate = hourlyData[0].dt
      const maxDate = hourlyData[hourlyData.length - 1].dt
      return <H5 alignCenter marBot="2rem">
        {`From ${dayjs.unix(minDate).format('ddd HH:mm')} to ${dayjs.unix(maxDate).format('ddd HH:mm')}`}
      </H5>
    }
  }

  return (
    <Wrapper>
      <H3 alignCenter>Short term weather forcast</H3>
      {
        hourlyData === null
          ? <div></div>
          : getTimeSpan()
      }
      <ButtonsContainer row>
        <TypeButton
          variant="primary"
          type="button"
          onClick={() => handleButtonClick(0)}
          id={0}
          selectedButton={selectedButton}
        >
          Temperature
        </TypeButton>
        <TypeButton
          variant="primary"
          type="button"
          onClick={() => handleButtonClick(1)}
          id={1}
          selectedButton={selectedButton}
        >
          Pressure
        </TypeButton>
        <TypeButton
          variant="primary"
          type="button"
          onClick={() => handleButtonClick(2)}
          id={2}
          selectedButton={selectedButton}
        >
          Rain chance
        </TypeButton>
        <TypeButton
          variant="primary"
          type="button"
          onClick={() => handleButtonClick(3)}
          id={3}
          selectedButton={selectedButton}
        >
          Humidity
        </TypeButton>
        <TypeButton
          variant="primary"
          type="button"
          onClick={() => handleButtonClick(4)}
          id={4}
          selectedButton={selectedButton}
        >
          Wind speed
        </TypeButton>
      </ButtonsContainer>
      {
          hourlyData === null
            ? <p>waiting for data...</p>
            : <LinearChart
              data={hourlyData}
              type={forecastType.type}
              title={forecastType.title}
              unit={forecastType.unit}
              lineColor={forecastType.color}
            />
        }
    </Wrapper>
  )
}

ShorttermForecast.propTypes = {
  hourlyData: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number,
      dew_point: PropTypes.number,
      feels_like: PropTypes.number,
      pressure: PropTypes.number,
      pop: PropTypes.number,
      temp: PropTypes.number,
      wind_deg: PropTypes.number,
      wind_speed: PropTypes.number,
    })
  ).isRequired
}

export default ShorttermForecast
