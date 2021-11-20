let products = [
    {name: 'banana', price:1200},
    {name: 'apple', price:2000},
    {name: 'orange', price:2300}
]
// 메소드를 객체 바깥으로 빼서 사용. C언어 구조체 밖에 구조체 관련 함수 사용과 같음.
function printProduct(product){console.log(`price for ${product.name} is ${product.price}`);}

for(let product of products)
    printProduct(product);