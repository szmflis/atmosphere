import axios from 'axios'
import { OPEN_WEATHER_URLS } from '../utils/urls'

export const getCityByName = async (cityName) => {
  const requestUrl = `${OPEN_WEATHER_URLS.BASE_URL}/${OPEN_WEATHER_URLS.QUERY_NAME}?q=${cityName}&units=metric&appid=${OPEN_WEATHER_URLS.OPEN_WEATHER_API_KEY}`
  const response = await axios.get(requestUrl)
  return response.data
}

export const getCities = async () => {
  const requestUrl = `${OPEN_WEATHER_URLS.BASE_URL}/${OPEN_WEATHER_URLS.QUERY_IDS}?id=2643743,5128594,756135,524894,3143244,5419384&units=metric&appid=${OPEN_WEATHER_URLS.OPEN_WEATHER_API_KEY}`
  const response = await axios.get(requestUrl)
  console.log(response.data.list)
  return response.data.list
}
