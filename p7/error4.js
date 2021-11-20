process.on('uncaughtException', (err) => {
    console.error('unexpected error', err);
});

setInterval(() => {
    throw new Error('non-stop');
}, 1000);

setTimeout(() => {
    console.log('executing');
}, 2000);