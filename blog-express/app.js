var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')

//引入session redis
const session = require('express-session')

const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
    client: redisClient
})

//导入路由

var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

//express实例化
var app = express();


//相关插件
const ENV = process.env.NODE_ENV
if (ENV !== 'prod') {
    // 开发环境 / 测试环境
    app.use(logger('dev'));
} else {
    console.log('prod');
    // 线上环境
    const logFileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    })
    app.use(logger('combined', {
        stream: writeStream
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(session({
    secret: 'WJiol_123',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}))

//匹配路由
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;