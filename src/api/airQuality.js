import axios from 'axios'
import { AIR_QUALITY } from '../utils/urls'

const {
  API_KEY,
  BASE_URL
} = AIR_QUALITY

export const getCityByName = async (cityName) => {
  try {
    const requestUrl = `${BASE_URL}/${cityName}/?token=${API_KEY}`
    const response = await axios.get(requestUrl)
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response
    }

    return { error: error.message }
  }
}