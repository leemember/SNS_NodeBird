// configureStore.js
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

//액션이 디스패치 되는 것들을 로깅해주는 (?)
//항상 미들웨어는 3단 고차함수를 사용한다. 
//인자 -> next -> action
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action); // 액션을 실행하기 전에 콘솔로 한 번 찍어주기 = 이게 바로 미들웨어
  return next(action);
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); 
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares)) // 배포용일 때는 devTool 연결 안함
      : composeWithDevTools(applyMiddleware(...middlewares))
      // 개발용일 때는 composeWithDevTools로 바꿔주면 된다.
  const store = createStore(reducer, enhancer);   
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
  //store란 state와 reducer를 포함한 것
};

//두번재는 옵션 객체이다.
const wrapper = createWrapper(configureStore, { 
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;