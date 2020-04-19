import React, {
  useCallback
} from 'react'
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux'

import {
  action
} from './store';

const Header = function (props) {
  const { login, dispatch } = props

  const handlogin = useCallback(() => {
    dispatch(action.login())
  }, [])
  const handlogout = useCallback(() => {
    dispatch(action.logout())
  }, [])
  return (
    <div>
      <Link to="/">Home</Link>
      {
        login ?
          <>
            <Link to="/login">翻译列表</Link>
            <div onClick={handlogout}>退出</div>
          </>
          :
          <div onClick={handlogin}>login</div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return state.header
}

const mapDispatchToProps = dispatch => ({
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
