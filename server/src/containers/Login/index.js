import React, {
  useEffect
} from 'react'
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux'
import {
  action
} from './store'
import {
  Redirect
} from 'react-router-dom';

const List = (props) => {
  const {
    title
  } = props
  return (
    <div>{title}</div>
  )
}

const Login = function (props) {
  const { list, dispatch, login } = props
  console.log(list);
  useEffect(() => {
    if (!list.length) {
      dispatch(action.loginGet())
    }
  }, [])

  return login ? (
    <div>
      {
        list.map(({id, title}) => (
          <List
            key={id}
            title={title}
          />
        ))
      }
    </div>
  ) : <Redirect to='/'/>
}

Login.loadData = (store) => {
  return store.dispatch(action.loginGet())
}
const mapStateToProps = (state) => {
  return {
    ...state.login,
    ...state.header
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
