import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCities } from '../../../api/openWeather'
import { FlexContainer } from '../../../elements/FlexContainer'
import CityCompactCard from '../../../components/city/CityCompactCard'

const Wrapper = styled(FlexContainer)`
  width: 100vw;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 100vh;
`

const CitiesList = () => {
  const [cities, setCities] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCities()
      if (!data.status && !data.error) {
        setCities(data)
      } else {
        // TODO redux error handling notification
      }
    }
    fetchData()
  }, [])

  return (
    <Wrapper>
      {
        cities === null
          ? <div></div>
          : cities.map(city => <CityCompactCard
            key={city.id}
            id={city.id}
            currentTime={city.dt}
            name={city.name}
            lat={city.coord.lat}
            lon={city.coord.lon}
            temp={city.main.temp}
            tempMax={city.main.temp_max}
            tempMin={city.main.temp_min}
            pressure={city.main.pressure}
            humidity={city.main.humidity}
            windSpeed={city.wind.speed}
            windDirection={city.wind.deg}
            weatherArr={city.weather}
            country={city.sys.country}
            sunrise={city.sys.sunrise}
            sunset={city.sys.sunset}
            rain={city.rain}
          />)
      }
    </Wrapper>
  )
}

export default CitiesList
