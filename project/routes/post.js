const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Hashtag, Image } = require('../models');
const { isLoggedIn, isEmailConfirmed } = require('./middlewares');
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
            const fileName = Date.now() + ext;
            callback(null, fileName);
            console.log("filename : ", fileName);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },//파일 크기 10MB로 제한
});
// 이미지 최대 5개를 upload에 저장, 미리보기
// 출처 : https://likebubbletea.tistory.com/53
router.post('/img', isLoggedIn, isEmailConfirmed, uploadImg.array('imgs', 5), function (req, res) {
    console.log(`files : ${req.files.map(item => item.filename)}`);
    const ary = req.files.map(item=>`/img/${item.filename}`);
    console.log('ary : ', ary);
    const urlJSON = JSON.stringify({url: ary});
    console.log("url json : ", urlJSON);
    res.json(urlJSON);
});
//포스트
const upload = multer();
router.post('/', isLoggedIn, isEmailConfirmed, upload.none(), async (req, res, next) => {
    try {
        console.log(`uploader : ${req.user}`);
        const url = req.body.url;
        console.log(url);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (url.length > 0) { // 올린 이미지가 있을때 db에 이미지 경로 저장 & 포스트에 연결
            // res : db에 image 만들고 배열로 저장
            const res = await Promise.all(
                url.map(item => {
                    return Image.create({
                        img: item,
                        index: index,
                        PostId: post.id
                    });
                })
            );
            await post.addImages(res); //post에 연결
        }
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() },
                    })
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