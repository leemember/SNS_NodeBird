import shortId from 'shortid';

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
      {src: 'https://usercontents-c.styleshare.io/images/38020339/640x-',},
      {src: 'https://cdn.fanzeel.com/images/201906/5cff5ddc67935.jpg',},
      {src: 'https://t1.daumcdn.net/cfile/tistory/1122D22F4C691BB395',},
  ],
  Comments: [{
    User: {
        nickname: 'hyunju'
    },
    content: '우와 재밌겠군요~',
  }, {
    User: {
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
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

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
  id:shortId.generate(),
  content: data,
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

const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      };
      case ADD_POST_SUCCESS:
        return {
          ...state,
          mainPosts: [dummyPost(action.data), ...state.mainPosts],
          addPostLoading: false,
          addPostDone: true
        };
        case ADD_POST_FAILURE:
          return {
            ...state,
            addPostLoading: false,
            addPostError: action.error,
          };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null
      };
      case ADD_COMMENT_SUCCESS: {
        const postIndex = state.mainPosts.findIndex((v)=> v.id === action.data.postId);
        const post = { ...state.mainPosts[postIndex]  };
        post.Comments = [dummyComment(action.data.content), ...post.Comments];
        const mainPosts = [...state.mainPosts];
        mainPosts[postIndex] = post;
        return {
          ...state,
          mainPosts,
          addCommentLoading: false,
          addCommentDone: true
        };
      }
      case ADD_COMMENT_FAILURE:
        return {
          ...state,
          addCommentLoading: false,
          addCommentError: action.error,
        };
      default:
        return state;
  }
}

export default reducer;

//이렇게 미리 리듀서 데이터부터 구성하고 ~ 액션 구성하고~~ 화면 구성하면 된다.
//처음에 서버 개발자랑 리덕스 데이터 구조를 협의 해야한다.