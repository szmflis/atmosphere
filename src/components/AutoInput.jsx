import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { theme } from '../styles/theme'
import { getAutocomplete } from '../api/autocomplete'
import { P } from '../elements/P'
import { FlexContainer } from '../elements/FlexContainer'

const InputContainer = styled(FlexContainer)`
  position: relative;
  width: 100%;
  margin: 1rem;
`

const StyledHereInput = styled.input`
  background-color: ${theme.colors.greyLighter};
  font-size: ${theme.fontSize.big};

  padding: 2rem;
  margin: 1rem;

  width: 100%;
  height: 50px;
  border-radius: 8px;

  border: 1px solid rgba(83,51,237,0.2);
  box-shadow: ${theme.effects.boxShadowPrimary};
  
  &:focus {
    outline: none;
  }
`

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2;
  
  visibility: ${({ suggestions }) => suggestions.length === 0 ? 'hidden' : 'visible'};
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-radius: 8px;

  width: 100%;
`

const Suggestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 1rem;
  margin: 0;

  background-color: ${({
    selectedSuggestion, index
  }) => selectedSuggestion === index
    ? 'rgb(124, 143, 176, 1)'
    : 'rgb(255, 255, 255, 0.9)'};
`

const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}

const AutoInput = ({ setLocationInfo }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const ref = useRef()

  useOnClickOutside(ref, () => setSuggestions([]));

  const handleQueryChange = async ({ target }) => {
    setQuery(target.value)

    if (target.value.length > 2) {
      const placeList = await getAutocomplete(target.value)
      setSuggestions(placeList)
      setLocationInfo(placeList)
    }
    if (target.value.length <= 2) {
      setSuggestions([])
    }
  }

  const handleKeyPress = ({ keyCode }) => {
    if (keyCode === 40 && selectedSuggestion !== suggestions.length - 1) {
      setSelectedSuggestion(selectedSuggestion + 1)
      console.log(suggestions)
      setQuery(suggestions[selectedSuggestion + 1].name)
    }

    if (keyCode === 38 && selectedSuggestion !== 0) {
      setSelectedSuggestion(selectedSuggestion - 1)
      setQuery(suggestions[selectedSuggestion - 1].name)
    }

    if (keyCode === 13) {
      setQuery(suggestions[selectedSuggestion].name)
      setSuggestions([])
    }

    if (keyCode === 27) {
      setSuggestions([])
    }
  }

  const handleMouseOver = (index) => {
    setSelectedSuggestion(index)
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setSuggestions([])
  }

  return (
    <InputContainer>
      <StyledHereInput
        name="cityInput"
        type="search"
        placeholder="Name of any city"
        onChange={handleQueryChange}
        value={query}
        // onKeyDown is to execute only when there actually are suggestions
        onKeyDown={suggestions.length !== 0 ? handleKeyPress : null}
        autocomplete="disabled"
      />
      <SuggestionsDropdown suggestions={suggestions} ref={ref}>
        {
          suggestions.map((suggestion, index) => <Suggestion
            key={`${suggestion.name}${index}`}
            id={`${suggestion.name}${index}`}
            index={index}
            selectedSuggestion={selectedSuggestion}
            onMouseOver={() => handleMouseOver(index)}
            onClick={() => handleSuggestionClick(suggestion.name)}
          >
            <P bold>{suggestion.name}</P>
            <P>{suggestion.lat}, {suggestion.lon}</P>
          </Suggestion>)
        }
      </SuggestionsDropdown>
    </InputContainer>
  )
}

AutoInput.propTypes = {
  setLocationInfo: PropTypes.func.isRequired
};

export default AutoInput
