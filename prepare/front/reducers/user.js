export const initialState = {
  logInLoading : false, // 로그인 시도중
  logInDone : false,
  logInError : null,
  logOutLoading : false, // 로그아웃 시도중
  logOutDone : false,
  logOutFailure : null,
  signUpLoading : false, // 회원가입 시도중
  signUpDone : false,
  signUpFailure : null,
  
  me: null,
  signUpData: {},
  loginData: {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SING_UP_REQUEST = 'SING_UP_REQUEST';
export const SING_UP_SUCCESS = 'SING_UP_SUCCESS';
export const SING_UP_FAILURE = 'SING_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

//어떤 요청이든 이렇게 세 가지 함수가 나온다. *요청 / 성공 / 실패
// LOGIN-----------------------------------------
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST
    // 로그아웃은 데이터가 필요 없으니 DATA를 없애도 된다.
  }
}

const reducer = (state = initialState, action ) => {
switch (action.type) {

  //로그인
  case LOG_IN_REQUEST:
    return {
        ...state,
        logInLoading:true,
        logInError:null,
        logInDone: false
    };

  case LOG_IN_SUCCESS:
    return {
      ...state,
      logInLoading: false,
      logInDone:true,
      me: {...action.data, nickname: 'hyunjulee'}, //더미데이터
    };

  case LOG_IN_FAILURE:
    return {
      ...state,
      logInLoading: false,
      logInError:false,
    }

  //----------------------------
  //로그아웃
  case LOG_OUT_REQUEST:
    return {
      ...state,
      isLoggingOut:true,
    }
  case LOG_OUT_SUCCESS:
    return {
      ...state,
      isLoggingOut:false,
      isLoggedIn:false,
      me: null
    }
  case LOG_OUT_FAILURE:
    return {
      ...state,
      isLoggingOut:false, // 요청이 끝났으니까 false
    }
  default:
    return state;
  }
}

export default reducer;