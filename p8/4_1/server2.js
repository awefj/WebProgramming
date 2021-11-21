const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./server2.html'); //html 파일을 읽어옴
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data); //읽어온 html 파일을 전송
    }
    catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8080, () => {
        console.log('8080포트에서 서버 대기 중');
    });

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!<p>');
})
    .listen(8081, () => {
        console.log('8081포트에서 서버 대기 중');
    });