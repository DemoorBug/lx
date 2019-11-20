const defaultState = {
  login: false
}

import {
  ACTION_CHANGE_LOGIN
} from './action';

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_CHANGE_LOGIN:
      return {
        login: payload
      }
    default:
      return state
  }

}
