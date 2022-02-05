const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
var express = require('express');
const loginCheck = require('../middleware/loginCheck')
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
    const keyword = req.query.keyword || ''
    let author = req.query.author || ''
    if (req.query.isadmin) {
        console.log(req.session.username);
        if (req.session.username == null) {
            res.json(
                new ErrorModel('尚未登陆')
            )
            return
        }
        author = req.session.username
    }
    const result = getList(keyword, author)
    return result.then((listData) => {
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = delBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
})
module.exports = router;