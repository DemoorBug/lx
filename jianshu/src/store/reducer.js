import { combineReducers } from 'redux-immutable';
import { reducer as header } from '../common/header/store';
import { reducer as topic } from '../pages/home/store'

export default combineReducers({
  header,
  topic
})
