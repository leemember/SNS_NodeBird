import { all, call, folk, put, take, } from 'redux-saga/effects';
// 항상 이펙트 앞에서는 yeild를 붙혀줘야한다. 그리고 yeild는 await과 비슷하다.
import axios from 'axios';
import { addPost } from '../reducers/post';



// -------로그인---------
function logInAPI(data) {
  return axios.post('/api/login', data); 
}

//action 이 매개변수는, action.type하면 로그인 request가 나올거고 action.data하면 로그인 데이터가 들어있을 것이다.
function* logIn(action) {
  //요청이 항상 성공하는 것이 아니라 실패할 수도 있으니 실패한 상황도 try/catch문으로 만들어준다.
  try {
    //call로 불러와주는 logInAPI 얘는 제너레이터 함수가 아니어서 *붙히면 큰일난다.
    //요청의 결과를 받다.
    const result = yield call(logInAPI, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS', //성공시
      data: result.data, //데이터를 받아온다.
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    })
  }  
}
// put: 디스패치 해주는 기능, 액션을 디스패치 해줌

// -------로그아웃---------
// 로그아웃은 매개변수 넣는 곳에 따로 필요한 데이터가 없다.

function logOutAPI() {
  return axios.post('/api/logOut'); 
}

function* logOut() {  
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    })
  }  
}

// -------addPost---------
function addPostAPI(data) {
  return axios.post('/api/post', data); 
}

function* addPost(action) {  
  try {
    const result = yield call(addPostAPI, action.data);
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

//LOG_IN이란 액션이 실행되면 뒤에있는 logIn 제너레이터 함수가 실행되도록
function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn);
  //요청을 하나 로그인하나 같은거라구함.
}
//take : LOG_IN이라는 액션이 실행될 때까지 기다리겠다는 뜻이다.

function* watchLogOut() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  //saga에는 제너레이터 함수를 사용한다. function 뒤에 * 붙는 것으로 시작

  //all : 배열에 들어있는 것들을 동시에 실행해준다. 
  //folk, call : 함수를 실행한다는 뜻. 차이점은 folk는 비동기 함수 호출, call은 동기 함수 호출
  yield all([
    fork(watchLogIn), //call로도 사용할 수 있다.
    folk(watchLogOut),
    folk(watchAddPost),
  ])
}