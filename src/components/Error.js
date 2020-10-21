import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FlexContainer } from '../elements/FlexContainer'
import { H2, H5 } from '../elements/H'
import { Button } from '../elements/Button'

const Wrapper = styled(FlexContainer)`
  padding: 2rem;
  width: 100%;
`

const Error = ({ text }) => {
  return (
    <Wrapper>
      <H2 bold marBot="1rem">Oops!</H2>
      <H5 bold>Data or page You have been looking for</H5>
      <H5 bold marBot="1rem">could not be found</H5>
      <Button variant="primary" width="160px" as={Link} to="/">
        Home
      </Button>
    </Wrapper>
  )
}

Error.propTypes = {
  text: PropTypes.string.isRequired
}

export default Error
