import React, { useEffect } from 'react'; 
import Head from 'next/head';
import {useSelector} from 'react-redux';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';


const Profile = () => {
  const { me } = useSelector((state) => state.user);

  //이걸 안해주면 로그인 안한상태에서 프로필을 누를 때 에러가 발생한다.
  useEffect(() => {
  if (! (me && me.id)) {
    Router.push('/')
    }
  }, [me && me.id]);

  if(!me) {
    return null;
  }
  return (
    <>
      <Head>
          <title>내 프로필 | NodeBird</title>
      </Head>

      <AppLayout>
          <NicknameEditForm />
          <FollowList header="팔로잉 목록" data={me.Followings}/>
          <FollowList header="팔로워 목록" data={me.Followers}/>
      </AppLayout>
    </>
  )
};

export default Profile;