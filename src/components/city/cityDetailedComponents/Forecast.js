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

  margin: 1rem;
  border-radius: 8px;

  @media ( max-width: 900px ) {
    width: 95vw;
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
  margin: 0.4rem;
  border-radius: 8px;
`

const ButtonsContainer = styled(FlexContainer)`
  padding: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const Forecast = ({ data, title, forecastProps }) => {
  const [selectedButton, setSelectedButton] = useState(forecastProps[0].type)
  const [forecastType, setForecastType] = useState(forecastProps[0])

  const handleButtonClick = (type) => {
    setSelectedButton(type)
    setForecastType(forecastProps.find(o => o.type === type))
  }

  const getTimeSpan = () => {
    const minDate = data[0].dt
    const maxDate = data[data.length - 1].dt
    return <H5 alignCenter bold>
      {`From ${dayjs.unix(minDate).format('ddd DD/MM HH:mm')} to ${dayjs.unix(maxDate).format('ddd DD/MM HH:mm')}`}
    </H5>
  }

  const renderButtons = () => {
    const dataProperties = Object.getOwnPropertyNames(data[0])
    const forecastProperties = forecastProps.map(forecastObj => forecastObj.type)
    const sharedProperties = forecastProperties.filter(property => {
      if (dataProperties.includes(property)) return true
      return false
    })
    return sharedProperties.map(property => {
      const buttonProps = forecastProps.find(element => element.type === property)
      return <TypeButton
        variant="primary"
        type="button"
        key={buttonProps.type}
        id={buttonProps.type}
        onClick={() => handleButtonClick(buttonProps.type)}
        selectedButton={selectedButton}
      >
        {buttonProps.title}
      </TypeButton>
    })
  }

  return (
    <Wrapper>
      <Header>
        <H3 alignCenter bold>{title}</H3>
        {getTimeSpan()}
      </Header>
      <ButtonsContainer row>
        {renderButtons()}
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
  data: PropTypes.arrayOf(PropTypes.shape({
    dt: PropTypes.number,
    pressure: PropTypes.number,
    pop: PropTypes.number,
    temp: PropTypes.number,
    wind_speed: PropTypes.number,
    uvi: PropTypes.number,
    rain: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  })).isRequired,
  title: PropTypes.string.isRequired,
  forecastProps: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      title: PropTypes.string,
      unit: PropTypes.string,
      color: PropTypes.string,
    })
  ).isRequired
}

export default Forecast
