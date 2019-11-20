import React, {
  Fragment
} from 'react'
import Header from './Header';
import {
  renderRoutes
} from 'react-router-config';
import {
  action
} from './Header/store/';

const App = function (props) {

  return (
    <Fragment >
      <Header />
      {renderRoutes(props.route.routes)}
    </Fragment >
  )
}

App.loadData = (store) => {
  return store.dispatch(action.headerInfo())
}

export default App
