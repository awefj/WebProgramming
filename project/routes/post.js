const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('upload 폴더 없음 - upload 폴더 생성');
    fs.mkdirSync('uploads');
}
// 파일을 /uploads 폴더에 저장
const uploadImg = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, 'uploads/');
        },
        filename(req, file, callback) {
            const ext = path.extname(file.originalname);
            callback(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },//파일 크기 10MB로 제한
});
// 이미지 최대 5개를 올릴수있음
router.post('/img', isLoggedIn, isEmailConfirmed, uploadImg.array('imgs', 5), function (req, res) {
    console.log(req.files);
    res.json({ url: `/img/${req.file.filename}` });
});
//포스트
const upload = multer();
router.post('/', isLoggendIn, isEmailConfirmed, upload.none(), async (req, res, next) => {
    try {
        console.log(`upload : ${req.user}`);
        const post = await Post.create({
            content: req.body.content,
            imgs: req.body.url,
            UserID: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({ where: { title: tag.slice(1).toLowerCase() }, })
                }),
            );
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/home');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;