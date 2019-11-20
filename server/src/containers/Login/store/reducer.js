const defaultState = {
  list: []
}

import {
  ACTION_LOGIN_GET
} from './action';

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_LOGIN_GET:
      return {
        list: payload
      }
    default:
      return state
  }

}
