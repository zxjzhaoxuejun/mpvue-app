const bookGet = require('../lib/mysql')
module.exports = async (ctx, next) => {
  const { appid, comment, phone, location, bookid } = ctx.request.body
  const createTime = new Date().getTime()
  if (appid) {
    await bookGet
      .insertComments([appid, comment, phone, location, bookid, createTime])
      .then(res => {
        ctx.body = {
          code: 0,
          title: '评论提示',
          msg: '评论成功'
        }
      })
      .catch(err => {
        ctx.body = { code: -1, data: { msg: '评论失败:' + err } }
      })
  }
}
