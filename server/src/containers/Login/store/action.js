// export const ACTION_HEADER_INFO = 'HEADER_INFO'
export const ACTION_LOGIN_GET = 'LOGIN_GET'

const changelist = (list) => ({
  type: ACTION_LOGIN_GET,
  payload: list
})

export const loginGet = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance('3333').get('/ssr/translations')
      .then(res => {
        dispatch(changelist(res.data.data))
      })
  }
}
