import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from '../components/UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
    vertical-align : middle;
`;

const AppLayout = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>

                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>

                <Menu.Item>
                    <SearchInput enterButton />
                </Menu.Item>

                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>

            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile/> : <LoginForm />}
                    {/* 로그인 되면 프로필을 보여줄거고, 로그인이 안되어있으면 로그인 폼을 보여줌 */}
                </Col>

                <Col xs={24} md={12}>
                    {children}
                </Col>

                <Col xs={24} md={6}>
                    <a href="https://github.com/leemember" target="_blank" rel="noreferrer noopener">Made by HYUNJULEE</a>
                </Col>
            </Row>            
        </div>
    ); 
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;