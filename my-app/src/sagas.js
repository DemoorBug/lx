import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios'

function* fetchUser() {
  try {
    const { data: { data: datas } } = yield axios.get('http://localhost:3000/mock/index.json')
    yield put({
      type: 'getIndex_app',
      data: datas
    })
  } catch(e) {
    console.log(e, '网络请求失败')
  }
}

function* mySaga(action) {
  yield takeEvery("my-sagas", fetchUser);
}

export default mySaga;
