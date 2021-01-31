import { all, fork, takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

// -------로그인---------
function logInAPI(data) {
  return axios.post('/api/login', data); 
}

//action 이 매개변수는, action.type하면 로그인 request가 나올거고 action.data하면 로그인 데이터가 있다.
function* logIn(action) {
  //요청이 항상 성공하는 것이 아니라 실패할 수도 있으니 실패한 상황도 try/catch문으로 만들어준다.
  try {
    console.log('saga login');
    //요청의 결과를 받다.
    //const result = yield call(logInAPI);
    yield delay(1000);
    // 🤯 서버 구현하기 전까지 delay 사용하는걸로
    yield put({
      type: 'LOG_IN_SUCCESS', //성공시
      data: action.data, //데이터를 받아온다.
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    })
  }  
}

// -------로그아웃---------
// 로그아웃은 매개변수 넣는 곳에 따로 필요한 데이터가 없다.

function logOutAPI() {
  return axios.post('/api/logOut'); 
}

function* logOut() {  
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    // 🤯 서버 구현하기 전까지 delay 사용하는걸로
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    })
  }  
}

//LOG_IN이란 액션이 실행되면 뒤에있는 logIn 제너레이터 함수가 실행되도록
function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
  ])
}