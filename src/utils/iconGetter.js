import { OPEN_WEATHER } from './urls'

const { ICON_URL } = OPEN_WEATHER

export const iconGetter = (iconName) => {
  const requestUrl = `${ICON_URL}/${iconName}@2x.png`
  return requestUrl
}

/*
  Example request
  https://openweathermap.org/img/wn/10d@2x.png
*/
