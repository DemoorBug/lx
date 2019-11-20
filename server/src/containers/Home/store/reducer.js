const defaultState = {
  name: 'Home reducer',
  data: []
}

const reducer = (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SETNAME':
      return payload
      break;
    default:

  }

  return state
}

export default reducer
