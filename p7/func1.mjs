import { odd, even } from './var.js';

function checkOddorEven(num) {
    if (num % 2) {
        return odd;
    }
    return even;
}

export default checkOddorEven;