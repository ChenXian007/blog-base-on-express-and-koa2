const { exec } = require('../db/mysql')
const { escape } = require('../db/mysql')
const login = function(username, password) {
    username = escape(username)
    password = escape(password)
    let sql = `
    select username,realname from users where username = ${username} and password = ${password}
    `
    console.log(sql);
    return exec(sql).then(res => {
        return res[0] || {}
    })
}

module.exports = {
    login
}