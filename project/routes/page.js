const express = require('express');
const { Op } = require('sequelize');
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
    const perPage = 9; //페이지 당 9개 포스트로 제한
    const postCount = await Post.count();
    const pageCount = Math.ceil(postCount / perPage); //전체 페이지 수
    console.log('total pages : ', pageCount);
    let pageNum = req.query.pageNum ? parseInt(req.query.pageNum) - 1 : 0;//요청한 페이지 - 특정 페이지 요청이 없으면 0
    if (pageNum > pageCount) pageNum = pageCount; //요청 페이지가 존재하는 페이지보다 큰 경우 마지막 페이지로 설정
    try {
        const posts = await Post.findAll({
            offset: perPage * pageNum,
            limit: perPage,//pagination - 해당 페이지 9개만 가져와야됨
            include: { model: User, },
            order: [['createdAt', 'DESC']],
        });
        res.render('home', {
            title: '메인 - Web47 SNS',
            posts: posts,
            pageCount: pageCount,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/new', isLoggedIn, isEmailConfirmed, (req, res) => {
    res.render('post', { title: '포스트 작성 - Web47 SNS', isNew: true });
});

router.get('/edit', isLoggedIn, isEmailConfirmed, async (req, res, next) => {
    const query = parseInt(req.query.postID, 10);
    console.log('edit post : ', query);
    if (!query) {
        return res.redirect('/home');
    }
    try {
        const edit = await Post.findOne({ where: { id: query } });
        return res.render('post', { title: '포스트 수정 - Web47 SNS', isNew: false, post: edit });
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.get('/follow', isLoggedIn, isEmailConfirmed, async (req, res, next) => {
    console.log(`id : ${req.user.id} typeof id : ${typeof req.user.id}`);
    const following = req.user.Followings.map(f => f.id);// 팔로우 중인 유저
    console.log("following : " + following);
    const exclude = following.concat(req.user.id);// 본인과 팔로우 중인 유저
    console.log("exclude : " + exclude);
    try {
        const notFollowing = await User.findAll({
            attributes: ['id', 'name'],
            where: {
                id: { [Op.not]: exclude }
            },
        });
        //console.log("not following : " + notFollowing.map(f => f.id));
        res.render('follow', { title: '팔로우 관리 - Web47 SNS', notFollow: notFollowing });
    } catch (err) {
        console.error(err);
        next(err);
    }
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

router.get('/hashtag', isLoggedIn, isEmailConfirmed, async (req, res, next) => {
    const query = req.query.hashtag;
    console.log('hashtag : ', query);
    if (!query) {
        return res.redirect('/home');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: { [Op.like]: "%" + query + "%" } } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }
        return res.render('home', { title: `${query} | Web47 SNS`, posts: posts });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.get('/hashtagMatch', isLoggedIn, isEmailConfirmed, async (req, res, next) => {
    const query = req.query.hashtagClick;
    console.log('hashtagMatch : ', query);
    if (!query) {
        return res.redirect('/home');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }
        return res.render('home', { title: `${query} | Web47 SNS`, posts: posts });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.get('/userID', isLoggedIn, isEmailConfirmed, async (req, res, next) => {
    const query = req.query.postUserID;
    if (!query) {
        return res.redirect('/home');
    }
    try {
        const user = await User.findOne({ where: { web47ID: query } });
        let posts = [];
        if (user) {
            posts = await Post.findAll({
                include: { model: User },
                where: { UserId: user.id },
                order: [['createdAt', 'DESC']],
            });
        }
        return res.render('home', { title: `${query} | Web47 SNS`, posts: posts });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

module.exports = router;