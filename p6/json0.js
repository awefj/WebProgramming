const javascriptObject = [{
    name: '윤인성',
    region: '서울'
}, {
    name: '윤명월',
    region: '도쿄'
}
];

const outputA = JSON.stringify(javascriptObject);
const outputB = JSON.stringify(javascriptObject, null, 2);

console.log(typeof(outputA));
console.log(outputA);
console.log(outputB);
console.log('----------------------------');

const outputC = JSON.parse(outputB);
console.log(typeof(outputC));
console.log(outputC);