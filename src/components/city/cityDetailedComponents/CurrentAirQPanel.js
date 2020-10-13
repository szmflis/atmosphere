import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dayjs from 'dayjs'
import {
  getColorFromAirQ, getInfoFromAirQ, getTextColorFromAirQ, getStateFromAirQ
} from '../../../utils/airQhelper'
import { H1, H4, H5 } from '../../../elements/H'
import { P } from '../../../elements/P'
import { FlexContainer } from '../../../elements/FlexContainer'
import { theme } from '../../../styles/theme'

const Wrapper = styled(FlexContainer)`
  width: 400px;
  margin: 2rem;

  @media ( max-width: 420px ) {
    width: 100%;
    margin: 1rem;
  }

  box-shadow: ${theme.effects.boxShadowPrimary};
`

const PaddedSection = styled(FlexContainer)`
  width: 100%;
  padding: 2rem;
`

const AirQIndexBox = styled(FlexContainer)`
  //required to pass
  background-color: ${({ color }) => color};
  width: 150px;
  height: 150px;
  border-radius: 1rem;
  margin-right: 2rem;
`

const Header = styled(PaddedSection)`
  background-color: ${theme.colors.greyLight};
`

const HeaderInfo = styled(FlexContainer)`
  max-width: 60%;
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
      <Header row align="flex-start" justify="flex-start">
        <AirQIndexBox color={getColorFromAirQ(airQualityIndex)}>
          <H4 alignCenter color={getTextColorFromAirQ(airQualityIndex)}>
            {name}
          </H4>
          <H1 alignCenter color={getTextColorFromAirQ(airQualityIndex)}>
            {airQualityIndex}
          </H1>
          <H4 alignCenter color={getTextColorFromAirQ(airQualityIndex)}>
            {getStateFromAirQ(airQualityIndex)}
          </H4>
        </AirQIndexBox>
        <HeaderInfo align="flex-start">
          <H4 bold>Current AQI</H4>
          <P>Last updated on</P>
          <P marBot="1rem">
            {dayjs.unix(measurementDateUnix).format('dddd HH:mm DD-MM-YYYY')}
          </P>
          <P size={theme.fontSize.small}>
            {getInfoFromAirQ(airQualityIndex)}
          </P>
        </HeaderInfo>
      </Header>
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
