import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FlexContainer } from '../elements/FlexContainer'
import { theme } from '../styles/theme'
import { P } from '../elements/P'
import { H4 } from '../elements/H'
import { Img } from '../elements/Img'
import { iconGetter } from '../utils/iconGetter'
import moon from '../assets/moon.svg'
import sun from '../assets/sun.svg'

/*
  City is purely representational component displaying data gathered
  from openweathermap api, example data is on the bottom of this file.
*/

const Wrapper = styled(FlexContainer)`
  width: 500px;
  box-shadow: ${theme.effects.boxShadowPrimary};
  margin-top: 100px;
`

const InlineTextWrapper = styled.div`
  display: flex;
  flex-direction: row;

  padding: ${({ pad }) => pad || 0};
`

const Header = styled(FlexContainer)`
  flex-direction: row;
  justify-content: space-between;
  
  background-color: ${theme.colors.greyBright};
  padding: 2rem;
  width: 100%;
`

const Temperatures = styled(FlexContainer)`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 2rem;
  
  background-color: ${theme.colors.greyLighter};
`

const Temperature = styled(FlexContainer)`
`

const RainPressureHumidity = styled(FlexContainer)`
  background-color: ${theme.colors.greyLightest};
  padding: 2rem;
  width: 100%;

  align-items: flex-start;
`

const SunriseSundown = styled(FlexContainer)`
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
  padding: 2rem;
  background-color: ${theme.colors.greyLighter};
`

const City = ({
  id, currentTime, name, lat, lon,
  country, sunrise, sunset,
  temp, tempMax, tempMin, pressure, humidity,
  windSpeed, windDirection, weatherArr,
  clouds, rain, snow
}) => {
  return (
    <Wrapper>
      <Header>
        <div>
          <InlineTextWrapper>
            <H4 bold>{name}</H4>
            <H4 bold opaque>&nbsp;{country}</H4>
          </InlineTextWrapper>
          <P size={theme.fontSize.small} opaque>Latitude {lat}</P>
          <P size={theme.fontSize.small} opaque>Longitude {lon}</P>
          <P color={theme.colors.textBlue} bold>{weatherArr[0].main}</P>
        </div>
        <Img src={iconGetter(weatherArr[0].icon)} />
      </Header>
      <Temperatures>
        <Temperature>
          <P size={theme.fontSize.small}>Lowest possible</P>
          <InlineTextWrapper>
            <P color={theme.colors.textBlue} size={theme.fontSize.big}>{tempMin}</P>
            <P size={theme.fontSize.big}>°C</P>
          </InlineTextWrapper>
        </Temperature>

        <Temperature>
          <P bold>Average</P>
          <InlineTextWrapper>
            <P bold color={theme.colors.textRed} size={theme.fontSize.huge}>{temp}</P>
            <P bold size={theme.fontSize.huge}>°C</P>
          </InlineTextWrapper>
        </Temperature>

        <Temperature>
          <P size={theme.fontSize.small}>Highest possible</P>
          <InlineTextWrapper>
            <P color={theme.colors.textRed} size={theme.fontSize.big}>{tempMax}</P>
            <P size={theme.fontSize.big}>°C</P>
          </InlineTextWrapper>
        </Temperature>
      </Temperatures>

      <RainPressureHumidity>
        <InlineTextWrapper pad="1rem 0rem">
          <P bold>Rain (past 3 hours):&nbsp;</P>
          <P bold color={theme.colors.textTurkoise}>{rain['1h']}&nbsp;</P>
          <P opaque>mm</P>
        </InlineTextWrapper>

        <InlineTextWrapper pad="1rem 0rem">
          <P bold>Pressure:&nbsp;</P>
          <P bold color={theme.colors.textPurple}>{pressure}&nbsp;</P>
          <P opaque>hPa</P>
        </InlineTextWrapper>

        <InlineTextWrapper pad="1rem 0rem">
          <P bold>Humidity:&nbsp;</P>
          <P bold color={theme.colors.textTurkoise}>{humidity}&nbsp;</P>
          <P opaque>%</P>
        </InlineTextWrapper>
      </RainPressureHumidity>

      <SunriseSundown>
        <FlexContainer>
          <Img src={sun} size="75px" />
          <P>sunrise at {sunrise}</P>
        </FlexContainer>
        <FlexContainer>
          <Img src={moon} size="75px" />
          <P>sunrise at {sunset}</P>
        </FlexContainer>
      </SunriseSundown>
      {/* <p>rain: {rain['1h']}</p>
      <p>snow: {snow['3h']}</p>
      <p>clouds: {clouds.all}</p>
      <p>id: {id}</p>
      <p>currentTime: {currentTime}</p>
      <p>name: {name}</p>
      <p>lat: {lat}</p>
      <p>lon: {lon}</p>
      <p>temp: {temp}</p>
      <p>tempMax: {tempMax}</p>
      <p>tempMin: {tempMin}</p>
      <p>pressure: {pressure}</p>
      <p>humidity: {humidity}</p>
      <p>windSpeed: {windSpeed}</p>
      <p>windDirection: {windDirection}</p>
      {
        weatherArr.id === null
          ? null
          : weatherArr.map(weather => <div key={weather.id}>{weather.main}</div>)
      } */}
    </Wrapper>
  )
}

City.propTypes = {
  id: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  tempMin: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  windDirection: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  sunrise: PropTypes.number.isRequired,
  sunset: PropTypes.number.isRequired,
  weatherArr: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    main: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string
  })),
  clouds: PropTypes.shape({
    all: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  rain: PropTypes.shape({
    '1h': PropTypes.number,
    '3h': PropTypes.number,
  }),
  snow: PropTypes.shape({
    '1h': PropTypes.number,
    '3h': PropTypes.number,
  }),
  // TODO finish proptypes after testing
}

City.defaultProps = {
  clouds: { all: 'No information about clouds available' },
  weatherArr: [{ id: null }],
  rain: { '1h': 0, '3h': 0 },
  snow: { '1h': 0, '3h': 0 },
}

export default City

/*

  Example response which data is to be presented by
  City.js component:
    {
    "id":88319,"dt":1345284000,"name":"Benghazi",
        "coord":{"lat":32.12,"lon":20.07},
        "main":{"temp":306.15,"pressure":1013,"humidity":44,
        "temp_min":306,"temp_max":306},
        "wind":{"speed":1,"deg":-7},
        "weather":[
            {"id":520,"main":"rain","description":"light intensity
            shower rain","icon":"09d"},
            {"id":500,"main":"rain","description":"light rain","icon":
            "10d"},
            {"id":701,"main":"mist","description":"mist","icon":"50d"}
                  ],
        "clouds":{"all":90},
        "rain":{"3h":3}
  }
*/
