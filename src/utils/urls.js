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
  API_KEY: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  BASE_URL: process.env.REACT_APP_OPEN_WEATHER_BASEURL,
  CITY_BY_NAME: process.env.REACT_APP_OPEN_WEATHER_QUERY_BY_NAME,
  CITIES_BY_IDS: process.env.REACT_APP_OPEN_WEATHER_QUERY_BY_IDS,
  ICON_URL: process.env.REACT_APP_OPEN_WEATHER_ICONURL,
}

export const AUTOCOMPLETE_API = {
  BASE_URL: process.env.REACT_APP_AUTOCOMPLETE_URL,
}
