// configureStore.js
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';

const configureStore = () => {
    const middlewares = [];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares)) // 배포용일 때는 devTool 연결 안함
        : composeWithDevTools(applyMiddleware(...middlewares))
        // 개발용일 때는 composeWithDevTools로 바꿔주면 된다.
    const store = createStore(reducer, enhancer);   
    return store;
    //store란 state와 reducer를 포함한 것
};

//두번재는 옵션 객체이다.
const wrapper = createWrapper(configureStore, { 
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;