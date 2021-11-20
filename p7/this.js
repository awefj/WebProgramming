console.log(this);
console.log(this === module.exports);
console.log(this === exports)

function wtf() {
    console.log('func', this === exports, this === global); //함수 선언부 내부의 this는 global 객체.
}

wtf();