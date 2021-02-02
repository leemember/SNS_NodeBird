import axios from 'axios';
import shortId from 'shortid';
import { all, delay, put, takeLatest, fork} from "redux-saga/effects";
import { 
  ADD_POST_SUCCESS, 
  ADD_POST_FAILURE, 
  ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS, 
  ADD_COMMENT_FAILURE, 
  ADD_COMMENT_REQUEST,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
} from '../reducers/post';

import { ADD_POST_TO_ME , REMOVE_POST_OF_ME} from '../reducers/user';

/*
  🎀 사가는 동시에 여러 액션을 디스패치 할 수 있기 때문에
  어떤 동작이 여러 리듀서의 데이터를 동시에 수정해야 한다면, 액션을 여러번 호출해주면 된다.  
*/

// -------addPost---------
function addPostAPI(data) {
  return axios.post('/api/post', data); 
}

function* addPost(action) {  
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    // 🤯 서버 구현하기 전까지 delay 사용하는걸로
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      }
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    })
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    })
  }  
}

// -------removePost---------
function removePostAPI(data) {
  return axios.delete('/api/post', data); 
}

function* removePost(action) {  
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    }); // 포스트 리듀서상태와
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    }); // 유저 리듀서 상태와 동시에 바꿔준다.
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
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
      data: action.data,
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

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ])
}