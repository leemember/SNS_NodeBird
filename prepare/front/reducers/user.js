export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
}

//로그인, 로그아웃은 user와 관련된 것이니 여기다가 분리해놓기.
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

const reducer = (state = initialState, action ) => {
switch (action.type) {
    //로그인
    case 'LOG_IN':
        return {
            ...state,
            isLoggedIn:true,
            user: action.data
        }
    //로그아웃
    case 'LOG_OUT':
        return {
            ...state,
            isLoggedIn:false,
            user: null
        }
    default:
        return state;
    }
}

export default reducer;