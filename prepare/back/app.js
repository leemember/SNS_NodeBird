const express = require('express');
const postRouter = require('./routes/post');
const app = express();

app.get('/', (req, res) => {
  res.send('helloe express');
});

app.get('/', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    {id : 1, content: 'hello'},
    {id : 2, content: 'hello2'},
    {id : 3, content: 'hello3'},
  ])
})

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
})

//위에 코드들을 라우터라고 부르는데 라우터들을 분리해줄수도 있다.