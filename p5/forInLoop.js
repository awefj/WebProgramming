let array = ["apple", "pear", "grape", "strawberry", "banana"];

for(let i in array){
    console.log(`${i}번째 요소: ${array[i]}`);
}
console.log("=============================");

for(let item of array){
    console.log(item);
}