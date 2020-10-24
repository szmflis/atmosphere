import { keyframes } from 'styled-components'

const FadeIn = keyframes`
  from {
    opacity: 0.3;
  }

  to {
    opacity: 1;
  }
`

const FadeInScale = keyframes`
  from {
    opacity: 0.3;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`

export default {
  fadeIn: FadeIn,
  fadeInScale: FadeInScale,
}
