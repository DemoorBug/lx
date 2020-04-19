export const setName = function () {
  return (dispatch, getState, instanceAxios) => {
    const state = getState().home
      // return axios.get('http://192.168.0.2:3000/news.json')
      // let url = ''
      // const axiosNew = server ? instanceServer : instanceClient
      return instanceAxios().get('/api/news.json')
      .then(json => {
        dispatch({
          type: 'SETNAME',
          payload: {
            ...state,
            data: json.data.data
          }
        })
      })
  }
}
