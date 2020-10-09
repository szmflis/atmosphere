import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCityByCoords } from '../../api/openWeather'
import LineChart from '../charts/LineChart'
import { FlexContainer } from '../../elements/FlexContainer'

import CurrentWeatherPanel from './cityDetailedComponents/CurrentWeatherPanel'

const ChartContainer = styled.div`
  width: 900px;
`

const CityDetailed = ({
  lat, lon, name, country, tempMin, tempAvg, tempMax
}) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCityByCoords(lat, lon)
      if (!data.status && !data.error) {
        setWeatherData(data)
      } else {
        // TODO redux notification as exception handling
      }
    }
    fetchData()
  }, [lat, lon])

  return (
    <FlexContainer row>
      {
        weatherData === null
          ? <p>waiting for data...</p>
          : <CurrentWeatherPanel
            currentTime={weatherData.current.dt}
            sunrise={weatherData.current.sunrise}
            sunset={weatherData.current.sunset}
            pressure={weatherData.current.pressure}
            humidity={weatherData.current.humidity}
            dewpoint={weatherData.current.dew_point}
            uvIndex={weatherData.current.uvi}
            windSpeed={weatherData.current.wind_speed}
            windDir={weatherData.current.wind_deg}
            weatherArr={weatherData.current.weather}
            /*
              tempAvg tempMin tempMax are passed from this
              component props and not the response data as the rest
              because they are not provided by it.
            */
            tempAvg={tempAvg}
            tempMin={tempMin}
            tempMax={tempMax}
          />
      }
      <ChartContainer>
        {
          weatherData === null
            ? <p>waiting for data...</p>
            : <LineChart data={weatherData.hourly} weatherProperty="temp" />
        }
        {
          weatherData === null
            ? <p>waiting for data...</p>
            : <LineChart data={weatherData.hourly} weatherProperty="pressure" />
        }
        {
          weatherData === null
            ? <p>waiting for data...</p>
            : <LineChart data={weatherData.hourly} weatherProperty="humidity" />
        }
        {
          weatherData === null
            ? <p>waiting for data...</p>
            : <LineChart data={weatherData.hourly} weatherProperty="wind_speed" />
        }
      </ChartContainer>
    </FlexContainer>
  )
}

CityDetailed.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  tempAvg: PropTypes.number.isRequired,
  tempMin: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
}

export default CityDetailed
