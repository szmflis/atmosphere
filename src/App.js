import React, { useState } from 'react'
import {
  MapContainer, TileLayer, Marker, useMap
} from 'react-leaflet'
import styled from 'styled-components'
import { BsSearch } from 'react-icons/all';
import Layout from './layout/Layout'
import AutoInput from './components/AutoInput'
import { Button } from './elements/Button';
import { FlexContainer } from './elements/FlexContainer';
import { getNasaImage } from './api/autocomplete';
import { P } from './elements/P';
import { H3 } from './elements/H';

const Wrapper = styled(FlexContainer)`
  background-color: aliceblue;
  padding: 4rem;
  margin: 1rem;
  border-radius: 15px;
  
  width: 100%;
  max-width: 800px;
  
  align-content: space-between;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  @media (max-width: 900px) {
    width: 90vw;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
`

const MapWrapper = styled(FlexContainer)`
  width:100%;
  height: 500px;
`

const StyledIcon = styled(BsSearch)`
  margin-left: 2rem;
`

const StyledImg = styled.img`
  width: 100%;
  margin-top: 2rem;
`

const App = () => {
  const [locationInfo, setLocationInfo] = useState()
  const [locationCoords, setLocationCoords] = useState({ lat: 51.505, lon: -0.09 })
  const [imgUrl, setImgUrl] = useState(null)
  const [notification, setNotification] = useState(null)

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    const inputValue = event.target.cityInput.value

    if (inputValue.length <= 3) {
      setNotification('Please input at least 3 characters')
      return;
    }
    setNotification(null)

    const location = locationInfo.find(l => l.name === inputValue)

    if (location) {
      setLocationCoords({
        lat: location.lat,
        lon: location.lon
      })
      const imgFromReq = await getNasaImage(location.lat, location.lon)
      setImgUrl(imgFromReq)
    } else {
      setNotification("Sorry, couldn't find that location.")
    }
  }

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <Layout>
      <Wrapper>
        <H3 marBot="1rem">Input location name</H3>

        <StyledForm onSubmit={handleOnSubmit} autocomplete="disabled">
          <AutoInput setLocationInfo={setLocationInfo} />
          {notification && <P>{notification}</P>}
          <Button type="submit" variant="primary" mar="4rem">Search <StyledIcon /></Button>
        </StyledForm>
        <MapWrapper>
          <MapContainer center={[locationCoords.lat, locationCoords.lon]} zoom={13} scrollWheelZoom={false}>
            <ChangeView center={[locationCoords.lat, locationCoords.lon]} zoom={13} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[locationCoords.lat, locationCoords.lon]}>
            </Marker>
          </MapContainer>
        </MapWrapper>
        {imgUrl && <StyledImg
          src={imgUrl}
          alt="if everything went right, this is a picture from nasa api."
        />}
      </Wrapper>

    </Layout>
  )
}

export default App
