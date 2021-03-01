import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
// 항상 이펙트 앞에서는 yeild를 붙혀줘야한다. 그리고 yeild는 await과 비슷하다.

import postSaga from './post';
import userSaga from './user';

// 이렇게 base를 이 주소로 했기 때문에 기본적으로 이 포트번호가 붙는다.
axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}