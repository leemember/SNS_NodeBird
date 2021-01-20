// 페이지에 공통되는 것 들을 처리하면 된다
import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';

const NodeBird = ({ Component }) => {
    return (        
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>NodeBird</title>
            </Head>
            <div>공통메뉴</div>
            <Component />
        </>
    )
}

NodeBird.protoType = {
    Component: PropTypes.elementType.isRequired,
}

export default NodeBird;

// index.js의 부모인셈