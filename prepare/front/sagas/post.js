import { all, delay, put, takeLatest, fork} from "redux-saga/effects";
import axios from 'axios';

// -------addPost---------
function addPostAPI(data) {
  return axios.post('/api/post', data); 
}

function* addPost(action) {  
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    // 🤯 서버 구현하기 전까지 delay 사용하는걸로
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    })
  }  
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost)
  ])
}