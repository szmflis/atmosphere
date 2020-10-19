import React from 'react'
import PropTypes from 'prop-types'
import colors from '../styles/colors'

export const IconSunrise = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
    <line x1="3" y1="21" x2="21" y2="21" />
    <path d="M12 9v-6l3 3m-6 0l3 -3" />
  </svg>
)

export const IconSundown = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
    <line x1="3" y1="21" x2="21" y2="21" />
    <path d="M12 3v6l3 -3m-6 0l3 3" />
  </svg>
)

IconSunrise.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

IconSunrise.defaultProps = {
  color: colors.textRed,
  size: 44
}

IconSundown.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

IconSundown.defaultProps = {
  color: colors.textRed,
  size: 44
}
