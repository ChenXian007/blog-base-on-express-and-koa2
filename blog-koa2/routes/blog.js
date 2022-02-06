const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
router.prefix('/api/blog')

router.get('/list', async(ctx, next) => {
    const keyword = ctx.query.keyword || ''
    let author = ctx.query.author || ''
    if (ctx.query.isadmin) {
        if (ctx.session.username == null) {
            ctx.body = new ErrorModel('未登陆')
            return
        }
        author = ctx.session.username
    }
    const listData = await getList(keyword, author)
    ctx.body = new SuccessModel(listData)

})

router.get('/detail', async(ctx, next) => {
    const data = await getDetail(ctx.query.id)

    ctx.body = new SuccessModel(data)

})
router.post('/new', loginCheck, async(ctx, next) => {
    // let loginCheckResult = await loginCheck(req)
    // if (loginCheckResult) {
    //     return
    // }
    ctx.request.body.author = ctx.session.username
    const data = await newBlog(ctx.request.body)
    ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async(ctx, next) => {
    // let loginCheckResult = await loginCheck(req)
    // if (loginCheckResult) {
    //     return
    // }
    const body = ctx.request.body
    const val = await updateBlog(ctx.query.id, body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

router.post('/del', loginCheck, async(ctx, next) => {

    const author = ctx.session.username
    const val = await delBlog(ctx.query.id, author)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除博客失败')
    }

})


module.exports = router