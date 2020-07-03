// export const ACTION_HEADER_INFO = 'HEADER_INFO'
export const ACTION_CHANGE_LOGIN = 'CHANGE_LOGIN'

export const headerInfo = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance('3333').get('/ssr/isLogin')
      .then(res => {
        // console.log(res);
        dispatch(changeLogin(res.data.data.login))
      })
  }
}

export const login = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance('3333').get('/ssr/login')
      .then(res => {
        dispatch(changeLogin(res.data.data.login))
      })
  }
}

export const logout = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance('3333').get('/ssr/logout')
      .then(res => {
        dispatch(changeLogin(false))
      })
  }
}

export const changeLogin = (login) => {
  return {
    type: ACTION_CHANGE_LOGIN,
    payload: login
  }
}
