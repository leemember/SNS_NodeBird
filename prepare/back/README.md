# 🤍 BackEnd 작업

### **🎀 실행코드**

```
$node app.js
```
## 1. 노드로 서버 구동하기
> 노드는 서버가 아니라 자바스크립트 코드를 실행할 수 있게 해주는 런타임이다! <br>
서버가 아니어도 http를 제공해준다.

<br>

### BackEnd 작업 환경설정

```
$npm init
----------------------------------
package name : react-nodebird-back
(...전부 엔터)
author : 내이름
```

<br>

👇🏻 이런 서버를 불러오는 작업은 프론트에서도 작업이 가능한데 대규모 프로젝트를 위해서 백을 구현하는 것이다.

```
function loadPostsAPI(data) {
  return axios.post('/api/posts', data);
}
```

### **데이터 흐름 구성도**

<BR>
front => SSR (서버사이드렌더링)

BACK => API (데이터 불러오기)

대규모 프로젝트인 경우, 각 기능별로 나눠서 해야 자원을 아낄 수 있다고함
<br>
예를들어, 배달의민족이라면 배달 주문은 배달 주문만 받도록 하는거

<br>

-----

<br>

## 2. 익스프레스로 라우팅하기

```
$npm i express
```
