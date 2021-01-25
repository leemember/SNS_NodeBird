// configureStore.js
import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';
import reducer from '../reducers';

const configureStore = () => {
    const store = createStore(reducer);
    store.dispatch({
        type:'CHANGE_NICKNAME',
        data: 'hyunjulee'
    })
    return store;
    //store란 state와 reducer를 포함한 것
};

//두번재는 옵션 객체이다.
const wrapper = createWrapper(configureStore, { 
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;