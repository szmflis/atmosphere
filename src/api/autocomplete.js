import axios from 'axios'
import { AUTOCOMPLETE_API } from '../utils/urls'

const { BASE_URL } = AUTOCOMPLETE_API

export const getAutocomplete = async (query) => {
  const url = `${BASE_URL}?term=${query}&locale=en&types["city"]`

  try {
    const response = await axios.get(url)
    const limitedArr = response.data.slice(0, 3)
    return limitedArr.map(suggestion => {
      return {
        name: suggestion.name,
        additionalInfo: suggestion.country_name
      }
    })
  } catch (error) {
    if (error.response) {
      console.log(error.response)
    } else if (error.request) {
      console.log('request never left')
    }
    return []
  }
}
