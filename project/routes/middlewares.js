const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        //return res.status(403).send('로그인 필요');
        return res.redirect('/?error=need_login');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        //const message = encodeURIComponent('로그인한 상태입니다.');
        //return res.redirect(`/?error=${message}`);
        return res.redirect('/profile/?error=already_loggedin');
    }
};

exports.isEmailConfirmed = (req, res, next) =>{
    if(req.user.emailConfirm){
        next();
    }else{
        //const message = encodeURIComponent('이메일 인증이 필요합니다.');
        //return res.redirect(`/profile/?error=${message}`);
        return res.redirect('profile/?error=need_email_confirm');
    }
};

exports.smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});