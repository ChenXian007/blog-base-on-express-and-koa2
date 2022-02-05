var express = require('express');
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {

    const { username, password } = req.body
    let result = login(username, password)
    return result.then(val => {
        if (val.username) {
            req.session.username = val.username
            req.session.realname = val.realname
            res.json(
                new SuccessModel()
            )
            return
        }
        new ErrorModel('登陆失败')
    })

});

router.get('/login', function(req, res, next) {

    const session = req.session
    if (session.username) {
        res.json(
            new SuccessModel()
        )
        return
    }
    res.json(
        new ErrorModel()
    )

});


module.exports = router;