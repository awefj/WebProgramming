setInterval(() => {
    console.log('start');
    try {
        throw new Error('non-stop!');
    } catch (err) {
        console.error(err);
    }
}, 1000);