const { exec } = require('../db/mysql')

//获取  列表
async function getList(keyword, author) {
    let sql = `select * from blogs where 1=1 `
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    if (author) {
        sql += `and author='${author}' `
    }
    sql += `order by createtime desc`
    return await exec(sql)
}
//获取  一篇
async function getDetail(id) {
    let sql = `select * from blogs where id = '${id}'`
    const rows = await exec(sql)
    return rows[0]

}
//新增
async function newBlog(data = {}) {
    const title = data.title
    const content = data.content
    const createtime = Date.now()
    const author = data.author
    let sql = `
    insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}')
    `
    const insertData = await exec(sql)

    return {
        id: insertData.insertId
    }


}

//更新
async function updateBlog(id, data = {}) {
    const title = data.title
    const content = data.content
    let sql = `
        update blogs set title = '${title}', content = '${content}' where id = ${id}
    `
    const val = await exec(sql)
    if (val.affectedRows > 0) {
        return true
    }
    return false

}

async function delBlog(id, author) {

    let sql = `
    delete from blogs where id = ${id} and author = '${author}'
    `
    const res = await exec(sql)
    if (res.affectedRows > 0) {
        return true
    }
    return false
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}