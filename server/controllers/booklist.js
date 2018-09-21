const bookGet = require('../lib/mysql')

module.exports = async (ctx, next) => {
  // 获取get，url传递过来的数据
  const { page, size } = ctx.request.query
  await bookGet
    .findByPage(Number(page), Number(size))
    .then(res => {
      ctx.body = { code: 0, msg: '成功', data: res }
    })
    .catch(err => {
      console.log(err)
      ctx.body = { code: -1, msg: '失败' }
    })
}
