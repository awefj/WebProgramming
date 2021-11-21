const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`master process id : ${process.pid}`);
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`no.${worker.process.pid} worker ended.`);
        console.log('code', code, 'signal', signal);
        cluster.fork();//죽을 때마다 새로 생성
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node</h1>');
        res.end('<p>Hello Cluster</p>');
        setTimeout(() => {//1초 후에 종료
            process.exit(1);
        }, 1000);
    }).listen(8080);
    console.log(`no.${process.pid} worker running`);
}