import {Form, Input, Button} from 'antd';
import React, { useCallback , useEffect} from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    //게시글 아이디가 있으면 그 아래에 댓글을 달 것이기 때문에 post를 불러갖고 왔다.
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    
    useEffect(() => {
      if (addCommentDone) {
        setCommentText('');
      }
    }, [addCommentDone]);

    const onsubmitComment = useCallback(() => {
        dispatch({
          type: ADD_COMMENT_REQUEST,
          data: { content: commentText, postId:post.id, userId: id},
        });
    }, [commentText, id]);
    //재사용될거면 나중에 함수로 빼두면 되고, 이 컴포넌트에서만 쓸꺼면 액션객체 하나로 넣는것도 방법.
    return (
        <Form onFinish={onsubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button 
                style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 10}} 
                type="primary" 
                htmlType="submit"
                loading={addCommentLoading}
                >삐약</Button>
            </Form.Item>
        </Form>
        
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm;