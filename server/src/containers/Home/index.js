import React, {
  useEffect
} from 'react'
// const React = require('react')
import { connect } from 'react-redux'
import { setName } from './store/action'
import {
  Link
} from 'react-router-dom';

const Home = function (props) {
  const { home, dispatch, data } = props
  useEffect(() => {
    if (!home.data.length) {
      dispatch(setName())
    }
  }, [])
  return (
    <div>
      <div>ashis is { home.name } Lee</div>
      {
        home.data && home.data.map(dt => {
          return (
            <div key={dt.id}>{dt.title}</div>
          )
        })
      }
    </div>
  )
}

Home.getSomeData = (store) => {
  return store.dispatch(setName())
}

const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// module.exports = {
//   default: Home
// }
