const fs = require('fs').promises;

fs.readdir('./folder')
    .then((dir) => {
        console.log('check folder contents', dir);
        return fs.unlink('./folder/newfile.js');
    })
    .then(() => {
        console.log('file delete success');
        return fs.rmdir('./folder');
    })
    .then(() => {
        console.log('folder delete success');
    })
    .catch((err) => {
        console.error(err);
    });