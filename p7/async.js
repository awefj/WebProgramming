const fs = require('fs');

console.log('start');

fs.readFile('./readme2.txt', (err, data) => {
    if (err) { throw err; }
    console.log('1st', data.toString());
});

fs.readFile('./readme2.txt', (err, data) => {
    if (err) { throw err; }
    console.log('2nd', data.toString());
});

fs.readFile('./readme2.txt', (err, data) => {
    if (err) { throw err; }
    console.log('3rd', data.toString());
});

fs.readFile('./readme2.txt', (err, data) => {
    if (err) { throw err; }
    console.log('4th', data.toString());
});

console.log('end');