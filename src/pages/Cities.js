import React, { useState } from 'react'
import { Button } from '../elements/Button'
import { getCityByName } from '../api/openWeather'
import City from '../components/City'

const Cities = () => {
  const [results, setResults] = useState(null)
  const [query, setQuery] = useState('')

  const getWeather = async (event) => {
    event.preventDefault()
    console.log(query)
    const data = await getCityByName(query)
    setResults(data)
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={getWeather}>
        <input type="text" value={query} onChange={({ target }) => setQuery(target.value)} />
        <Button type="submit" variant="primary">
          Get Weather
        </Button>
      </form>
      {
        results === null
          ? null
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
          />
      }
    </div>
  )
}

export default Cities
