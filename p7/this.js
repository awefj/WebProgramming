console.log(this);
console.log(this === module.exports);
console.log(this===exports)

function wtf(){
    console.log('func', this===exports, this===global);
}

wtf();