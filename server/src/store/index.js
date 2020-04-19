import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as HomeReducer } from '../containers/Home/store'
import { reducer as HeaderReducer } from '../containers/Header/store';
import { reducer as LoginReducer } from '../containers/Login/store';
import {
  instanceClient,
  instanceServer
} from '../client/request.js';

const reducer = combineReducers({
  home: HomeReducer,
  header: HeaderReducer,
  login: LoginReducer
})
export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(instanceServer)))
}

export const getClientStore = () => {
  const defaultState = window.context.state
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(instanceClient)))
}
