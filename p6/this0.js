//this는 함수 호출 방법(문맥)에 의해 this값 결정
//ES5에서 this값을 명시적으로 설정할 수 있는 bind() 도입
//ES6(ES2015)에서 lexical context의 this값을 유지하는 화살표 함수 도입
//lexical scoping - 항목이 최초로 생성된 영역 의미. static scope라고도 함

var name = 'apple'; //setName을 실행시키면 log에서 apple 출력

function log(){
    console.log(name);
}

function setName(){
    var name = 'pear';//여기서 var name에 'pear'를 대입한 것은 setName 함수 내에서만 유효
    log();
}

setName();

var test = 'apple';

function out(){
    console.log(test);
}

function setTest(){
    test = 'pear';
    out();
}

setTest();