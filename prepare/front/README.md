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

### 크롬 확장 프로그램

#### chrome 웹스토어에서 설치할 확장 프로그램 추천

<br>
https://chrome.google.com/webstore/category/extensions?hl=ko
- react Developer Tools
- redux DeveTools
- Mobx DeveTools

#### 라이브러리 추천

- 컴포넌트 디자인 라이브러리 : https://ant.design/
- 차트 라이브러리 : https://echarts.apache.org/examples/en/index.html

### <b>프로필 화면 만들기</b>

[components] 디렉토리

- NicknameEditForm.js
- UserProfile.js

생성

- 컴포넌트가 100줄이 넘어가면 더 잘게잘게 자르는게 좋다.

### <b>회원가입 화면 만들기</b>

```
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
```

이렇게 반복되는 코드를 최적화 하기 위해 커스텀 Hooks을 만들면 된다.
훅의 특징은 반복문이나 조건문 함수에서는 안되고
컴포넌트 안에서는 된다. 유일학 예외가 커스텀 훅이다.

---

[hooks] 디렉토리 생성

- useInput.js

LoginForm이나 signup에서 중복되는 코드들이 있는데
그 부분을 커스텀훅을 이용해서 컴포턴트 코드 분량을 최적화 해주면 된다.

<br>

## 6. Redux 연동하기

<br>

### **라이브러리 설치하기**

> 버전 6으로 설치

```
$npm i next-redux-wrapper
$npm i redux
$npm i react-redux
```

리덕스는 대부분 app.js에서 retrun 값들을 감싸주는 태그에

```
<Provider store={store}>
```

를 넣는데, next를 사용 한다면 이 부분이 생략된다.

<br>

### **😎 리덕스란 ?**

<br>

<로그인 폼이나, 회원가입 페이지, 프로필 페이지> 이런 부분에 공통적인 데이터가 있다.

바로 로그인 한 사람들의 정보가 이런 페이지들에 쓰일 텐데 로그인 여부 닉네임 정보 등등

여러 컴포넌트에서 공통적으로 쓰이는 데이터들이 각각 컴포넌트가 있어서 데이터들이 흩어져있다.

근데 이런 과정들이 매번 수동적으로 각각의 컴포넌트 마다
각각의 데이터들을 만들어 주는게 귀찮기 때문에 이런 점들을
중앙에서 하나로 관리해서 컴포넌트에 뿌려주는 <b>중앙 데이터 저장소</b> 역할을 하는 것을 <b>리덕스</b>라고 한다.

> 이를 통해서 컴포넌트가 필요로 할 때 전체적으로 가져오거나 부분적으로 가져오거나 할 수 있다.

<br>

### **😎 중앙데이터저장소 역할 해주는 라이브러리**

- context API
- 리덕스
- mobx
- graphQL

이 네 가지 선택지 중에 어떻게 골라야되는가 ?
규모가 어느정도 된다면 중앙 데이터 저장소 하나쯤은 꼭 필수다.
가장 많이 선택하는 순서 리덕스고 그 다음이 mobx다.
그리고 프로젝트가 좀 간단하다 싶으면 context API를 사용하면 된다.

#### **리덕스의 장점**

- 원리가 매우 간단하기 때문에 에러가 덜 난다.
- 에러가 추적이 가능해서 앱이 안정적이다.
- 코드량이 많아진다.
- 비동기가 가능하다. (서버에서 데이터를 가져오는 것은 항상 비동기임)
- 비동기를 다룰 때는 항상 실패를 대비해야한다
- 리듀서로 쪼갤 수 있어서 리덕스의 규모가 크면 세분화가 가능

> 비동기의 3단계 1. 데이터 요청, 2. 성공해서 받는거, 3.실패하는 경우
>
> > 요청, 성공, 실패 이렇게 3단계는 무조건 직접 구현해야한다.

<br>

#### **리덕스의 원리**

![zz](https://user-images.githubusercontent.com/71499150/105668483-bd08e100-5f20-11eb-807f-5144f84dad15.JPG)

**store란 이 그림에 묶여져있는 state랑 reducer가 포함한게 store라고 한다.**

<br>

- 중앙저장소를 만들면 각 컴포넌트에서 다 필요로 할 때 꺼내서 쓸 수가 있다.

- 데이터를 조회,수정,추가,삭제도 가능하다.

- 리덕스에서는 데이터를 바꾸려면 액션action을 꼭 필수로 만들어줘야한다.

- 디스패치하면 데이터의 값이 바뀌는데 이걸 디스패치한다고 바로 바뀌는 것이 아니라 리듀서를 해줘야지 바뀐다는 점.

- 리덕스 쓰면 액션 하나하나가 기록되기 떄문에 액션들만 쫙 놓고 보면 데이터들이 어떻게 바꿔왔는지 그게 다 추적이 되서 버그찾기가 쉽다. 중간에 데이터가 잘못 변화하는 부분을 포착이 된다면 그 부분만 찾아서 오류난 부분들을 쉽게 수정할 수 있다.

- 리덕스 dev tool 을 사용하면 데이터를 뒤로 돌렸다가 다시 앞으로 감았다가 등등 히스토리를 통해 자유자재로 작업이 가능하다. (로그인하고 또 로그인 풀고 이 과정임)

```
...state 를 사용하는 이유는 ?
```

> 메모리를 아끼기 위해서다.

액션 하나 실행할 때마다 새로운 객체가 생기기 때문에 메모리를 많이 잡아먹는다. 그래서 ...state를 사용하는 것이다. 이걸 해야만 참조관계가 되어 메모리를 아낄 수 있다.

개발모드 일 때는 바뀐 객체의 누적된 히스토리를 계속 갖고 있는데 히스토리를 갖고 있으면 중간중간 히스토리를 자꾸 버려줘서 메모리를 정리해준다. 배포 모드일때는 히스토리 기능이 필요 없기 때문에 메모리 정리를 계속 해줌. 그래서 배포모드 일 때는 메모리 문제가 일어나지 않는다.

```
posts: [{}, {}, {}]
```

이 배열안에 객체들이 선언되면 ...state를 사용하면 이전 애들은 바뀌지 않고 새로운 객체들만 바뀐다고 보면 된다.

![ss](https://user-images.githubusercontent.com/71499150/105668071-f2f99580-5f1f-11eb-91ab-80f67b780799.JPG)

이런 구조가 있을 때, 이전 상태와 다음 상태가 같다고 ...으로 스프레드 해주면 객체들은 서로 참조관계가 유지된다. 하지만 서로 다른 객체들은 새로운 객체를 만들어 준 것 이기 때문에 false값이 뜨는 것이다.

<br>

### **😎 미들웨어와 리덕스 dev tools**

<br>

```
$npm i redux-devtools-extension
```

미들웨어를 작업하려면 redux-devtools가 필요하다.

<br>

- 포트번호 변경하고 싶으면

```
"scripts": {
   "dev": "next -p 3090",
   "build": "next build"
 },
```

이렇게 설정해주면 된다.

#### **리덕스 쪼개기**

로그인, 로그아웃 리듀서 뿐만 아니라 앞으로 게시물과 팔로잉 팔로우 등등 여러 액션들이 필요한데,
이것들이 한 번에 index.js 페이지에 모인다면 코드가 굉장히 길어질 것이다. 이것들을 또 세분화 시켜서 작업이 가능하다.

[reducers] 디렉토리에 파일 생성하기
- post.js // 게시물용
- user.js // 

