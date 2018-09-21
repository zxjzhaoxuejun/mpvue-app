const bookGet = require('../lib/mysql')

module.exports = async (ctx, next) => {
  await bookGet
    .findBooksCount()
    .then(res => {
      ctx.body = { code: 0, msg: '成功', data: res }
    })
    .catch(err => {
      console.log(err)
      ctx.body = { code: -1, msg: '失败' }
    })
}
