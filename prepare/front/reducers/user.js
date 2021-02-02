import produce from 'immer';

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
  changeNicknameLoading : false, // 닉네임 변경 시도중
  changeNicknameDone : false,
  changeNicknameError : null,
  
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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';


const dummyUser = (data) => ({
  ...data,
  nickname : '이현주',
  id: 1,
  Posts: [{ id: 1}],
  Followings: [{nickname:'혀주'}, {nickname:'hj lee'}, {nickname: 'hjl'}],
  Followers: [{nickname:'혀주'}, {nickname:'hj lee'}, {nickname: 'hjl'}], 
  //팔로잉 팔로우 수가 3으로 늘음
})
//시퀄라이즈에서 합쳐주기 때문에 첫문자는 대문자로.


//어떤 요청이든 이렇게 세 가지 함수가 나온다. *요청 / 성공 / 실패
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

const reducer = (state = initialState, action ) => produce(state, (draft) => {
    //produce 이전에 return이 왜 없냐면 바로 => 화살표가 붙을 떄는 사용하지 않아두 된다.
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading=true;
        draft.logInError=null;
        draft.logInDone=false;
        break;

      case LOG_IN_SUCCESS:
        draft.logInLoading=false;
        draft.me = dummyUser(action.data);
        draft.logInDone=true;
        break;

      case LOG_IN_FAILURE:
        draft.logInLoading=false;
        draft.logInError=action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading=true;
        draft.logOutError=null;
        draft.logOutDone=false;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading=false;
        draft.logOutError=true;
        draft.me=null;
        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading=false;
        draft.logOutError=action.error;
        break;
        
      case SIGN_UP_REQUEST:
        draft.signUpLoading=true;
        draft.signUpDone=false;
        draft.signUpError=null;
        break;
        
      case SIGN_UP_SUCCESS:
        draft.signUpLoading=false;
        draft.signUpDone=true;
        break;

      case SIGN_UP_FAILURE:
        draft.signUpLoading=false;
        draft.signUpError=action.error;
        break;
        
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading=true;
        draft.changeNicknameDone=false;
        draft.changeNicknameError=null;
        break;

      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading=false;
        draft.changeNicknameDone=true;
        break;

      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading=false;
        draft.changeNicknameError=action.error;
        break;

      case ADD_POST_TO_ME :
        draft.me.Posts.unshift({ id: action.data });
        break;
        
      case REMOVE_POST_OF_ME :
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data );
        break;

      default:
        break;
      }
  });

export default reducer;