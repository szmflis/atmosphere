import styled from 'styled-components'

export const InlineTextWrapper = styled.div`
  display: flex;
  flex-direction: row;

  padding: ${({ pad }) => pad || 0}
`
