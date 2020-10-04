// This file contains all api urls used in the application.

/*
  BASE: api.openweathermap.org/data/2.5/weather
  Each route ends with: &appid={API key}

  Weather for city by:

  name
    BASE?q={city name}
    BASE?q={city name},{state code}
    BASE?q={city name},{state code},{country code}

  id
    BASE?id={city id}

  coordinates
    BASE?lat={lat}&lon={lon}

  TODO: finish this comment/documentation
*/

export const OPEN_WEATHER_URLS = {
  OPEN_WEATHER_API_KEY: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
}
