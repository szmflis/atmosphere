import axios from 'axios'
import { OPEN_WEATHER_URLS } from '../utils/urls'

export const getCityByName = async (cityName) => {
  const requestUrl = `${OPEN_WEATHER_URLS.BASE_URL}?q=${cityName}&units=metric&appid=${OPEN_WEATHER_URLS.OPEN_WEATHER_API_KEY}`
  const response = await axios.get(requestUrl)
  return response.data
}
