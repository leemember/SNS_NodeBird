import shortId from 'shortid';
import produce from 'immer';

export const initialState = {
  mainPosts: [{
    //이 부분은 프론트가 백엔드한테 어떤식으로 개발 한건지 물어보고 협업하는 것이 좋다.
    id: 1,
    User: {
      id: 1,
      nickname: '현주리',
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images: [
      {
        id : shortId.generate(),
        src: 'https://usercontents-c.styleshare.io/images/38020339/640x-',},
      {
        id : shortId.generate(),
        src: 'https://cdn.fanzeel.com/images/201906/5cff5ddc67935.jpg',},
      {
        id : shortId.generate(),
        src: 'https://t1.daumcdn.net/cfile/tistory/1122D22F4C691BB395',},
  ],
  Comments: [{
    id : shortId.generate(),
    User: {
      id : shortId.generate(),
      nickname: 'hyunju'
    },
    content: '우와 재밌겠군요~',
  }, {
    id : shortId.generate(),
    User: {
      id : shortId.generate(), //대문자로 되어있는 애들은 서버에서 주는 애들이라 아이디가 고유하게 붙어있다.
      nickname: 'lee',
    },
    content: '멋있네요'
  }]
  //왜 id랑 conent는 앞에 글자가 소문자인데 그 나머지들은 왜 대문자냐면 이것은 시퀄라이즈와 연관이 있다.
  // 다른 정보와 관련이 있는 데이터면 그 정보를 한 번에 합쳐준다. 합쳐줄 때는 대문자가 되어 나온다.
  }],
  imagePaths: [], // 이미지 업로드 할 때 이미지 경로들이 저장되는 곳이다.
  addPostLoading: false, // 게시될 것들이 추가가 완료됐을 때
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false, 
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false, 
  removePostDone: false,
  removePostError: null,
}

//게시글 추가
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

//삭제
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

//댓글구현
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


// 액션 이름을 상수로 빼주면 좋은 것이 타입과 케이스에 그대로 재활용 할 수 있다. 중간에 오타날 경우를 예방 함.
export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
})

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

//이렇게하면 동적으로 만들 수 있다. data함수로 만듬
const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname:'현주리',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id:shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname:'현주리',
  },
});

// immer : 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성은 지키면서)
const reducer = (state = initialState, action ) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;

    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(dummyPost(action.data));
      break;

    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;


    // 삭제
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;

    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;

    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;

    // 댓글
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;

    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId); // 객체때문에 {} 괄호 사용
      post.Comments.unshift(dummyComment(action.data.content));
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }

    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;

    default:
      break;
  }
})

export default reducer;

//이렇게 미리 리듀서 데이터부터 구성하고 ~ 액션 구성하고~~ 화면 구성하면 된다.
//처음에 서버 개발자랑 리덕스 데이터 구조를 협의 해야한다.