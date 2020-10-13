import colors from '../styles/colors'

const healthImplications = {
  good: 'Air quality is considered satisfactory, and air pollution poses little or no risk',
  moderate: 'Air quality is acceptable; however, there may be a moderate health concern for people sensitive to air pollution.',
  bad: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
  unhealthy: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects',
  veryUnhealthy: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
  hazardous: 'Health alert: everyone may experience more serious health effects'
}

/*
  Functions within this file take air quality index, and return
  color corresponding to it, and short description of health implications.

  Everything is recieved by two different functions,
  making just one and returning an object
  is a viable option, and is probably a tidier one.
  However i want to get color from airQ index and the text in all sorts of places,
  sometimes getting just the color, sometimes just text, which makes this approach
  more reasonable in that particular case.
*/

export const getColorFromAirQ = airQindex => {
  if (airQindex <= 50) {
    return colors.airQgood
  }
  if (airQindex > 50 && airQindex <= 100) {
    return colors.airQmoderate
  }
  if (airQindex > 100 && airQindex <= 150) {
    return colors.airQbad
  }
  if (airQindex > 150 && airQindex <= 200) {
    return colors.airQunhealthy
  }
  if (airQindex > 200 && airQindex <= 300) {
    return colors.airQveryUnhealthy
  }
  if (airQindex > 300) {
    return colors.airQhazardous
  }
}

export const getStateFromAirQ = airQindex => {
  if (airQindex <= 50) {
    return 'Good'
  }
  if (airQindex > 50 && airQindex <= 100) {
    return 'Moderate'
  }
  if (airQindex > 100 && airQindex <= 150) {
    return 'Bad'
  }
  if (airQindex > 150 && airQindex <= 200) {
    return 'Unhealthy'
  }
  if (airQindex > 200 && airQindex <= 300) {
    return 'Very unhealthy'
  }
  if (airQindex > 300) {
    return 'Hazardous'
  }
}

export const getInfoFromAirQ = airQindex => {
  if (airQindex <= 50) {
    return healthImplications.good
  }
  if (airQindex > 50 && airQindex <= 100) {
    return healthImplications.moderate
  }
  if (airQindex > 100 && airQindex <= 150) {
    return healthImplications.bad
  }
  if (airQindex > 150 && airQindex <= 200) {
    return healthImplications.unhealthy
  }
  if (airQindex > 200 && airQindex <= 300) {
    return healthImplications.veryUnhealthy
  }
  if (airQindex > 300) {
    return healthImplications.hazardous
  }
}

export const getTextColorFromAirQ = airQindex => {
  if (airQindex > 50 && airQindex <= 150) {
    return colors.black
  }
  return colors.white
}
