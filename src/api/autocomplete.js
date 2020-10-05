import axios from 'axios'

export const getAutocompletions = async (query) => {
  const url = `http://autocomplete.travelpayouts.com/places2?term=${query}&locale=en&types["city"]`

  const response = await axios.get(url)

  if (response.error) {
    console.log(response.error.message)
    /* make notification component&state redux */
  }

  return response.data.map(suggestion => {
    return {
      name: suggestion.name,
      additionalInfo: suggestion.country_name
    }
  })
}
