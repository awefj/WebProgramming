const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
//아래 2줄만 있어도 무방.
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));

console.log('------------------------------');
//outdated, functional
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));
