const fs = require('fs');

console.log('start');

let data = fs.readFileSync('./readme2.txt');
console.log('1st', data.toString());

data = fs.readFileSync('./readme2.txt');
console.log('2nd', data.toString());

data = fs.readFileSync('./readme2.txt');
console.log('3rd', data.toString());

data = fs.readFileSync('./readme2.txt');
console.log('4th', data.toString());

console.log('end');

