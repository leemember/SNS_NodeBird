import {Form, Input, Button} from 'antd';
import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
    //게시글 아이디가 있으면 그 아래에 댓글을 달 것이기 때문에 post를 불러갖고 왔다.
    const id = useSelector((state) => state.user.me?.id);

    const [commentText, onChangeCommentText] = useInput('');
    const onsubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText]);
    
    return (
        <Form onFinish={onsubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button style={{ position: 'absolute', right: 0, bottom: -40}} type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
        
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm;