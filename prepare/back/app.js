const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.write('hello node 01');
  res.write('hello node 02');
  res.write('hello node 03');
  res.write('hello node 04');
  res.end('Hello node 05');
});
server.listen(3065, () => {
  console.log('서버 실행 중');
});
// 노드 런타임이 이 코드를 실행해준다.