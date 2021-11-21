const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // 전달할 내용 형태
    res.write('<h1>Hello Node!</h1>'); //전달할 내용
    res.end('<p>Hello Server!<p>'); //끝
})
    .listen(8080, () => { //서버 연결
        console.log('8080포트에서 서버 대기 중');
    });