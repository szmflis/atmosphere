import React, { useState } from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../elements/FlexContainer'
import { Button } from '../elements/Button'
import { getCityByName } from '../api/openWeather'
import City from '../components/City'
import AutoInput from '../components/AutoInput'

const Wrapper = styled(FlexContainer)`
  width: 100%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 16rem;
  width: 100%;
  position: relative;
`

const Cities = () => {
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
          : <City
            id={results.id}
            currentTime={results.dt}
            name={results.name}
            lat={results.coord.lat}
            lon={results.coord.lon}
            temp={results.main.temp}
            tempMax={results.main.temp_max}
            tempMin={results.main.temp_min}
            pressure={results.main.pressure}
            humidity={results.main.humidity}
            windSpeed={results.wind.speed}
            windDirection={results.wind.deg}
            weatherArr={results.weather}
            country={results.sys.country}
            sunrise={results.sys.sunrise}
            sunset={results.sys.sunset}
            rain={results.rain}
          />
      }
    </Wrapper>

  )
}

export default Cities
