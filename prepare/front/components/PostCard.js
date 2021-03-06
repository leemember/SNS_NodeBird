import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Popover, Avatar, Button, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone, PlusOutlined } from '@ant-design/icons';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post); //로딩창 돌아가게 하기
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
    //토글 false를 true로 true를 false로 만들려면 이걸 기억해야한다.
    // false <=> true 이런 의미다. !붙히면 반대값이 나오기 때문에 토글 쓸 때 이 코드를 자주 쓸 것이다.
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  //위 두개의 toggle 함수에 들어있는 prev는 이전 데이터 기반으로 다음 데이터를 만드는 것이다.

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const id = useSelector((state) => state.user.me?.id);
  //?. 이 문법은 옵셔널 체이닝 연산자이다. state.user.me?.id
  //?.는 있나 없나 의심되는 상황일 때 쓸 수 있다.

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        // actions로 Button기능도 불러왔다.
        actions={[
          <RetweetOutlined key="retweet" />, //리트윗버튼
          liked ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} /> : <HeartOutlined key="heart" onClick={onToggleLike} />, //좋아요버튼
          <MessageOutlined key="comment" onClick={onToggleComment} />, // 메시지버튼
          //  Popover는 마우스를 올렸을 때 여러가지 더보기 버튼이 뜬다.
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  // 아이디가 같으면 수정 삭제가 가능하고, 다르면 신고가 가능하게.
                  <>
                    <Button>수정</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
                    {/* type을 danger로 하면 빨간색, primary로 하면 파란색이 된다. */}
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
            {/* 얘는 더보기 버튼이다. */}
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />} // 로그인을 해야 팔로우버튼이 보이게하려면 id && 넣어주기.
      >
        <Card.Meta avatar={<Avatar>{post.User.nickname[0]}</Avatar>} title={post.User.nickname} description={<PostCardContent postData={post.content} />} />
      </Card>

      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          {/* 게시글의 아이디를 받아와야하기 때문에 post를 넘겨주었다. */}
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment author={item.nickname} avatar={<Avatar>{item.User.nickname[0]}</Avatar>} content={item.content} />
              </li>
            )}
          />
        </div>
      )}

      {/* <CommentForm />
  <Comments /> */}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
//post: PropTypes.object.isRequired, 이런식으로 해도 되는데
// 더 자세하게 쓰고 싶으면 shape를 쓰면 된다. (왠만하면 자세하게 쓰는 것이 더 좋음)
// arrayOf는 객체들의 배열이란 뜻이다.

export default PostCard;
