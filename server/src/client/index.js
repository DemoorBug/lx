import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import Routes from '../Routes.js'
import { getClientStore } from '../store'

const store = getClientStore()
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        {renderRoutes(Routes)}
      </Router>
    </Provider>
  )
}
// 做同构的话用hydrate
ReactDom.hydrate(<App/>, document.getElementById('root'))
