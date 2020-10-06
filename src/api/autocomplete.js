import axios from 'axios'
import { AUTOCOMPLETE_API } from '../utils/urls'

export const getAutocompletions = async (query) => {
  const url = `${AUTOCOMPLETE_API.BASE_URL}?term=${query}&locale=en&types["city"]`

  const response = await axios.get(url)

  if (response.error) {
    console.log(response.error.message)
    /* make notification component&state redux */
  }

  const limitedArr = response.data.slice(0, 3)

  return limitedArr.map(suggestion => {
    return {
      name: suggestion.name,
      additionalInfo: suggestion.country_name
    }
  })
}
