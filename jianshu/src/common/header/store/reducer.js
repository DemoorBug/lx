import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  focused: false
})

export default (state = defaultState, active) => {
  if (active.type === constants.FOCUSED) {
    return state.set('focused', true)
  }
  if (active.type === constants.FALSEFOCUSED) {
    return state.set('focused', false)
  }
  return state
}
