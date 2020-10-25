import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCityByCoords } from '../../api/openWeather'
import { getCityByName } from '../../api/airQuality'
import { FlexContainer } from '../../elements/FlexContainer'
import { H2, H4 } from '../../elements/H'
import { weatherForecastProps, airQualityForecastProps } from '../../utils/forecastsProps'
import Forecast from './cityDetailedComponents/Forecast'
import CurrentWeatherPanel from './cityDetailedComponents/CurrentWeatherPanel'
import CurrentAirQPanel from './cityDetailedComponents/CurrentAirQPanel'
import PlaceholderPanel from '../placeholder/PlaceholderPanel'

const PanelsContainer = styled(FlexContainer)`
  flex-direction: row;
  align-items: flex-start;

  @media ( max-width: 900px ) {
    flex-direction: column;
    align-items: center;
  }
`

const Column = styled(FlexContainer)`
  align-items: center;
`

const CityDetailed = ({
  lat, lon, name, country, tempMin, tempAvg, tempMax
}) => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null)
  const [hourlyWeatherForecastData, setHourlyWeatherForecastData] = useState(null)
  const [dailyWeatherForecastData, setDailyWeatherForecastData] = useState(null)
  const [weatherStatus, setWeatherStatus] = useState(null)

  const [currentAirQualityData, setCurrentAirQualityData] = useState(null)
  const [airQualityForecastData, setAirQualityForecastData] = useState(null) // future
  const [airQuailtyStatus, setAirQuailtyStatus] = useState(null)

  const resetState = () => {
    setCurrentWeatherData(null)
    setHourlyWeatherForecastData(null)
    setDailyWeatherForecastData(null)
    setCurrentAirQualityData(null)
    setAirQualityForecastData(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      resetState()
      const weatherData = await getCityByCoords(lat, lon)
      if (!weatherData.status && !weatherData.error) {
        setCurrentWeatherData(weatherData.current)
        setHourlyWeatherForecastData(weatherData.hourly)
        setDailyWeatherForecastData(weatherData.daily)
      } else {
        setWeatherStatus('error')
      }

      const airQualityData = await getCityByName(name)
      if (airQualityData.status === 'ok') {
        setCurrentAirQualityData(airQualityData.data)
        setAirQualityForecastData(airQualityData.data.forecast.daily)
      } else {
        setAirQuailtyStatus('error')
      }
    }
    fetchData()
  }, [lat, lon])

  const formatDailyForecastData = (daily) => {
    const formattedData = daily.map(day => {
      return {
        ...day,
        temp: day.temp.day,
      }
    })

    return formattedData
  }

  const formatHourlyForecastData = (hourly) => {
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

  const formatAirQForecastData = (daily) => {
    let dates = Object.entries(daily)[0][1].map(o => {
      return {
        dt: Math.round(new Date(o.day).getTime() / 1000)
      }
    })

    Object.entries(daily).forEach(arr => {
      arr[1].forEach(obj => {
        dates = dates.map(date => {
          if (date.dt === Math.round(new Date(obj.day).getTime() / 1000)) {
            return {
              ...date,
              [arr[0]]: obj.avg
            }
          }
          return date
        })
      })
    })

    return dates
  }

  const formatPollutantsCurrentAirQData = (pollutantsObject) => {
    console.log(pollutantsObject)
    return ['no2', 'pm10', 'pm25', 'so2', 'o3', 'co']
      .filter(pollutant => {
        if (pollutantsObject[pollutant]) return true
        return false
      })
      .map(
        pollutant => {
          return {
            pollutantName: pollutant,
            pollutantValue: pollutantsObject[pollutant].v
          }
        }
      )
  }

  return (
    <>
      <H2 alignCenter bold>{name}, {country}</H2>
      <H4 alignCenter marBot="4rem" bold>Latitude: {lat} Longitude: {lon}</H4>
      <PanelsContainer>
        <Column>
          {
            currentWeatherData === null
              ? <PlaceholderPanel status={weatherStatus} />
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
              ? <PlaceholderPanel status={airQuailtyStatus} />
              : <CurrentAirQPanel
                airQualityIndex={currentAirQualityData.aqi}
                dominentPollutant={currentAirQualityData.dominentpol}
                pollutantsObject={formatPollutantsCurrentAirQData(currentAirQualityData.iaqi)}
                measurementDateUnix={currentAirQualityData.time.v}
                attributions={currentAirQualityData.attributions}
                name={name}
              />
          }
        </Column>

        <Column>
          {
            hourlyWeatherForecastData === null
              ? <PlaceholderPanel status={weatherStatus} width="750px" />
              : <Forecast
                data={formatHourlyForecastData(hourlyWeatherForecastData)}
                forecastProps={weatherForecastProps}
                title="48 hour weather forecast"
              />
          }
          {
            dailyWeatherForecastData === null
              ? <PlaceholderPanel status={weatherStatus} width="750px" />
              : <Forecast
                data={formatDailyForecastData(dailyWeatherForecastData)}
                forecastProps={weatherForecastProps}
                title="7 day weather forecast"
              />
          }
          {
            airQualityForecastData === null
              ? <PlaceholderPanel status={airQuailtyStatus} width="750px" />
              : <Forecast
                data={formatAirQForecastData(airQualityForecastData)}
                forecastProps={airQualityForecastProps}
                title="Short term pollutant forecast"
              />
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
