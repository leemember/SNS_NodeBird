import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

export const initialState = {
  mainPosts: [],
  imagePaths: [], // 이미지 업로드 할 때 이미지 경로들이 저장되는 곳이다.
  hasMorePost: true, //데이터를 더이상 불러올 게 없을 때 

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  addCommentLoading: false, 
  addCommentDone: false,
  addCommentError: null,

  removePostLoading: false, 
  removePostDone: false,
  removePostError: null,
}

//인피니트 스크롤링. 스크롤을 내릴 때마다 새로운 게시물이 나타나도록 하는 기능이다.
//반복문으로 faker를 사용해서 이름을 지어낸다.
export const generateDummyPost = (number) => Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image(),
  }],
  Comments: [{
    User: {
      id : shortId.generate(),
      nickname: faker.name.findName()
    },
    content: faker.lorem.sentence(),
  }],
}))

//화면 로딩
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

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

// immer : 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성은 지키면서)
const reducer = (state = initialState, action ) => produce(state, (draft) => {
  switch (action.type) {

    //로딩
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;

    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = action.data.concat(draft.mainPosts);
      draft.hasMorePosts = draft.mainPosts.length < 50; 
      // 50개보다 적으면 true 50개보다 많으면 false. 그러니 딱 50개만 보겠다는 뜻이다.
      break;

    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;

    //포스트 추가
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;

    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
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