import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  //내가 팔로우 한 사람중에 포스트 작성자이면.
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        //팔로우 하고 있지 않으면 팔로우 요청을
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]); //본인이 팔로우 하고 있는 버튼을 눌렀을 시 언팔로우를 디스패치 (발생) 시켜준다.

  return (
    //팔로우 안한 사람만 언팔로우가 뜨게!
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.proTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
