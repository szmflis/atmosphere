import { OPEN_WEATHER_URLS } from './urls'

export const iconGetter = (iconName) => {
  const requestUrl = `${OPEN_WEATHER_URLS.ICON_URL}/${iconName}@2x.png`
  return requestUrl
}

/*
  Example request
  https://openweathermap.org/img/wn/10d@2x.png
*/
