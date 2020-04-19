import { put ,takeEvery } from 'redux-saga/effects';
import { constants, actionCreators } from './common/header/store'
import axios from 'axios'

function* fetchUser(action) {
  try {
    const { data : { data } } = yield axios.get('/mock/search.json')
    yield put(actionCreators.change_list(data))
  } catch (e) {
    console.log(e)
  }
}

function* mySaga() {
  yield takeEvery(constants.AJAXSERCH, fetchUser)
}

export default mySaga
