const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { smtpTransport } = require('./middlewares');
const User = require('../models/user');
const AuthCode = require('../models/authCode');
const router = express.Router();

router.post('/account', isNotLoggedIn, async (req, res, next) => {
    const { email, name, web47ID, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email: email } });
        const exID = await User.findOne({ where: { web47ID: web47ID } });
        if (exUser) {// 동일 이메일 있는지 검사
            return res.redirect('/account?error=email_exist');
        }
        if (exID) {// 동일 id 있는지 검사
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
router.post('/codeSend', isLoggedIn, async (req, res, next) => {
    const web47ID = req.user.web47ID;
    console.log(`id${web47ID}, email${req.user.email} : requested email confirmation code`);
    const secretCode = Math.random().toString().substring(10, 16); // 6자리 랜덤 코드 생성 (임시)
    try {
        const exCode = await AuthCode.findOne({ where: { userID: web47ID } });//이전에 인증코드가 생성되었는지 검사
        if (exCode) { //이미 있으므로 code 내용 변경
            await exCode.update({ code: secretCode }).then(r => console.log("authcode updated"));
        } else { //없으므로 web47ID 인증 코드 생성
            await AuthCode.create({ code: secretCode, userID: web47ID, }).then(r => console.log("authcode created"));
        }
        smtpTransport.sendMail({
            from: "Web47 SNS",
            to: req.user.email,
            subject: "Web47 SNS 계정 활성화를 위한 인증코드",
            text: "계정 활성화를 위해 아래 코드를 입력해주세요\n" + secretCode
        });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});
router.post('/emailConfirm', isLoggedIn, async (req, res, next) => {
    const { authCode } = req.body;
    const web47ID = req.user.web47ID;
    console.log(`id ${web47ID}, email ${req.user.email} : attempted email confirmation, inserted : ${authCode}`);
    try {
        const code = await AuthCode.findOne({ where: { code: authCode, userID: web47ID } });
        if (code) {// 인증코드 일치
            if (Date.now() - Date.parse(code.getDataValue('updatedAt')) > 3 * 60 * 1000) {//인증코드 updatedAt 값과 비교해 3분 이상 지났을 시 error=timeout
                return res.redirect('/profile/?error=timeout');
            } else {
                const user = await User.findOne({ where: { web47ID: web47ID } });
                await user.update({ emailConfirm: true }).then(r => console.log(`id ${web47ID} email confirmed`));// 해당 유저 인증됨
                await code.destroy();// 인증코드 삭제
                return res.redirect('/profile');
            }
        } else {// 인증코드가 생성되지 않았거나 일치하지 않음
            return res.redirect('/profile/?error=no_code');
        }
    } catch (err) {
        console.error(err);
        return next(err);
    }
});
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;