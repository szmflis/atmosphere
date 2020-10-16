import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { FlexContainer } from '../../../elements/FlexContainer'
import { InlineTextWrapper } from '../../../elements/InlineTextWrapper'
import { H4 } from '../../../elements/H'
import { P } from '../../../elements/P'
import { Icon } from '../../../elements/Icon'
import { theme } from '../../../styles/theme'
import { iconGetter } from '../../../utils/iconGetter'
import moon from '../../../assets/moon.svg'
import sun from '../../../assets/sun.svg'
import arrow from '../../../assets/arrow.png'
import InfoDisplay from './InfoDisplay'

// TODO: split into smaller components
// keep design

const StyledWrapper = styled(FlexContainer)`
  width: 400px;
  margin: 2rem;

  @media ( max-width: 420px ) {
    width: 100%;
    margin: 1rem;
  }

  border-radius: 8px;
  box-shadow: ${theme.effects.boxShadowPrimary};
`

const InfoSection = styled(FlexContainer)`
  padding: 2rem;
  width: 100%;
`

const Header = styled(InfoSection)`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.colors.greyBright};

  border-radius: 8px 8px 0px 0px;
  padding: 2rem;
`

const Temperatures = styled(InfoSection)`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${theme.colors.greyLighter};
`

const OtherInfo = styled(InfoSection)`
  background-color: ${theme.colors.greyLightest};
  align-items: flex-start;
`

const SunriseSundown = styled(InfoSection)`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${theme.colors.greyLightest};
  padding: 1rem 2rem;
`

const WindInformation = styled(FlexContainer)`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${theme.colors.greyLightest};
  justify-content: space-between;
`

const Arrow = styled(Icon)`
  transform: ${({ deg }) => `rotate(${deg}deg)`};
`

const Footer = styled(InfoSection)`
  background-color: ${theme.colors.greyLighter};
  border-radius: 0px 0px 8px 8px;
`

const CurrentWeatherPanel = ({
  currentTime, sunrise, sunset,
  tempAvg, tempMax, tempMin,
  pressure, humidity, dewpoint,
  uvIndex, windSpeed,
  windDir, weatherArr
}) => {
  return (
    <StyledWrapper>

      <Header>
        <div>
          <H4>Current weather</H4>
          <P bold color={theme.colors.textBlue}>{weatherArr[0].description}&nbsp;</P>
        </div>
        <Icon src={iconGetter(weatherArr[0].icon)} size="75px" />
      </Header>

      <Temperatures>
        <FlexContainer>
          <P size={theme.fontSize.small}>Lowest possible</P>
          <InlineTextWrapper>
            <P color={theme.colors.textBlue} size={theme.fontSize.big}>{tempMin}</P>
            <P size={theme.fontSize.big}>°C</P>
          </InlineTextWrapper>
        </FlexContainer>

        <FlexContainer>
          <P bold>Average</P>
          <InlineTextWrapper>
            <P bold color={theme.colors.textRed} size={theme.fontSize.huge}>{tempAvg}</P>
            <P bold size={theme.fontSize.huge}>°C</P>
          </InlineTextWrapper>
        </FlexContainer>

        <FlexContainer>
          <P size={theme.fontSize.small}>Highest possible</P>
          <InlineTextWrapper>
            <P color={theme.colors.textRed} size={theme.fontSize.big}>{tempMax}</P>
            <P size={theme.fontSize.big}>°C</P>
          </InlineTextWrapper>
        </FlexContainer>
      </Temperatures>

      <OtherInfo>
        <InfoDisplay name="Pressure" value={pressure} unit="hPa" pad="1rem 0rem" />
        <InfoDisplay name="Humidity" value={humidity} unit="%" pad="1rem 0rem" />
        <InfoDisplay name="Dew point" value={dewpoint} unit="°C" pad="1rem 0rem" />
        <InfoDisplay name="UV index" value={uvIndex} pad="1rem 0rem" />
        <WindInformation>
          <FlexContainer align="flex-start">
            <InfoDisplay name="Wind speed" value={windSpeed} unit="m/s" pad="1rem 0rem" />
            <InfoDisplay name="Wind direction" value={windDir} unit="deg" pad="1rem 0rem" />
          </FlexContainer>
          <FlexContainer>
            <P>N</P>
            <Arrow src={arrow} deg={windDir} size="50px" />
            <P>S</P>
          </FlexContainer>
        </WindInformation>
      </OtherInfo>

      <SunriseSundown>
        <FlexContainer>
          <Icon src={sun} size="75px" pad="1rem" />
          <P>sunrise at {dayjs.unix(sunrise).format('HH:mm')}</P>
        </FlexContainer>
        <FlexContainer>
          <Icon src={moon} size="75px" pad="1rem" />
          <P>sunset at {dayjs.unix(sunset).format('HH:mm')}</P>
        </FlexContainer>
      </SunriseSundown>

      <Footer>
        <P opaque alignCenter>
          This data have been gathered at {dayjs.unix(currentTime).format('HH:mm DD/MM/YY')}
        </P>
        <P opaque alignCenter>
          Courtesy of openweathermap.org API
        </P>
      </Footer>
    </StyledWrapper>
  )
}

CurrentWeatherPanel.propTypes = {
  currentTime: PropTypes.number.isRequired,
  tempAvg: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  tempMin: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  windDir: PropTypes.number.isRequired,
  sunrise: PropTypes.number.isRequired,
  sunset: PropTypes.number.isRequired,
  uvIndex: PropTypes.number,
  dewpoint: PropTypes.number,
  weatherArr: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    main: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string
  })),
}

CurrentWeatherPanel.defaultProps = {
  weatherArr: [{ id: null }],
  uvIndex: null,
  dewpoint: null,
}

export default CurrentWeatherPanel
