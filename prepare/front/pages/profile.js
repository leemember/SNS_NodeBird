import React from 'react'; 
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';


const Profile = () => {
  // 더미데이터
    const followingList = [{nickname: '이현주'}, {nickname: '사과'}, {nickname: '애플'}];
    const followerList = [{nickname: '이현주'}, {nickname: '사과'}, {nickname: '애플'}];

    return (
      <>
        <Head>
            <title>내 프로필 | NodeBird</title>
        </Head>

        <AppLayout>
            <NicknameEditForm />
            <FollowList header="팔로잉 목록" data={followingList}/>
            <FollowList header="팔로워 목록" data={followerList}/>
        </AppLayout>
      </>
        
    )
    
    
};

export default Profile;