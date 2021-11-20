const exec = require('child_process').exec;

var process = exec('dir'); //윈도우 명령어 dir 실행

process.stdout.on('data', function (data) {
    console.log(data.toString());
}); //실행결과

process.stderr.on('data', function (data) {
    console.error(data.toString());
}); //에러