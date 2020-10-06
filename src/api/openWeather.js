import axios from 'axios'
import { OPEN_WEATHER_URLS } from '../utils/urls'

/* Deconstructing to reduce the visual length of request strings */
const {
  BASE_URL, CITY_BY_NAME, CITIES_BY_IDS, API_KEY
} = OPEN_WEATHER_URLS

export const getCityByName = async (cityName) => {
  const requestUrl = `${BASE_URL}/${CITY_BY_NAME}?q=${cityName}&units=metric&appid=${API_KEY}`
  const response = await axios.get(requestUrl)
  return response.data
}

export const getCities = async () => {
  const requestUrl = `${BASE_URL}/${CITIES_BY_IDS}?id=2643743,5128594,756135,524894,3143244,5419384&units=metric&appid=${API_KEY}`
  const response = await axios.get(requestUrl)
  console.log(response.data.list)
  return response.data.list
}
