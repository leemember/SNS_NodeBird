import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, Popover, Avatar, Button} from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';

import PostImages from './PostImages';

const PostCard = ({ post }) => {
    const [ liked, setLiked ] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
        //토글 false를 true로 true를 false로 만들려면 이걸 기억해야한다.
        // false <=> true 이런 의미다. !붙히면 반대값이 나오기 때문에 토글 쓸 때 이 코드를 자주 쓸 것이다.
    }, []);

    const onToggleComment = useCallback(()=> {
        setCommentFormOpened((prev) => !prev);
    }, []);
    //위 두개의 toggle 함수에 들어있는 prev는 이전 데이터 기반으로 다음 데이터를 만드는 것이다.
    

    const id  = useSelector((state) => state.user.me?.id);
    //?. 이 문법은 옵셔널 체이닝 연산자이다. state.user.me?.id
    //?.는 있나 없나 의심되는 상황일 때 쓸 수 있다.

    return (
        <div style={{ marginBottom : 20}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                // actions로 Button기능도 불러왔다.
                 actions={[
                     <RetweetOutlined key="retweet"/>, //리트윗버튼
                        liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />, //좋아요버튼
                     <MessageOutlined key="comment" onClick={onToggleComment} />, // 메시지버튼
                    //  Popover는 마우스를 올렸을 때 여러가지 더보기 버튼이 뜬다.
                     <Popover key="more" content={(
                         <Button.Group>
                             {id && post.User.id === id 
                                ? (                             
                                // 아이디가 같으면 수정 삭제가 가능하고, 다르면 신고가 가능하게.
                                <>
                                    <Button>수정</Button>
                                    <Button type="danger">삭제</Button>
                                    {/* type을 danger로 하면 빨간색, primary로 하면 파란색이 된다. */}
                                    </>
                                    ) 
                                    : <Button>신고</Button>}
                         </Button.Group>
                     )}>
                         <EllipsisOutlined/> 
                         {/* 얘는 더보기 버튼이다. */}
                     </Popover>,
                 ]}
            >
                <Card.Meta 
                    avatar={<Avatar>{post.User.nickName[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>

            {commentFormOpened && (
                <div>
                    댓글 부분
                </div>
            )}

            {/* <CommentForm />
            <Comments /> */}
        </div>
    )
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
};
//post: PropTypes.object.isRequired, 이런식으로 해도 되는데
// 더 자세하게 쓰고 싶으면 shape를 쓰면 된다. (왠만하면 자세하게 쓰는 것이 더 좋음)
// arrayOf는 객체들의 배열이란 뜻이다.

export default PostCard;