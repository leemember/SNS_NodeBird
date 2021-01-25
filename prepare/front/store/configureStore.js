// configureStore.js
import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';

const configureStore = () => {
    const store = createStore(reducer, enhancer);
    return store;
};

//두번재는 옵션 객체이다.
const wrapper = createWrapper(configureStore, { 
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;