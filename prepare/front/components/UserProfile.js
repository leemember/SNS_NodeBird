import React, { useCallback } from 'react';
import {Card, Avatar, Button} from 'antd';

const UserProfile = ({ setIsLoggedIn }) => {
    const onLogOut = useCallback(() => {
        setIsLoggedIn(false);
    }, []);
    //로그아웃 누르면 풀리게하는 동작


    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />0</div>,
                <div key="follwings">팔로잉<br />0</div>,
                <div key="follwings">팔로워<br />0</div>
            ]}
        >
            <Card.Meta 
                avatar={<Avatar>HJ</Avatar>}
                title="hyunju"
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;