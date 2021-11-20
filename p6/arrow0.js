var obj = {
    bar: function(){
        var x = (()=> this);
        return x;
    }
}
var fn = obj.bar();
console.log(fn()===obj);

var fn2 = obj.bar;
console.log(fn2()()==globalThis);