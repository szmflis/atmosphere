import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FlexContainer } from '../../../elements/FlexContainer'
import { H1, H3 } from '../../../elements/H'
import { P } from '../../../elements/P'
import { Button } from '../../../elements/Button'
import plane from '../../../assets/plane.jpg'

const StyledWrapper = styled(FlexContainer)`
  background-image: url(${plane});
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 800px;
  align-items: flex-start;
`

const TextContainer = styled(FlexContainer)`
  width: 50%;
  padding: 2rem;
  min-width: 520px;
  
  @media( max-width: 860px ) {
    width: 100%;
    min-width: 0;
  }
`

const Hero = () => (
  <StyledWrapper>
    <TextContainer>
      <H1 bold marBot="1rem" alignCenter>
        Find accurate weather
      </H1>
      <H3 marBot="3rem" alignCenter>
        &air quality of any city
      </H3>
      <P alignCenter maxWidth="680px">
        This illustration of a plane does not have anything to do
        with the actual site.
        I will put a illustration better fit to words like atmosphere,
        nature and such when i get the time to fiddle with Adobe Illustrator.
      </P>
      <Button as={Link} to="/city" variant="primary" mar="4rem 0rem">
        Check Your City
      </Button>
    </TextContainer>
  </StyledWrapper>
)

export default Hero
