const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', (req, res) => {
    res.render('main', { title: 'Web47 SNS' });
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: 'Web47 SNS - 내 정보' });
})

router.get('/account', isNotLoggedIn, (req, res) => {
    res.render('account', { title: 'Web47 SNS - 회원가입' });
})

module.exports = router;