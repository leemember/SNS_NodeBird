import { HYDRATE } from 'next-redux-wrapper';

// 중앙 저장소 = 리덕스
const initialState = {
    // 예시 2
    user : {
        isLoggedIn: false,
        user: null,
        signUpDate: {},
        loginData: {},
    },
    post : {
        mainPosts: [],
    }
}
// 위에같은 초기값 state를 바꾸고 싶으면 action을 만들어서 밑에 데이터 값으로 바꿔준다.

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction = () => {
    return {
        type: 'LOG_OUT'
        // 로그아웃은 데이터가 필요 없으니 DATA를 없애도 된다.
    }
}

// (이전상태, 액션) => 다음상태 | 이전상태와 액션을 통해서 다음상태를 만들어 낸다.
// 액션 하나 만들 때마다 CASE문이 계속 길어지는데 이런 점도 리듀서를 쪼갤 수가 있다.
const rootReducer = (state = initialState, action ) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return {...state, ...action.payload};
        //로그인
        case 'LOG_IN':
            return {
                ...state,                
                user: {
                    ...state.user,
                    isLoggedIn:true,
                    user: action.data
                }
            }
        //로그아웃
        case 'LOG_OUT':
            return {
                ...state,                
                user: {
                    ...state.user,
                    isLoggedIn:false,
                    user: null
                }
            }
            default:
                return state;
      }
};

export default rootReducer;