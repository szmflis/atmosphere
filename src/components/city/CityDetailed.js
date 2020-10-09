import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCityByCoords } from '../../api/openWeather'
import LineChart from '../charts/LineChart'

import CurrentWeatherPanel from './cityDetailedComponents/CurrentWeatherPanel'

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
    <div>
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
      {
        weatherData === null
          ? <p>waiting for data...</p>
          : <LineChart data={weatherData.hourly} />
      }
    </div>
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
