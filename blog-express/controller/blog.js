const { exec } = require('../db/mysql')

//获取  列表
function getList(keyword, author) {
    let sql = `select * from blogs where 1=1 `
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    if (author) {
        sql += `and author='${author}' `
    }
    sql += `order by createtime desc`
    return exec(sql)
}
//获取  一篇
function getDetail(id) {
    let sql = `select * from blogs where id = '${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}
//新增
function newBlog(data = {}) {
    const title = data.title
    const content = data.content
    const createtime = Date.now()
    const author = data.author
    let sql = `
    insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}')
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })

}

//更新
function updateBlog(id, data = {}) {
    const title = data.title
    const content = data.content
    let sql = `
        update blogs set title = '${title}', content = '${content}' where id = ${id}
    `
    return exec(sql).then(val => {
        if (val.affectedRows > 0) {
            return true
        }
        return false
    })
}

function delBlog(id, author) {

    let sql = `
    delete from blogs where id = ${id} and author = '${author}'
    `
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}