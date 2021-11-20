//constructor function - 대문자로 시작.
function Product(name, price){
    this.name = name;
    this.price = price;
}

let product = new Product('banana', 1200);

console.log(product);