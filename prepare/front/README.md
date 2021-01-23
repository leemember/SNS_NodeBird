# 🤍 Front 작업

## 1. next 버전 9 설치하기

```
npm i next@9
```

> 특정 버전을 설치하려면 @뒤에 버전수를 적고 설치해주면 된다.

<br>

#### 파일을 동적으로 바꾸고 싶을 때

파일명 : [name].js 이렇게 대괄호로 하면 된다.

<br>

## 2. prop-types 설치하기

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

## 3. Ant Design으로 화면 UI 구성하기

> https://ant.design/

> style-component를 사용하면 emotion을 공짜로 사용할 수 있다. <br> 서버 사이드 렌더링 할 때도 편리하다. <br>https://emotion.sh/docs/styled

(1) 설치하기

```
$npm i styled-components antd @ant-design/icons
```

(2) 적용하기

ant 홈페이지에서 마음에 드는 UI를 고르고 컴포넌트에 적용하면 된다.

```
<SearchInput enterButton />
```

이런식으로 적용하면 파란색의 버튼이 나온다.

<br>

## 4. 반응형 그리드 사용하기

```
<Row gutter={8}>
    <Col xs={24} md={6}>
        {isLoggedIn ? <UserProfile /> : <LogginForm />}
    </Col>

    <Col xs={24} md={12}>
        {children}
    </Col>

    <Col xs={24} md={6}>
        <a href="" target="_blank" rel="noreferrer noopener"></a>
    </Col>
</Row>
```

이렇게 Row와 Col (가로세로)로 그리드를 형성해서 반응형으로 구현할 수 있다.

> xs : 모바일 / sm : 태블릿 / md : 작은 데스크탑 / lg : 대화면
>
> > xs={24} md={6}는 (25%) <br>
> > xs={24} md={12}는 (50%) <br>
> > 1번째 Col이랑 2번재 Col이랑 같은 줄에 있게 만드려면 최소 둘의 합계가 24 이하가 되야한다. 13, 13 하면 둘이 합쳐서 26이 되버리니까 24가 넘어 따로 따로 세로로 배치된다.
> >
> > > 여기서 gutter란 컬럼 사이에 간격을 주는 것이다. (패딩역할을 한다.)
> > >
> > > > a태그에 있는 target으로 새창을 띄울 때는 rel="noreferrer noopener"을 꼭 넣어줘야 보안 위험에 있어서 예방할 수 있다.

## 5. 로그인 폼 만들기

로그인 했을 때는 사용자 페이지로 넘어갈 것이다. 이런 경우 서버가 없는데 로그인이 불가능 할테니 이럴 때는 더미데이터를 사용해서 로그인을 해주면 된다.

서버쪽이 완성이 안 된 상태이기 때문에 백엔드 개발자를 위해서라도 미리 해줘야 한다.
(로그인이 되면 사용자 프로필이 나오게, 로그인이 안되어있으면 로그인 폼이 보이게)

이번 프로젝트에는 직접 수작업으로 폼을 만들었지만, 리액트 폼 라이브러리를 사용하는 것이 효율적이고 생산적이다.

그리고 컴포넌트의 props를 넘겨주는 함수는 useCallback을 꼭 써야 최적화가 되고, 반복되는 패턴이 비슷한 코드들은 Custom Hooks를 만들어 사용하면 코드가 최적화 될 수 있다.

### <b>리렌더링 이해하기</b>

- useCallback : 함수를 캐싱하는 것
- useMemo : 값을 캐싱하는 것

일반적으로 컴포넌트에다가 인스타일로 밑에 처럼 적용하는 경우가 많은데
이럴 경우에 잘못 인식하면 객체로 인식할 수 있기 때문에 이렇게 하면 안된다.

```
<div style={{ marginTop: 10 }}>
```

😀 해결법 : styled-components를 사용하여 그 해당 객체만 리렌더링 되게 하는 방법도 있고, useMemo를 사용하여 리렌더링 하는 방법이 있다.

### <b>더미 데이터로 로그인하기</b>

```
<ButtonWrapper>
    <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
</ButtonWrapper>
```

버튼 부분에다가 htmlType="submit"을 붙혀줘야 Form태그에 submit이 되는데, 또 Form태그에다가 

```
 onFinish={onSubmitForm}
```
를 해줘야지 onFinish가 호출이 된다. 
onFinish는 자동으로 e.preventDefault가 이미 적용되어있다.
그리고 antd 디자인에서는 사용하면 안된다!


#### LoginForm.js
```
const LoginForm = ({ setIsLoggedIn }) => {
    const [id, setId] = useState('');
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);

    const [password, setPassword] = useState('');
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        setIsLoggedIn(true);
    }, [id, password]);

    (...)

}
```

로그인폼 Props에 setIsLoggedIn를 해주고, onSubmitForm 함수에 데이터 값을 넘겨주면 로그인을 해주겠다고 setIsLoggedIn(true); 코드를 추가해준다.
이 데이터값은 이전에 만든 AppLayout.js에 더미데이터로 로그인 폼에다가 넘겨준다.


로그인을 하는 순간 isLoggedIn이 로그인을 하는순간 트루로 바뀌면서 UseProfile로 바뀌게 된다. 서버가 없어도 가짜로 로그인을 시켜줄 수 있다는 것임 (백엔드 없어도 가상 스테이지 만드는 것이다.)


#### UserProfile.js

```
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
```

위에 Card 컴포넌트에서 actions는 배열이기 때문에 각 div태그에 key값을 붙혀줘야한다. 리액트에서는 배열에서 꼭 키 값 적용해주기.

```
const UserProfile = ({ setIsLoggedIn }) => {
    const onLogOut = useCallback(() => {
        setIsLoggedIn(false);
    }, []);
    //로그아웃 누르면 풀리게하는 동작
```

코드 상단쪽에는 이렇게 useCallback으로 setIsLoggedIn(false); 를 false로 해주어야 로그아웃을 누르면 원래 상태로 돌아온다.

이거는 다시 AppLayout.js 큰 틀의 레이아웃 컴포넌트에 가서

```
 {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
 ```

 로그아웃 버튼을 누를 때 다시 원상태로 돌아오는 동작이 가능하도록 

 ```
setIsLoggedIn={setIsLoggedIn}
 ```

 이 코드를 적용시켜준다.

### <b>프로필 페이지 만들기</b>


