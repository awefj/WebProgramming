const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const router = express.Router();

router.post('/account', isNotLoggedIn, async (req, res, next) => {
    const { email, name, web47ID, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        const exID = await User.findOne({ where: { web47ID } });
        if (exUser) {
            return res.redirect('/account?error=email_exist');
        }
        if (exID) {
            return res.redirect('/account?error=ID_exist')
        }
        const hash = await bcrypt.hash(password, 12);
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
            return res.redirect('/');
        });
    })(req, res, nexxt); //미들웨어 내 미들웨어에는 (req, res, next) 붙임
});
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;