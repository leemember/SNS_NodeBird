import { Button, Card, Popover } from 'antd';
import React from 'react';
import { Card, Popover, ButtonGroup, Button} from 'antd';
import { RetweetOutlined, HearOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design';
import ButtonGroup from 'antd/lib/button/button-group';
import { useSelector } from 'react-redux';

const PostCard = ({ post }) => {
    const {me}  = useSelector((state) => state.user);
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages Images={post.Images} />}
                // actions로 Button기능도 불러왔다.
                 actions={[
                     <RetweetOutlined key="retweet"/>, //리트윗버튼
                     <HearOutlined key="heart"/>, //좋아요버튼
                     <MessageOutlined key="comment"/>, // 메시지버튼
                    //  Popover는 마우스를 올렸을 때 여러가지 더보기 버튼이 뜬다.
                     <Popover key="more" content={(
                         <ButtonGroup>
                             {/* 내가 쓴 글이면 수정 삭제가 가능하게 하는법 */}
                             <Button>수정</Button>
                             <Button type="danger">삭제</Button>
                             {/* type을 danger로 하면 빨간색, primary로 하면 파란색이 된다. */}


                             <Button>신고</Button>
                         </ButtonGroup>
                     )}>
                         <EllipsisOutlined/> 
                         {/* 얘는 더보기 버튼이다. */}
                     </Popover>
                 ]}
            >
                <Image />
                <Content />
            </Card>

            <CommentForm />
            <Comments />
        </div>
    )
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostCard;