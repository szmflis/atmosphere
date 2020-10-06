/*
  AutoInput
  Value accessible through event.target.addressInput.value
  Any api offering autocompletion can be used with this component.
*/

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { getAutocompletions } from '../api/autocomplete'

const StyledHereInput = styled.input`
  font-size: ${({ fontSize }) => fontSize || theme.fontSize.big};
  background-color: ${theme.colors.greyLighter};
  padding: ${({ padding }) => padding || '10px'};
  margin: 2rem;
  width: 800px;
  height: 50px;
  border: none;
  border-radius: 8px;
  box-shadow: ${theme.effects.boxShadowPrimary};
  
  &:focus {
    outline: none;
  }
  @media (max-width: 900px) {
    width: 90vw;
  }
`

const SuggestionsDropdown = styled.div`
  transform: translateY(60px);
  position: absolute;
  /* visibility and height are set to avoid layout shifts on rendering  */
  visibility: ${({ suggestions }) => suggestions.length === 0 ? 'hidden' : 'visible'};
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  padding: 0;

  width: 800px;
  @media (max-width: 900px) {
    width: 90vw;
  }
`

const Suggestion = styled.p`
  width: 100%;
  margin: 0;
  padding: 10px;
  color: ${theme.colors.primaryDarkExtra};
  font-size: ${theme.fontSize.regular};
  font-weight: ${theme.fontWeight.semibold};
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
      const placeList = await getAutocompletions(target.value)
      setSuggestions(placeList)
      console.log(placeList)
    }
    if (target.value.length <= 2) {
      setSuggestions([])
    }
  }

  const handleKeyPress = ({ keyCode }) => {
    // downstroke
    if (keyCode === 40 && selectedSuggestion !== suggestions.length - 1) {
      setSelectedSuggestion(selectedSuggestion + 1)
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
            {suggestion.name}
          </Suggestion>)
        }
      </SuggestionsDropdown>
    </>
  )
}

export default AutoInput