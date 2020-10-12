/*
  City page takes input data in form of city name and returns
  CityDetailed.js component passing it it's id.
  Id is taken from basic request to openweathermap.org

  Handling of api calls for data for that particular city is then
  handled via CityDetailed.js
*/

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { FlexContainer } from '../../elements/FlexContainer'
import { Button } from '../../elements/Button'
import { getCityByName } from '../../api/openWeather'
import AutoInput from '../../components/AutoInput'
import CityDetailed from '../../components/city/CityDetailed'
import { theme } from '../../styles/theme'

const Wrapper = styled(FlexContainer)`
  width: 100vw;
  min-height: 100vh;

  justify-content: flex-start;

  background-color: ${theme.colors.primaryLighter};
`

/*
  TODO DELETE AFTER CITY.JS IS COMPLETE
*/

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 8rem;
  width: 100%;
  position: relative;
`

const Citypage = () => {
  const [results, setResults] = useState(null)
  const { cityname } = useParams()
  const history = useHistory()

  useEffect(() => {
    console.log(cityname)
    const fetchData = async () => {
      const data = await getCityByName(cityname)
      if (!data.status && !data.error) {
        setResults(data)
      } else {
        // TODO redux notification as exception handling
      }
    }
    if (cityname) fetchData()
  }, [])

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

export default Citypage
