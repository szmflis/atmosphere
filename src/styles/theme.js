import colors from './colors'
import typography from './typography'
import layout from './layout'
import buttons from './variants/buttons'
import effects from './effects'

export const theme = {
  colors,
  ...typography,
  ...layout,
  buttons,
  effects
}
