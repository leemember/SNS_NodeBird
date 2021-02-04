# 🤍 BackEnd 작업

### **🎀 실행코드**

```
$node app.js
```

## 1. 노드로 서버 구동하기

> 노드는 서버가 아니라 자바스크립트 코드를 실행할 수 있게 해주는 런타임이다! <br>
> 서버가 아니어도 http를 제공해준다.

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

- front => SSR (서버사이드렌더링) : 화면에 렌더링 해주는거

- BACK => API (데이터 불러오기)

<br>

---

<br>

## 2. 익스프레스로 라우팅하기

- 포스트맨 설치 : https://www.postman.com/downloads/

```
$npm i express
```

노드의 api는 대부분 JSON으로 응답한다.

<br>

#### ✨라우터를 만드는 이유는 Front에서 여러 요청을 해올테니 backEnd 라우터도 다양하게 만드는 것이다.

<br>

```
app.get('/', (req, res) => {
  res.send('helloe express');
});
```

| **app.이벤트** | **설명**                    |
| :------------- | :-------------------------- |
| app.get        | 가져오다                    |
| app.post       | 생성하다                    |
| app.put        | 전체 수정                   |
| app.delete     | 제거                        |
| app.patch      | 부분 수정                   |
| app.options    | 찔러보기                    |
| app.head       | 헤더만 가져오기 (헤더/바디) |

<br>

---

<br>

## 3. MySQL과 시퀄라이즈 연결하기

- MySQL 다운로드 : https://www.mysql.com/downloads/
- MySQL 설치방법 : https://thebook.io/080229/ch07/02/

<br>

> MySQL 세팅 후 밑에 라이브러리 설치

```
$npm i sequelize sequelize-cli mysql2
```

**- mysql2** : 노드랑 mysql을 연결해주는 드라이버다.

**- sequelize** : SQL언어를 따로 배우지 않아도 자바스크립트 만으로도 SQL을 조작할 수 있게 도와주는 라이브러리다.

<br>

> 시퀄라이즈 세팅이 되는 명령어

```
$npx sequelize init
```
