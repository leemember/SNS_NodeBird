export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isLoggedIn: false,
  isLoggingOut: false, // 로그아웃 시도중
  me: null,
  signUpData: {},
  loginData: {},
}

//어떤 요청이든 이렇게 세 가지 함수가 나온다. *요청 / 성공 / 실패
// LOGIN-----------------------------------------
export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  }
}

export const logoutRequestAction = () => {
  return {
    type: 'LOG_OUT_REQUEST'
    // 로그아웃은 데이터가 필요 없으니 DATA를 없애도 된다.
  }
}

const reducer = (state = initialState, action ) => {
switch (action.type) {
  //로그인
  case 'LOG_IN_REQUEST':
    console.log('리듀서 login');
    return {
        ...state,
        isLoggingIn:true,
    }
  case 'LOG_IN_SUCCESS':
    return {
      ...state,
      isLoggingIn: false,
      isLoggedIn:true,
      me: {...action.data, nickname: 'hyunjulee'},
    }
  case 'LOG_IN_FAILURE':
    return {
      ...state,
      isLoggingIn: false,
      isLoggedIn:false,
    }

  //----------------------------
  //로그아웃
  case 'LOG_OUT_REQUEST':
    return {
      ...state,
      isLoggingOut:false,
    }
  case 'LOG_OUT_SUCCESS':
    return {
      ...state,
      isLoggingOut:false,
      isLoggedIn:false,
      me: null
    }
  case 'LOG_OUT_FAILURE':
    return {
      ...state,
      isLoggingOut:false, // 요청이 끝났으니까 false
    }
  default:
    return state;
  }
}

export default reducer;