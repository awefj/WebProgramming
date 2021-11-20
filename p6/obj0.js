let obj = {
    name: 'banana',
    price: 1200,
    print: function(){console.log(`price for ${this.name} is ${this.price}.`)},
    //화살표함수는 cotext 내에서 가까운 블럭을 찾아 this찾음. p0에서는 this가 빈 객체로 반환됨.
    p0: ()=>{console.log(this.name, this.price)},
    //화살표함수에서 this를 사용하고 싶다면 해당 객체 레퍼런스를 인수로 넣어줘야 함.
    p1: (target)=>{console.log(target.name, target.price)} 
};

obj.print();
obj.p0();
obj.p1(obj);