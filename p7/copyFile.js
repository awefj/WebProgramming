const fs = require('fs').promises;

fs.copyFile('readme4.txt', 'writeme4.txt')
    .then(() => {
        console.log('copy complete');
    })
    .catch((err) => {
        console.error(err);
    });