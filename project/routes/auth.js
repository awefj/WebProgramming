const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const {smtpTransport} = require('./middlewares');
const User = require('../models/user');
const router = express.Router();

router.post('/account', isNotLoggedIn, async (req, res, next) => {
    const { email, name, web47ID, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } }); //동일 이메일 있는지 검사
        const exID = await User.findOne({ where: { web47ID } }); //동일 id 있는지 검사
        if (exUser) {
            return res.redirect('/account?error=email_exist');
        }
        if (exID) {
            return res.redirect('/account?error=ID_exist')
        }
        const hash = await bcrypt.hash(password, 12); // 패스워드 암호화
        await User.create({
            email,
            name,
            web47ID,
            password: hash,
        });
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return next(err);
    }
});
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.logIn(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/profile');// 로그인 성공시 profile로 리다이렉트
        });
    })(req, res, next); //미들웨어 내 미들웨어에는 (req, res, next) 붙임
});
router.post('/codeSend', isLoggedIn,(req,res,next)=>{
    const { email, web47ID } = req.body;
    try{
        console.log(`${req.user.id} : requested email confirmation code`);
        //const authCode = await  
    }catch(err){
        console.error(err);
        return next(err);
    }
});
router.post('/emailConfirm', isLoggedIn, (req,res,next)=>{
});
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;