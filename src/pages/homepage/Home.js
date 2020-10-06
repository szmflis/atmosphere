import React from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../elements/FlexContainer'
import Hero from './components/Hero'
import CitiesList from './components/CitiesList'

const Wrapper = styled(FlexContainer)`
  width: 100%;
`

const Home = () => {
  return (
    <Wrapper>
      <Hero />
      <CitiesList />
    </Wrapper>
  )
}

export default Home
