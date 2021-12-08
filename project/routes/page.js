const express = require('express');
const { isLoggedIn, isNotLoggedIn, isEmailConfirmed } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user ? req.user.Followers.length : 0;
    res.locals.followingCount = req.user ? req.user.Followings.length : 0;
    res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
    next();
});

router.get('/home', isLoggedIn, isEmailConfirmed, (req, res) => {
    res.render('home', { title: '메인 - Web47 SNS' });
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - Web47 SNS', currentTime: `${Date()}` });
});

router.get('/account', isNotLoggedIn, (req, res) => {
    res.render('account', { title: 'Web47 SNS - 회원가입' });
});

router.get('/', (req, res) => {
    res.render('main', { title: 'Web47 SNS' });
});

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

module.exports = router;