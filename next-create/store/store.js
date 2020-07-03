import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'


const initialState = {
  count: 2,
}

const useInitialState = {
  usename: 'lilei'
}

const ADD = 'ADD'
function reducer(state = initialState, action) {
  const { count, type } = action
  switch (type) {
    case ADD:
      return { ...initialState, count }
    default:
      return state
  }
}

const UPDATE = 'UPDATE'
function useInitReducer(state = useInitialState, action) {
  const { usename, type } = action;
  switch (type) {
    case UPDATE:
      return {
        ...state,
        usename
      }
    default:
      return state
  }
}

const allReducers = combineReducers({
  reducer,
  useInitReducer
})

//
// store.dispatch({
//   type: UPDATE,
//   usename: 'helo'
// })
//
// function addAsync (num) {
//   return (dispatch, getState) => {
//     setTimeout(() => {
//       dispatch({
//         type: ADD,
//         count: num
//       })
//     }, 1000)
//   }
// }
// store.dispatch({
//   type: ADD,
//   count: 10
// })
//
// store.dispatch(addAsync(15))

export default (state) => {
  const store =
    createStore(allReducers, Object.assign({}, {
      reducer: initialState,
      useInitReducer: useInitialState
  }, state), applyMiddleware(reduxThunk))
  return store
}
