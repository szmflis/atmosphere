import axios from 'axios'
import { OPEN_WEATHER_URLS } from '../utils/urls'

/* Deconstructing to reduce the visual length of request strings */
const {
  BASE_URL, CITY_BY_NAME, CITIES_BY_IDS, API_KEY
} = OPEN_WEATHER_URLS

export const getCityByName = async (cityName) => {
  try {
    const requestUrl = `${BASE_URL}/${CITY_BY_NAME}?q=${cityName}&units=metric&appid=${API_KEY}`
    const response = await axios.get(requestUrl)
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response
    }

    return { error: error.message }
  }
}

export const getCities = async () => {
  try {
    const requestUrl = `${BASE_URL}/${CITIES_BY_IDS}?id=2643743,5128594,756135,524894,3143244,5419384&units=metric&appid=${API_KEY}`
    const response = await axios.get(requestUrl)
    return response.data.list
  } catch (error) {
    if (error.response) {
      return error.response
    }

    return { error: error.message }
  }
}
