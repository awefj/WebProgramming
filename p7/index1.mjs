import {odd, even} from './var'
//import checkNumber from func1
function checkStringOddorEven(str){
    if(str.length%2){
        return odd;
    }
    return even;
}

//console.log(checkNumber(10));
console.log(checkStringOddorEven('Hello World'));