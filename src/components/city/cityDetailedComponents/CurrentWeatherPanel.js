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
import { IconSundown, IconSunrise } from '../../../assets/icons'
import arrow from '../../../assets/arrow.png'
import InfoDisplay from './InfoDisplay'

const StyledWrapper = styled(FlexContainer)`
  width: 420px;
  margin: 1rem;

  @media ( max-width: 440px ) {
    width: 95vw;
  }

  border-radius: 8px;
  box-shadow: ${theme.effects.boxShadowPrimary};
`

const InfoSection = styled(FlexContainer)`
  padding: 2rem;
  width: 100%;
`

const Header = styled(InfoSection)`
  background-color: ${theme.colors.greyLight};
  border-radius: 8px 8px 0px 0px;
  padding: 0rem 2rem;
`

const Temperatures = styled(InfoSection)`
  background-color: ${theme.colors.greyLighter};
`

const OtherInfo = styled(InfoSection)`
  background-color: ${theme.colors.greyLightest};
`

const SunriseSundown = styled(InfoSection)`
  background-color: ${theme.colors.greyLightest};
`

const WindInformation = styled(FlexContainer)`
  background-color: ${theme.colors.greyLightest};
  width: 100%;
`

const Arrow = styled(Icon)`
  transform: ${({ deg }) => `rotate(${deg}deg)`};
`

const Footer = styled(InfoSection)`
  background-color: ${theme.colors.greyLightest};
  padding: 1rem;
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

      <Header row justify="space-between">
        <div>
          <H4>Current weather</H4>
          <P bold color={theme.colors.textBlue}>{weatherArr[0].description}&nbsp;</P>
        </div>
        <Icon src={iconGetter(weatherArr[0].icon)} size="75px" />
      </Header>

      <Temperatures row justify="space-around">
        <FlexContainer>
          <P size={theme.fontSize.small}>Lowest possible</P>
          <InlineTextWrapper>
            <P color={theme.colors.textBlue} size={theme.fontSize.big}>{tempMin}</P>
            <P size={theme.fontSize.big} opaque>°C</P>
          </InlineTextWrapper>
        </FlexContainer>

        <FlexContainer>
          <P bold>Average</P>
          <InlineTextWrapper>
            <P bold size={theme.fontSize.huge}>{tempAvg}</P>
            <P bold size={theme.fontSize.huge} opaque>°C</P>
          </InlineTextWrapper>
        </FlexContainer>

        <FlexContainer>
          <P size={theme.fontSize.small}>Highest possible</P>
          <InlineTextWrapper>
            <P color={theme.colors.textRed} size={theme.fontSize.big}>{tempMax}</P>
            <P size={theme.fontSize.big} opaque>°C</P>
          </InlineTextWrapper>
        </FlexContainer>
      </Temperatures>

      <OtherInfo align="flex-start">
        <InfoDisplay name="Pressure" value={pressure} unit="hPa" pad="1rem 0rem" />
        <InfoDisplay name="Humidity" value={humidity} unit="%" pad="1rem 0rem" />
        <InfoDisplay name="Dew point" value={dewpoint} unit="°C" pad="1rem 0rem" />
        <InfoDisplay name="UV index" value={uvIndex} pad="1rem 0rem" />
        <WindInformation row justify="space-between">
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

      <SunriseSundown row justify="space-around">
        <FlexContainer>
          <IconSunrise />
          <InfoDisplay
            name="Sunrise"
            value={dayjs.unix(sunrise).format('HH:mm')}
            unit="am"
            pad="1rem"
            color={theme.colors.textRed}
          />
        </FlexContainer>
        <FlexContainer>
          <IconSundown />
          <InfoDisplay
            name="Sundown"
            value={dayjs.unix(sunset).format('HH:mm')}
            unit="pm"
            pad="1rem"
            color={theme.colors.textRed}
          />
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
