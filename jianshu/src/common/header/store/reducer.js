import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  focused: false,
  list: [],
  page: 0,
  pageAll: 1,
  mouseIn: false
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.FOCUSED :
      return state.set('focused', true);
    case constants.FALSEFOCUSED :
      return state.set('focused', false);
    case constants.CHANGE_LIST :
      return state.merge({
        list: action.data,
        pageAll: action.length
      });
    case constants.MOUSEENTER :
      return state.set('mouseIn', true);
    case constants.MOUSELEAVE :
      return state.set('mouseIn', false);
    case constants.PAGE_CHANGE :
      return state.set('page', action.page)
    default :
      return state;
  }
}
