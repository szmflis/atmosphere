import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FlexContainer } from '../../elements/FlexContainer'
import Placeholder from './Placeholder'
import Error from '../Error'
import { theme } from '../../styles/theme'

const Wrapper = styled(FlexContainer)`
  width: ${({ width }) => width};
  margin: 1rem;

  max-width: 500px;

  @media ( max-width: 440px ) {
    width: 95vw;
  }

  box-shadow: ${theme.effects.boxShadowPrimary};
  border-radius: 8px;
  background-color: ${theme.colors.greyLightest};

  animation: ${theme.keyframes.fadeIn} 0.5s;
`

const Section = styled(FlexContainer)`
  width: 100%;
  padding: 2rem;
`

const PlaceholderRow = styled(FlexContainer)`
  width: 100%;
  justify-content: space-between;
`

const PlaceholderPanel = ({ status, width }) => {
  return (
    <Wrapper justify="flex-start" width={width}>
      {
        status === 'error'
          ? (
            <Error text="Damn it!" />
          ) : (
            <>
              <Section align="flex-start">
                <PlaceholderRow row>
                  <Placeholder width="30%" height="25px" />
                  <Placeholder width="65%" height="25px" />
                </PlaceholderRow>
                <PlaceholderRow row>
                  <Placeholder width="40%" />
                  <Placeholder width="70%" />
                </PlaceholderRow>
                <PlaceholderRow row>
                  <Placeholder width="90%" />
                  <Placeholder width="10%" />
                </PlaceholderRow>
              </Section>

              <Section align="flex-start">
                <PlaceholderRow row>
                  <Placeholder width="55%" height="25px" />
                </PlaceholderRow>
                <PlaceholderRow row>
                  <Placeholder width="25%" />
                  <Placeholder width="70%" />
                </PlaceholderRow>
                <PlaceholderRow row>
                  <Placeholder width="50%" />
                  <Placeholder width="50%" />
                </PlaceholderRow>
              </Section>

              <Section align="flex-start">
                <PlaceholderRow row>
                  <Placeholder width="65%" />
                  <Placeholder width="35%" />
                </PlaceholderRow>
                <PlaceholderRow row>
                  <Placeholder width="45%" />
                  <Placeholder width="55%" />
                </PlaceholderRow>
                <PlaceholderRow row>
                  <Placeholder width="45%" />
                  <Placeholder width="55%" />
                </PlaceholderRow>
                <PlaceholderRow row>
                  <Placeholder width="75%" />
                  <Placeholder width="25%" />
                </PlaceholderRow>
              </Section>
            </>
          )
      }
    </Wrapper>
  )
}

PlaceholderPanel.propTypes = {
  status: PropTypes.string,
  width: PropTypes.string,
}

PlaceholderPanel.defaultProps = {
  status: 'ok',
  width: '420px',
}

export default PlaceholderPanel
