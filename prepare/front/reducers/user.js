export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {},
}

//로그인, 로그아웃은 user와 관련된 것이니 여기다가 분리해놓기.

export const loginAction = (data) => {
  return (dispatch) => {
    dispatch(loginRequestAction());
    axios.post('/api/login')
      .then(() => {
        dispatch(loginSuccessAction());
      })
      .catch(() => {
        dispatch(loginFailureAction());
      })
  }
}

//어떤 요청이든 이렇게 세 가지 함수가 나온다. *요청 / 성공 / 실패
// LOGIN-----------------------------------------
export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const loginSuccessAction = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

export const loginFailureAction = (data) => {
    return {
        type: 'LOG_IN_FAILURE',
        data,
    }
}

// LOGOUT-----------------------------------------

export const logoutRequestAction = () => {
    return {
        type: 'LOG_OUT_REQUEST'
        // 로그아웃은 데이터가 필요 없으니 DATA를 없애도 된다.
    }
}

export const logoutSuccessAction = () => {
    return {
        type: 'LOG_OUT_SUCCESS'
        // 로그아웃은 데이터가 필요 없으니 DATA를 없애도 된다.
    }
}

export const logoutFailureAction = () => {
    return {
        type: 'LOG_OUT_FAILURE'
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
            me: action.data
        }
    //로그아웃
    case 'LOG_OUT':
        return {
            ...state,
            isLoggedIn:false,
            me: null
        }
    default:
        return state;
    }
}

export default reducer;