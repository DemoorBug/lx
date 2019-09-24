import React from 'react'
import { connect } from 'react-redux'
import './App.css'

import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

function App(props) {
  return (
    <div>
      <Nav />
      <List />
      <Bottom />
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
