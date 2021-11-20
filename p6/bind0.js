var obj = {a: 'Custom'};

var a = 'Global';

function wat(){
    //return this.a;
    console.log(this.a);
}

wat();
wat.call(obj);
wat.bind(obj);