/*
  City page takes input data in form of city name and returns
  CityDetailed.js component passing it it's id.
  Id is taken from basic request to openweathermap.org

  Handling of api calls for data for that particular city is then
  handled via CityDetailed.js
*/

import React, { useState } from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../elements/FlexContainer'
import { Button } from '../../elements/Button'
import { getCityByName } from '../../api/openWeather'
import AutoInput from '../../components/AutoInput'
import CityDetailed from '../../components/city/CityDetailed'

const Wrapper = styled(FlexContainer)`
  width: 100%;
`

/*
  TODO DELETE AFTER CITY.JS IS COMPLETE
*/

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 16rem;
  width: 100%;
  position: relative;
`

const Citypage = () => {
  const [results, setResults] = useState(null)

  const getWeather = async (event) => {
    event.preventDefault()
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
