import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { FlexContainer } from '../../elements/FlexContainer'
import { Button } from '../../elements/Button'
import { getCityByName } from '../../api/openWeather'
import AutoInput from '../../components/AutoInput'
import CityDetailed from '../../components/city/CityDetailed'
import { theme } from '../../styles/theme'
import { H3 } from '../../elements/H'

const Wrapper = styled(FlexContainer)`
  width: 100vw;
  min-height: 100vh;

  justify-content: flex-start;

  background-color: ${theme.colors.primaryLighter};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 8rem;
  width: 100%;
  position: relative;
`

/*
  City component handles getting input/url parameters,
  calling most basic api from openweathermap to get
  city parameters, id and such, then passing that to
  CityDetailed which handles rest of the requests
  to more detailed apis.
*/

const City = () => {
  const [results, setResults] = useState(null)
  const { cityname } = useParams()
  const history = useHistory()

  /* Handles getting data if search parameters specified in url */
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCityByName(cityname)
      if (!data.status && !data.error) {
        setResults(data)
      } else {
        // TODO redux notification as exception handling
      }
    }
    if (cityname) fetchData()
  }, [cityname])

  /* Handles getting data if search parameters submitted via form */
  const getWeather = async (event) => {
    event.preventDefault()
    history.push(`/city/${event.target.cityInput.value}`)
    const data = await getCityByName(event.target.cityInput.value)
    if (!data.status && !data.error) {
      setResults(data)
    } else {
      // TODO redux notification as exception handling
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={getWeather} autoComplete="off">
        <H3 alignCenter marBot="1rem">Check any city weather&air quality</H3>
        <AutoInput />
        <Button type="submit" variant="primary">
          Get Weather
        </Button>
      </Form>
      {
        results === null
          ? <div></div>
          : <CityDetailed
            lat={results.coord.lat}
            lon={results.coord.lon}
            name={results.name}
            country={results.sys.country}
            tempAvg={results.main.temp}
            tempMin={results.main.temp_min}
            tempMax={results.main.temp_max}
          />
      }
    </Wrapper>
  )
}

export default City
