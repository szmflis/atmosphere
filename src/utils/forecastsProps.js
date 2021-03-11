import { theme } from '../styles/theme'

export const weatherForecastProps = [
  {
    type: 'temp',
    title: 'Temperature',
    unit: '°C',
    color: theme.colors.lineRed,
  },
  {
    type: 'pressure',
    title: 'Pressure',
    unit: 'hPa',
    color: theme.colors.lineTurkoise,
  },
  {
    type: 'pop',
    title: 'Chance of rain',
    unit: '%',
    color: theme.colors.lineBlue,
  },
  {
    type: 'humidity',
    title: 'Humidity',
    unit: '%',
    color: theme.colors.lineBlue,
  },
  {
    type: 'wind_speed',
    title: 'Wind speed',
    unit: 'm/s',
    color: theme.colors.linePurple,
  },
  {
    type: 'uvi',
    title: 'UV Index',
    unit: '',
    color: theme.colors.linePurple,
  },
  {
    type: 'rain',
    title: 'Rain',
    unit: 'mm',
    color: theme.colors.lineBlue,
  }
]

export const airQualityForecastProps = [
  {
    type: 'o3',
    title: 'Ozone (o3)',
    unit: 'μg/m3',
    color: theme.colors.lineRed,
  },
  {
    type: 'pm10',
    title: 'PM10',
    unit: 'μg/m3',
    color: theme.colors.lineTurkoise,
  },
  {
    type: 'pm25',
    title: 'PM2,5',
    unit: 'μg/m3',
    color: theme.colors.lineBlue,
  },
  {
    type: 'uvi',
    title: 'UV Index',
    unit: '',
    color: theme.colors.lineBlue,
  }
]
