function Product(name, price){
    this.name = name;
    this.price = price;
}

//prototype 할당 - 모든 객체가 공유. function, variable 등등 할당 가능.
Product.prototype.print = function(){
    console.log(`${this.name} : ${this.price}`);
};
Product.prototype.priceLimit = 2000;
Product.prototype.setPrice = function(targetPrice){this.price = targetPrice;}

//javascript에서 private, protected 등등 구현하려면 복잡하므로 typescript로 작성 후 javascript로 변환할 것.

let products = [
    new Product('banana', 1200),
    new Product('apple', 1300),
    new Product('grape', 1400),
    new Product('orange', 1500),
    new Product('pear', 1600)
]

for(let target of products){target.print();}

for(let target of products){target.setPrice(900);}
for(let target of products){target.print();}