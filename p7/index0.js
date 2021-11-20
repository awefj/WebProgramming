const {odd, even} = require('./var');
const checkNumber = require('./func0');

function checkStringOddorEven(str){
    if(str.length%2){
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddorEven('Hello World'));