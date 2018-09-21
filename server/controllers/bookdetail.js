const bookGet = require('../lib/mysql')

module.exports = async (ctx, next) => {
  // 获取get，url传递过来的数据
  const { id } = ctx.request.query
  await bookGet
    .findDetail(id)
    .then(async res => {
      await bookGet.findUser(res[0].appid).then(result => {
        let resultData = { ...res[0], ...result[0] }
        ctx.body = { code: 0, msg: '成功', data: resultData }
      })
    })
    .catch(err => {
      ctx.body = { code: -1, msg: '失败' + err }
    })
  await bookGet.findUpdateView(id)
}
