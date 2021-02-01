export const initialState = {
  logInLoading : false, // 로그인 시도중
  logInDone : false,
  logInError : null,
  logOutLoading : false, // 로그아웃 시도중
  logOutDone : false,
  logOutError : null,
  signUpLoading : false, // 회원가입 시도중
  signUpDone : false,
  signUpError : null,
  
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

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = (data) => ({
  ...data,
  nickname : '이현주',
  id: 1,
  Posts: [],
  Follwings: [],
  Follwers: [],
})
//시퀄라이즈에서 합쳐주기 때문에 첫문자는 댓문자로.


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
    type: SIGN_UP_REQUEST,
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
      me: dummyUser(action.data),
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
      logOutLoading:true,
      logOutDone:false,
      logOutError: null,
    }
  case LOG_OUT_SUCCESS:
    return {
      ...state,
      logOutLoading:false,
      logOutDone:true,
      me: null
    }
  case LOG_OUT_FAILURE:
    return {
      ...state,
      logOutLoading:false, // 요청이 끝났으니까 false
      logOutError: action.error,
    }
  //----------------------------
  //SIGNUP 회원가입
  case SIGN_UP_REQUEST:
    return {
      ...state,
      signUpLoading:true,
      signUpDone:false,
      signUpError: null,
    }
  case SIGN_UP_SUCCESS:
    return {
      ...state,
      signUpLoading:false,
      signUpDone:true,
    }
  case SIGN_UP_FAILURE:
    return {
      ...state,
      signUpLoading:false, // 요청이 끝났으니까 false
      signUpError: action.error,
    }
  default:
    return state;
  }
}

export default reducer;