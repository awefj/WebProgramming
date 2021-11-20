// javascript 자체 모듈 시스템 문법. '.mjs' 확장자 사용.

//const { odd, even } = require('./var'); - 기존
import { odd, even } from './var.js'
import checkNumber from './func1.mjs'
function checkStringOddorEven(str) {
    if (str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddorEven('Hello World'));