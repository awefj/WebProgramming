const express = require('express');

const router = express.Router();

router.use((req,res,next)=>{
    next();
});

router.get('/', (req, res)=>{
    res.render('main', { title : 'Web47 SNS'});
});

module.exports = router;