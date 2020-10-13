import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCityByCoords } from '../../api/openWeather'
import { getCityByName } from '../../api/airQuality'
import { FlexContainer } from '../../elements/FlexContainer'
import { H2, H4 } from '../../elements/H'
import Forecast from './cityDetailedComponents/Forecast'
import CurrentWeatherPanel from './cityDetailedComponents/CurrentWeatherPanel'
import CurrentAirQPanel from './cityDetailedComponents/CurrentAirQPanel'

const PanelsContainer = styled(FlexContainer)`
  flex-direction: row;
  align-items: flex-start;

  @media ( max-width: 900px ) {
    flex-direction: column;
    align-items: center;
  }
`

const Column = styled(FlexContainer)`
  align-items: flex-start;
`

const CityDetailed = ({
  lat, lon, name, country, tempMin, tempAvg, tempMax
}) => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null)
  const [hourlyWeatherForecastData, setHourlyWeatherForecastData] = useState(null)
  const [dailyWeatherForecastData, setDailyWeatherForecastData] = useState(null)
  const [currentAirQualityData, setCurrentAirQualityData] = useState(null)
  const [airQualityForecastData, setAirQualityForecastData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await getCityByCoords(lat, lon)
      if (!weatherData.status && !weatherData.error) {
        setCurrentWeatherData(weatherData.current)
        setHourlyWeatherForecastData(weatherData.hourly)
        setDailyWeatherForecastData(weatherData.daily)
      } else {
        // TODO handle errors
      }

      const airQualityData = await getCityByName(name)
      console.log(airQualityData.data)
      if (airQualityData.status === 'ok') {
        setCurrentAirQualityData(airQualityData.data)
        if (airQualityData.data.forecast.daily) {
          setAirQualityForecastData(airQualityData.data.forecast.daily)
        }
      } else {
        // TODO handle errors | not founds
      }
    }
    fetchData()
  }, [lat, lon])

  const formatDailyForecastData = ( daily ) => {
    const formattedData = daily.map(day => {
      return {
        ...day,
        temp: day.temp.day,
      }
    })

    return formattedData
  }

  const formatHourlyForecastData = ( hourly ) => {
    const formattedData = hourly.map(hour => {
      if (hour.rain) {
        return {
          ...hour,
          rain: hour.rain['1h']
        }
      }
      return hour
    })

    return formattedData
  }

  return (
    <>
      <H2 alignCenter bold>{name}, {country}</H2>
      <H4 alignCenter marBot="4rem" bold>Latitude: {lat} Longitude: {lon}</H4>
      <PanelsContainer>
        <Column>
          {
            currentWeatherData === null
              ? <p>waiting for data</p>
              : <CurrentWeatherPanel
                currentTime={currentWeatherData.dt}
                sunrise={currentWeatherData.sunrise}
                sunset={currentWeatherData.sunset}
                pressure={currentWeatherData.pressure}
                humidity={currentWeatherData.humidity}
                dewpoint={currentWeatherData.dew_point}
                uvIndex={currentWeatherData.uvi}
                windSpeed={currentWeatherData.wind_speed}
                windDir={currentWeatherData.wind_deg}
                weatherArr={currentWeatherData.weather}
                tempAvg={tempAvg}
                tempMin={tempMin}
                tempMax={tempMax}
              />
          }
          {
            currentAirQualityData === null
              ? <p>waiting for data</p>
              : <CurrentAirQPanel
                airQualityIndex={currentAirQualityData.aqi}
                dominentPollutant={currentAirQualityData.dominentpol}
                pollutantsObject={currentAirQualityData.iaqi}
                measurementDateUnix={currentAirQualityData.time.v}
                attributions={currentAirQualityData.attributions}
                name={name}
              />
          }
        </Column>

        <Column>
          {
            hourlyWeatherForecastData === null
              ? <p>waiting for data ...</p>
              : <Forecast data={formatHourlyForecastData(hourlyWeatherForecastData)} title="48 hour weather forecast" />
          }
          {
            dailyWeatherForecastData === null
              ? <p>waiting for data ...</p>
              : <Forecast data={formatDailyForecastData(dailyWeatherForecastData)} title="7 day weather forecast" />
          }
        </Column>
      </PanelsContainer>
    </>
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
