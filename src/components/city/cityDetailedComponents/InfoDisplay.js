import React from 'react'
import PropTypes from 'prop-types'
import { P } from '../../../elements/P'
import { InlineTextWrapper } from '../../../elements/InlineTextWrapper'
import { theme } from '../../../styles/theme'

const InfoDisplay = ({
  name, value, unit, pad
}) => {
  return (
    <InlineTextWrapper pad={pad}>
      <P bold>{name}:&nbsp;</P>
      <P bold color={theme.colors.textBlue}>{value}&nbsp;</P>
      <P opaque>{unit}</P>
    </InlineTextWrapper>
  )
}

InfoDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string,
  pad: PropTypes.string
}

InfoDisplay.defaultProps = {
  pad: '0',
  unit: null
}

export default InfoDisplay
