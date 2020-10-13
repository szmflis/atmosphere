import React, { useState } from 'react'
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

  background-color: ${theme.colors.greyLightest};

  margin: 2rem;
  border-radius: 8px;

  @media ( max-width: 900px ) {
    width: 90vw;
    max-width: 850px;
  }

  box-shadow: ${theme.effects.boxShadowPrimary};
`

const Header = styled(FlexContainer)`
  width: 100%;
  background-color: ${theme.colors.greyLight};
  padding: 2rem;

  
  border-radius: 8px 8px 0px 0px;
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

const Forecast = ({ data, title }) => {
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
      case 5:
        setForecastType({
          type: 'uvi', title: 'UV Index', unit: '', color: theme.colors.linePurple
        })
        break
      case 6:
        setForecastType({
          type: 'rain', title: 'Rain', unit: 'mm', color: theme.colors.lineBlue
        })
        break
      default:
        //
    }
  }

  const getTimeSpan = () => {
    const minDate = data[0].dt
    const maxDate = data[data.length - 1].dt
    return <H5 alignCenter bold>
      {`From ${dayjs.unix(minDate).format('ddd DD/MM HH:mm')} to ${dayjs.unix(maxDate).format('ddd DD/MM HH:mm')}`}
    </H5>
  }

  return (
    /*
      TODO render buttons smarter.
    */
    <Wrapper>
      <Header>
        <H3 alignCenter bold>{title}</H3>
        {getTimeSpan()}
      </Header>
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
        {
          data[0].uvi
            ? <TypeButton
              variant="primary"
              type="button"
              onClick={() => handleButtonClick(5)}
              id={5}
              selectedButton={selectedButton}
            >
              UV Index
            </TypeButton>
            : null
        }
        {
          data[0].rain
            ? <TypeButton
              variant="primary"
              type="button"
              onClick={() => handleButtonClick(6)}
              id={6}
              selectedButton={selectedButton}
            >
              Rain (mm)
            </TypeButton>
            : null
        }
      </ButtonsContainer>
      <LinearChart
        data={data}
        type={forecastType.type}
        title={forecastType.title}
        unit={forecastType.unit}
        lineColor={forecastType.color}
      />
    </Wrapper>
  )
}

Forecast.propTypes = {
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
  title: PropTypes.string.isRequired,
}

export default Forecast
