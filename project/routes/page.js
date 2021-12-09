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

router.get('/home', isLoggedIn, isEmailConfirmed, async (req, res, next) => {
    let pageNum = req.query.pageNum ? req.query.pageNum - 1 : 0;//요청한 페이지
    try {
        const posts = await Post.findAll({
            include: {//해당 페이지 9개만 가져와야됨
                offset: 9 * pageNum,
                limit: 9,
                model: User,
                attributes: ['id', 'name'],
            },
            order: [['createdAt', "DESC"]],
        });
        res.render('home', {
            title: '메인 - Web47 SNS',
            posts: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/new', isLoggedIn, isEmailConfirmed, (req,res)=>{
    res.render('new', {title: '포스트 작성 - Web47 SNS'});
})

router.get('/follow', isLoggedIn, isEmailConfirmed, (req, res)=>{
    res.render('follow', {title: '팔로우 관리 - Web47 SNS'});
})

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