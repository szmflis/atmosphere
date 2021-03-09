import axios from 'axios'
import { API_KEYS } from '../utils/tokenUtils'

export const getAutocomplete = async (query) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?&access_token=${API_KEYS.AUTOCOMPLETE_KEY}`

  try {
    const response = await axios.get(url)
    console.log(response)
    if (response && !response.error) {
      const limitedArr = response.data.features.slice(0, 3)
      return limitedArr.map(suggestion => {
        return {
          name: suggestion.text,
          lon: suggestion.center[0],
          lat: suggestion.center[1],
        }
      })
    }

    return null
  } catch (error) {
    if (error.response) {
      console.log(error.response)
    } else if (error.request) {
      console.log('request never left')
    }
    return []
  }
}

export const getNasaImage = async (lat, lon) => {
  const requestUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.15&&date=2019-01-01&api_key=${API_KEYS.NASA_KEY}`
  const response = await axios.get(requestUrl)

  if (response && !response.error) {
    return response.config.url
  }
  return 'something went wrong'
}
