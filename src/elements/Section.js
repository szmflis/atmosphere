import styled from 'styled-components'
import { FlexContainer } from './FlexContainer'

/*
  Sections are styled components (containers)
  Made to wrap content with paddings/margins and such.
  Reusable across all pages.

  TO DELETE ONCE REFACTORED
*/

export const Section = styled(FlexContainer)`
  width: 100vw;
  padding: 25px;
  margin: 50px;
`
