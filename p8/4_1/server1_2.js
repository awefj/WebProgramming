const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // 전달할 내용 형태
    res.write('<h1>Hello Node!</h1>'); //전달할 내용
    res.end('<p>Hello Server!<p>'); //끝
})
    .listen(8080, () => {
        console.log('8080 포트에서 서버 대기 중');
    });

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!<p>');
})
    .listen(8081, () => {
        console.log('8081 포트에서 서버 대기 중');
    });
