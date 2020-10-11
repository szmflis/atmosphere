import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCityByCoords } from '../../api/openWeather'
import { FlexContainer } from '../../elements/FlexContainer'
import ShorttermForecast from './cityDetailedComponents/ShorttermForecast'
import CurrentWeatherPanel from './cityDetailedComponents/CurrentWeatherPanel'
import { H3, H5 } from '../../elements/H'

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
    <>

      <H3 alignCenter>{name}, {country}</H3>
      <H5 alignCenter marBot="3rem">Latitude: {lat} Longitude: {lon}</H5>
      {
        weatherData === null
          ? <p>waiting for data...</p>
          : <PanelsContainer>
            <Column>
              <CurrentWeatherPanel
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
            </Column>
            <Column>
              <ShorttermForecast hourlyData={weatherData.hourly} />
            </Column>
          </PanelsContainer>
      }
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
