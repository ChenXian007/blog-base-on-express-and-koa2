const { exec } = require('../db/mysql')
const { escape } = require('../db/mysql')
const login = async(username, password) => {
    username = escape(username)
    password = escape(password)
    let sql = `
    select username,realname from users where username = ${username} and password = ${password}
    `
    const res = await exec(sql)
    return res[0] || {}

}

module.exports = {
    login
}