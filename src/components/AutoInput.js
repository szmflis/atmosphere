/*
  AutoInput
  Value accessible through event.target.addressInput.value
  Any api offering autocompletion can be used with this component.
*/

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { getAutocomplete } from '../api/autocomplete'
import { P } from '../elements/P'

const StyledHereInput = styled.input`
  background-color: ${theme.colors.greyLighter};
  font-size: ${theme.fontSize.big};

  padding: 2rem;
  margin: 2rem;

  width: 800px;
  height: 50px;
  border-radius: 8px;

  position: relative;
  border: none;
  box-shadow: ${theme.effects.boxShadowPrimary};
  
  &:focus {
    outline: none;
  }
  @media (max-width: 900px) {
    width: 90vw;
  }
`

const SuggestionsDropdown = styled.div`
  visibility: ${({ suggestions }) => suggestions.length === 0 ? 'hidden' : 'visible'};
  
  transform: translateY(16rem);
  position: absolute;
  top: 0;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-radius: 8px;

  width: 800px;
  @media (max-width: 900px) {
    width: 90vw;
  }
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
    ? 'rgb(124, 143, 176, 0.9)'
    : 'rgb(255, 255, 255, 0.7)'};
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

const AutoInput = () => {
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
    }
    if (target.value.length <= 2) {
      setSuggestions([])
    }
  }

  const handleKeyPress = ({ keyCode }) => {
    // downstroke
    if (keyCode === 40 && selectedSuggestion !== suggestions.length - 1) {
      setSelectedSuggestion(selectedSuggestion + 1)
      console.log(suggestions)
      /*
        query is also set with selectedSuggestion +- 1 and not
        selectedSuggestion because states are asynchronous
        and query would always be one change behind selectedSuggestion
      */
      setQuery(suggestions[selectedSuggestion + 1].name)
    }

    // upstroke
    if (keyCode === 38 && selectedSuggestion !== 0) {
      setSelectedSuggestion(selectedSuggestion - 1)
      setQuery(suggestions[selectedSuggestion - 1].name)
    }

    // enter
    if (keyCode === 13) {
      setQuery(suggestions[selectedSuggestion].name)
      setSuggestions([])
    }

    // esc
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
    <>
      <StyledHereInput
        name="cityInput"
        placeholder="Name of any city"
        onChange={handleQueryChange}
        value={query}
        // onKeyDown is to execute only when there actually are suggestions
        onKeyDown={suggestions.length !== 0 ? handleKeyPress : null}
      />
      <SuggestionsDropdown suggestions={suggestions} ref={ref}>
        {
          suggestions.map((suggestion, index) => <Suggestion
            key={suggestion.name}
            id={suggestion.name}
            index={index}
            selectedSuggestion={selectedSuggestion}
            onMouseOver={() => handleMouseOver(index)}
            onClick={() => handleSuggestionClick(suggestion.name)}
          >
            <P bold>{suggestion.name}</P>
            <P>{suggestion.additionalInfo}</P>
          </Suggestion>)
        }
      </SuggestionsDropdown>
    </>
  )
}

export default AutoInput
