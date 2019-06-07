import { combineReducers } from 'redux-immutable';
import { reducer } from '../common/header/store';

export default combineReducers({
  header: reducer
})
