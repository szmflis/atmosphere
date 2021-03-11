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
import DoughnutChart from '../../chart/DoughnutChart'

const Wrapper = styled(FlexContainer)`
  width: 420px;
  margin: 1rem;

  @media ( max-width: 440px ) {
    width: 95vw;
  }

  border-radius: 8px;
  box-shadow: ${theme.effects.boxShadowPrimary};
  background-color: ${theme.colors.greyLightest};
`

const PaddedSection = styled(FlexContainer)`
  background-color: ${({ color }) => color};
  width: 100%;
  padding: 2rem;
`

const AirQIndexBox = styled(FlexContainer)`
  background-color: ${({ color }) => color};
  box-shadow: ${theme.effects.boxShadowPrimary};
  border-radius: 8px;
  min-width: 100px;
  padding: 1rem;
`

const Header = styled(PaddedSection)`
  border-radius: 8px 8px 0px 0px;
`

const Attributions = styled(PaddedSection)`
  padding: 0rem 2rem 2rem 2rem;
  border-radius: 0px 0px 8px 8px;
`

const ChartsContainer = styled(FlexContainer)`
  width: 100%;
`

const CurrentAirQPanel = ({
  airQualityIndex,
  dominentPollutant,
  pollutantsObject,
  measurementDateUnix,
  attributions,
  name
}) => {
  console.log(pollutantsObject)

  return (
    <Wrapper>
      <Header row justify="space-between" color={theme.colors.greyLighter}>
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
      <PaddedSection align="flex-start">
        <P marBot="2rem">
          {getInfoFromAirQ(airQualityIndex)}
        </P>
        <H4>Pollutants</H4>
        {
          pollutantsObject.map(pollutant => {
            return (
              <InfoDisplay
                key={pollutant.pollutantName}
                name={pollutant.pollutantName}
                value={pollutant.pollutantValue}
                unit={pollutant.pollutantName === dominentPollutant ? 'μg/m3 - dominent pollutant' : 'μg/m3'}
                pad="1rem 0rem"
              />
            )
          })
        }
      </PaddedSection>
      <ChartsContainer>
        <DoughnutChart
          data={pollutantsObject.map(pollutant => {
            return {
              propName: pollutant.pollutantName,
              propValue: pollutant.pollutantValue,
            }
          })}
          unit="μg/m3"
        />
      </ChartsContainer>
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
