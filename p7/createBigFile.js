const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 10000000000; i++) {
    file.write('hello! we will create very big file in this example.\n');
}
file.end();