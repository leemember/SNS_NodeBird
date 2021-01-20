# 🤍 Front 작업

1. next 버전 9 설치하기

```
npm i next@9
```

> 특정 버전을 설치하려면 @뒤에 버전수를 적고 설치해주면 된다.

<br>

#### 파일을 동적으로 바꾸고 싶을 때

파일명 : [name].js 이렇게 대괄호로 하면 된다.

<br>

2. prop-types 설치하기

```
npm i prop-types
```

타입스크립트로 개발하는거면 prop-types가 필요 없지만, 우리는 자바스크립트로 하는 것이기 때문에 prop-types를 설치해줘야 한다.

```
AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
```

여기에 쓰인 node는 retrun 안에 들어갈 수 있는 모든 것들이 노드라고한다.<br>
쉽게 말해 화면에 그릴 수 있는 모든 것들!

<br>
3. Ant Design으로 화면 UI 구성하기

> https://ant.design/

> style-component를 사용하면 emotion을 공짜로 사용할 수 있다. <br> 서버 사이드 렌더링 할 때도 편리하다. <br>https://emotion.sh/docs/styled


(1) 설치하기

```
$npm i styled-components antd @ant-design/icons
```

