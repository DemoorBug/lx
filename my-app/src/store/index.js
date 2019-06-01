import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer';
import mySaga from '../sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
);
const store = createStore(
  reducer,
  enhancer
);
sagaMiddleware.run(mySaga)
export default store;
