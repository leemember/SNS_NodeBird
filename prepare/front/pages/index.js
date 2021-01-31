import React from 'react'; 
import { useSelector } from 'react-redux';
//Next는 이 구문이 필요가 없다 ! Good 👍
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    return(
        <AppLayout>
            {/* 로그인 한 사람들만 볼 수 있게 처리하기 */}
            {isLoggedIn && <PostForm /> }
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