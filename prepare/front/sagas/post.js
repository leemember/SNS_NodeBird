import { all, delay, put, takeLatest, fork} from "redux-saga/effects";
import { 
  ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
} from '../reducers/post';

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
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    })
  }  
}

// -------addComment---------
function addCommentAPI(data) {
  return axios.post('/api/post/${data.postId}/comment', data); 
}

function* addComment(action) {  
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    // 🤯 서버 구현하기 전까지 delay 사용하는걸로
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    })
  }  
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
  ])
}