const express = require('express');
const { Op } = require('sequelize');
const { isLoggedIn, isNotLoggedIn, isEmailConfirmed } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');
const e = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user ? req.user.Followers.length : 0;
    res.locals.followingCount = req.user ? req.user.Followings.length : 0;
    res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
    next();
});

router.get('/home', isLoggedIn, isEmailConfirmed, async (req, res, next) => {
    const perPage = 9; //페이지 당 9개 포스트로 제한
    const pageCount = Math.ceil(Post.count() / perPage); //전체 페이지 수
    let pageNum = req.query.pageNum ? parseInt(req.query.pageNum) - 1 : 0;//요청한 페이지 - 특정 페이지 요청이 없으면 0
    if (pageNum > pageCount) pageNum = pageCount; //요청 페이지가 존재하는 페이지보다 큰 경우 마지막 페이지로 설정
    try {
        const posts = await Post.findAll({
            offset: perPage * pageNum,
            limit: perPage,//해당 페이지 9개만 가져와야됨
            include: {
                model: User,
                attributes: ['id', 'name'],
            },
            order: [['createdAt', 'DESC']],
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

router.get('/new', isLoggedIn, isEmailConfirmed, (req, res) => {
    res.render('new', { title: '포스트 작성 - Web47 SNS' });
});

router.get('/follow', isLoggedIn, isEmailConfirmed, async (req, res, next) => {
    const selfID = req.user.id;
    let following = req.user.Followings.map(f => f.id);
    following = following.push(selfID);
    console.log("following : " + following);
    const followingAttr = {};//출처 : https://velog.io/@jujube0/Sequelize-%EB%AC%B8%EC%A0%9C%ED%95%B4%EA%B2%B0
    if (following) { followingAttr[Op.not] = following; } else { followingAttr[Op.not] = selfID; }
    const notFollowing = await User.findAll({
        attributes: ['id', 'name'],
        where: { id: followingAttr },
        order: [['createdAt', 'DESC']],
    });
    console.log("not following : " + notFollowing);
    res.render('follow', { title: '팔로우 관리 - Web47 SNS', notFollow: notFollowing });
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