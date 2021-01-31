import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => ( // 첫 번째 게시글 #해시태그 #익스프레스
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i)=> {
      if (v.match(/(#[^\s#]+)/)) {
        return <Link href={`/hashtag/${v.slice(1)}`} key={i} ><a>{v}</a></Link>
        // key걊에 v를 주면 안되는 이유는, 누군가가 중복되는 해시태그 문구를 적었을 때
        // 중복될 수도 있으므로 그럼 key값의 역할을 제대로 하지 못하는 것이니
        // props에 i라는 데이터값도 넣어서 key값을 i로 불러오게 해준다.
      }
      return v;
    })}
    
  {/* 반복문 도는 대상과 해시태그와 일치하는지 match 함수으로 쓰기 */}
  </div>
);

PostCardContent.propTypes = { 
  postData: PropTypes.string.isRequired 
}

export default PostCardContent;