const spawn = require('child_process').spawn;

var process = spawn('python', ['test.py']); //파이썬 코드 test.py 실행

process.stdout.on('data', function (data) {
    console.log(data.toString());
}); //실행결과

process.stderr.on('data', function (data) {
    console.error(data.toString());
}); //에러