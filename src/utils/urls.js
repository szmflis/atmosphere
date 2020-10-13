export const OPEN_WEATHER = {
  API_KEY: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  BASE_URL: process.env.REACT_APP_OPEN_WEATHER_BASEURL,
  CITY_BY_NAME: process.env.REACT_APP_OPEN_WEATHER_QUERY_BY_NAME,
  CITY_BY_COORDS: process.env.REACT_APP_OPEN_WEATHER_QUERY_BY_LATLON,
  CITIES_BY_IDS: process.env.REACT_APP_OPEN_WEATHER_QUERY_BY_IDS,
  ICON_URL: process.env.REACT_APP_OPEN_WEATHER_ICONURL,
}

export const AIR_QUALITY = {
  API_KEY: process.env.REACT_APP_AIR_QUALITY_API_KEY,
  BASE_URL: process.env.REACT_APP_AIR_QUALITY_URL,
}

export const AUTOCOMPLETE_API = {
  BASE_URL: process.env.REACT_APP_AUTOCOMPLETE_URL,
}
