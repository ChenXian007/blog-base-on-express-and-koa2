const env = process.env.NODE_ENV

//配置参数
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: 'admin123',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1',
    }
}

if (env === 'prod') {
    MYSQL_CONF = {
            host: '127.0.0.1',
            user: 'root',
            password: 'admin123',
            port: '3306',
            database: 'myblog'
        },
        REDIS_CONF = {
            port: 6379,
            host: '127.0.0.1',
        }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}