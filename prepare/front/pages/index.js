import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
//Next는 이 구문이 필요가 없다 ! Good 👍
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);

  //컴포넌트 마운트 역할
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, []);
  //메인 페이지를 불러올 때, 바로 LOAD_POST_REQUEST 이 요청이 호출될 것이다.

  //스크롤 내려서 거의 끝까지 갔을때 다시 로딩하게 하기
  //스크롤 내 위치 파악하기위해 onScroll 함수 만들기
  useEffect(() => {
    function onScroll() {
      //scrollY : 얼마나 내렸는지
      //clientHeight : 화면 보이는 길이
      //scrollHeight : 총 길이
      //끝까지 내렸을 때 게시물을 더 보이게 하고싶다면
      //현재 스크롤 위치와 화면이 보이는 길이가 총길이와 같을 때의 조건문을 작성한다.
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({ // 같을 때 발생시키기.
            type: LOAD_POSTS_REQUEST,
            });
        }
      }
    }
    //useEffect에서 항상 조심해야 할 것은 addEventListener를 할 때 꼭 return값을 넣어줘야한다.
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePosts, loadPostsLoading]);

  return(
    <AppLayout>
      {/* 로그인 한 사람들만 볼 수 있게 처리하기 */}
      { me && <PostForm /> }
      {mainPosts.map((post) => <PostCard key={post.id} post={post}/>)}
      {/* 이렇게 map인 반복 배열로 작업하는 것이면 key값이 필요한데
      이것은 안티 패턴중 하나다. 데이터가 계속 바뀔 수 있는것 !
      그러므로 index를 key값으로 두면 안된다.
      post에 id값을 넣어뒀기 때문에 고유의 값인 post중 id를 key값으로 따오면된다.
      */}
    </AppLayout>
  );
};

export default Home;