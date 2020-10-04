import React from 'react'
import PropTypes from 'prop-types'

const City = ({
  id, currentTime, name, lat, lon,
  temp, tempMax, tempMin, pressure, humidity,
  windSpeed, windDirection, weatherArr,
  clouds, rain, snow
}) => {
  return (
    <div>
      <p>id: {id}</p>
      <p>currentTime: {currentTime}</p>
      <p>name: {name}</p>
      <p>lat: {lat}</p>
      <p>lon: {lon}</p>
      <p>temp: {temp}</p>
      <p>tempMax: {tempMax}</p>
      <p>tempMin: {tempMin}</p>
      <p>pressure: {pressure}</p>
      <p>humidity: {humidity}</p>
      <p>windSpeed: {windSpeed}</p>
      <p>windDirection: {windDirection}</p>
      {
        weatherArr.id === null
          ? null
          : weatherArr.map(weather => <div key={weather.id}>{weather.main}</div>)
      }
    </div>
  )
}

City.propTypes = {
  id: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  tempMin: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  windDirection: PropTypes.number.isRequired,
  weatherArr: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    main: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string
  })),
  clouds: PropTypes.shape({
    all: PropTypes.number
  }),
  // TODO finish proptypes after testing
}

City.defaultProps = {
  clouds: { all: null },
  weatherArr: [{ id: null }]
}

export default City

/*

  Example response which data is to be presented by
  City.js component:
    {
    "id":88319,"dt":1345284000,"name":"Benghazi",
        "coord":{"lat":32.12,"lon":20.07},
        "main":{"temp":306.15,"pressure":1013,"humidity":44,
        "temp_min":306,"temp_max":306},
        "wind":{"speed":1,"deg":-7},
        "weather":[
            {"id":520,"main":"rain","description":"light intensity 
            shower rain","icon":"09d"},
            {"id":500,"main":"rain","description":"light rain","icon":
            "10d"},
            {"id":701,"main":"mist","description":"mist","icon":"50d"}
                  ],
        "clouds":{"all":90},
        "rain":{"3h":3}
  }
*/
