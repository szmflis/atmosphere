import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { FlexContainer } from '../../elements/FlexContainer'
import { theme } from '../../styles/theme'
import { P } from '../../elements/P'
import { H4 } from '../../elements/H'
import { Icon } from '../../elements/Icon'
import { iconGetter } from '../../utils/iconGetter'
import { Button } from '../../elements/Button'
import moon from '../../assets/moon.svg'
import sun from '../../assets/sun.svg'
import arrow from '../../assets/arrow.png'

/*
  City is purely representational component displaying data gathered
  from openweathermap api, example data is on the bottom of this file.

  Used for compact cards on homepage - displaying some current weather data.
  TODO Change to actually compact version
*/

const Wrapper = styled(FlexContainer)`
  width: 450px;
  margin: 3rem;
  box-shadow: ${theme.effects.boxShadowPrimary};

  @media (max-width: 500px) {
    width: 100%;
    margin: 1rem;
  }
`

const InlineTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ pad }) => pad || 0};
`

const CityCardSection = styled(FlexContainer)`
  padding: 2rem;
  width: 100%;
`

const Header = styled(CityCardSection)`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.colors.greyBright};
`

const Temperatures = styled(CityCardSection)`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${theme.colors.greyLighter};
`

const Temperature = styled(FlexContainer)`
`

const OtherInfo = styled(CityCardSection)`
  background-color: ${theme.colors.greyLightest};
  align-items: flex-start;
`

const SunriseSundown = styled(CityCardSection)`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${theme.colors.greyLighter};
`

const WindInformation = styled(CityCardSection)`
  display: flex;
  flex-direction: row;
  background-color: ${theme.colors.greyBright};
  justify-content: space-between;
`

const Arrow = styled(Icon)`
  transform: ${({ deg }) => `rotate(${deg}deg)`};
`

const Footer = styled(CityCardSection)`
  background-color: ${theme.colors.greyLighter};
`

const CityCompactCard = ({
  id, currentTime, name, lat, lon,
  country, sunrise, sunset,
  temp, tempMax, tempMin, pressure, humidity,
  windSpeed, windDirection, weatherArr,
  rain, snow
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
          <P color={theme.colors.textPurple} bold>{weatherArr[0].main}</P>
        </div>
        <Icon src={iconGetter(weatherArr[0].icon)} />
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

      <OtherInfo>
        <InlineTextWrapper pad="1rem 0rem">
          <P bold>Pressure:&nbsp;</P>
          <P bold color={theme.colors.textBlue}>{pressure}&nbsp;</P>
          <P opaque>hPa</P>
        </InlineTextWrapper>

        <InlineTextWrapper pad="1rem 0rem">
          <P bold>Humidity:&nbsp;</P>
          <P bold color={theme.colors.textBlue}>{humidity}&nbsp;</P>
          <P opaque>%</P>
        </InlineTextWrapper>
        <InlineTextWrapper pad="1rem 0rem">
          <P bold>Rain (past 3 hours):&nbsp;</P>
          <P bold color={theme.colors.textBlue}>{rain['3h']}&nbsp;</P>
          <P opaque>mm</P>
        </InlineTextWrapper>

        <InlineTextWrapper pad="1rem 0rem">
          <P bold>Snow (past 3 hours):&nbsp;</P>
          <P bold color={theme.colors.textBlue}>{snow['3h']}&nbsp;</P>
          <P opaque>%</P>
        </InlineTextWrapper>
      </OtherInfo>

      <SunriseSundown>
        <FlexContainer>
          <Icon src={sun} size="75px" pad="1rem" />
          <P>sunrise at {dayjs.unix(sunrise).format('HH:mm')}</P>
        </FlexContainer>
        <FlexContainer>
          <Icon src={moon} size="75px" pad="1rem" />
          <P>sunrise at {dayjs.unix(sunset).format('HH:mm')}</P>
        </FlexContainer>
      </SunriseSundown>

      <WindInformation>
        <FlexContainer align="flex-start">
          <InlineTextWrapper pad="1rem 0rem">
            <P bold>Wind speed:&nbsp;</P>
            <P bold color={theme.colors.textPurple}>{windSpeed}&nbsp;</P>
            <P opaque>m/s</P>
          </InlineTextWrapper>
          <InlineTextWrapper pad="1rem 0rem">
            <P bold>Wind direction:&nbsp;</P>
            <P bold color={theme.colors.textPurple}>{windDirection}&nbsp;</P>
            <P opaque>deg</P>
          </InlineTextWrapper>
        </FlexContainer>
        <FlexContainer>
          <P>N</P>
          <Arrow src={arrow} deg={windDirection} size="50px" />
          <P>S</P>
        </FlexContainer>

      </WindInformation>
      <Footer>
        <P opaque alignCenter>
          This data have been gathered at {dayjs.unix(currentTime).format('HH:mm DD/MM/YY')}
        </P>
        <P opaque marBot="2rem" alignCenter>
          Courtesy of openweathermap.org API
        </P>
        <Button variant="primary" type="button" as={Link} to={`/city/${name}`}>
          More
        </Button>
      </Footer>
    </Wrapper>
  )
}

/* PropTypes. */

CityCompactCard.propTypes = {
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
  rain: PropTypes.shape({
    '1h': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    '3h': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  snow: PropTypes.shape({
    '1h': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    '3h': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
}

CityCompactCard.defaultProps = {
  weatherArr: [{ id: null }],
  rain: { '1h': 'No data', '3h': 'No data' },
  snow: { '1h': 'No data', '3h': 'No data' },
}

export default CityCompactCard

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
