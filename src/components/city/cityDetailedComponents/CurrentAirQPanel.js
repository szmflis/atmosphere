import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dayjs from 'dayjs'
import {
  getColorFromAirQ, getInfoFromAirQ, getTextColorFromAirQ, getStateFromAirQ
} from '../../../utils/airQhelper'
import { H3, H4, H5 } from '../../../elements/H'
import { P } from '../../../elements/P'
import { Anchor } from '../../../elements/Anchor'
import { FlexContainer } from '../../../elements/FlexContainer'
import { theme } from '../../../styles/theme'
import InfoDisplay from './InfoDisplay'

const Wrapper = styled(FlexContainer)`
  width: 420px;
  margin: 2rem;

  @media ( max-width: 440px ) {
    width: 100%;
    margin: 1rem;
  }

  box-shadow: ${theme.effects.boxShadowPrimary};
  border-radius: 8px;
`

const PaddedSection = styled(FlexContainer)`
  width: 100%;
  padding: 2rem;
`

const AirQIndexBox = styled(FlexContainer)`
  //required to pass
  background-color: ${({ color }) => color};
  border-radius: 1rem;
  margin-right: 2rem;
  padding: 1rem;

  box-shadow: ${theme.effects.boxShadowPrimary};
`

const Header = styled(PaddedSection)`
  background-color: ${theme.colors.greyLighter};
  border-radius: 8px 8px 0px 0px;
`

const PollutantsContainer = styled(PaddedSection)`
  background-color: ${theme.colors.greyLightest};
`

const Attributions = styled(PaddedSection)`
  background-color: ${theme.colors.greyLightest};
  padding: 0rem 2rem 2rem 2rem;
  border-radius: 0px 0px 8px 8px;
`

const CurrentAirQPanel = ({
  airQualityIndex,
  dominentPollutant,
  pollutantsObject,
  measurementDateUnix,
  attributions,
  name
}) => {
  return (
    <Wrapper>
      <Header row justify="space-between">
        <FlexContainer align="flex-start" justify="center">
          <H4 bold>Current AQI</H4>
          <P>Last updated on</P>
          <P marBot="1rem">
            {dayjs.unix(measurementDateUnix).format('dddd HH:mm DD-MM-YYYY')}
          </P>
        </FlexContainer>
        <AirQIndexBox color={getColorFromAirQ(airQualityIndex)}>
          <H5 alignCenter bold color={getTextColorFromAirQ(airQualityIndex)}>
            {name}
          </H5>
          <H3 alignCenter color={getTextColorFromAirQ(airQualityIndex)}>
            {airQualityIndex}
          </H3>
          <H5 alignCenter bold color={getTextColorFromAirQ(airQualityIndex)}>
            {getStateFromAirQ(airQualityIndex)}
          </H5>
        </AirQIndexBox>
      </Header>
      <PollutantsContainer align="flex-start">
        <P marBot="2rem">
          {getInfoFromAirQ(airQualityIndex)}
        </P>
        <H4>Pollutants</H4>
        {
          ['no2', 'pm10', 'pm25', 'so2', 'o3', 'co'].map(pollutantName => {
            if (pollutantsObject[pollutantName]) {
              return (
                <InfoDisplay
                  key={pollutantName}
                  name={pollutantName}
                  value={pollutantsObject[pollutantName].v}
                  unit={pollutantName === dominentPollutant ? 'μg/m3 - dominent pollutant' : 'μg/m3'}
                  pad="1rem 0rem"
                />
              )
            }
          })
        }
      </PollutantsContainer>
      <Attributions align="flex-start">
        <H4 marBot="1rem">Attributions</H4>
        {attributions.map(attribution => (
          <Anchor href={attribution.url} pad="4px 0" key={attribution.name}>
            {attribution.name}
          </Anchor>
        ))}
      </Attributions>
    </Wrapper>
  )
}

CurrentAirQPanel.propTypes = {
  airQualityIndex: PropTypes.number.isRequired,
  dominentPollutant: PropTypes.string.isRequired,
  pollutantsObject: PropTypes.objectOf(
    PropTypes.shape({
      v: PropTypes.number.isRequired
    })
  ).isRequired,
  measurementDateUnix: PropTypes.number.isRequired,
  attributions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  name: PropTypes.string.isRequired
}

export default CurrentAirQPanel
