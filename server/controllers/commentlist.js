const bookGet = require('../lib/mysql')

module.exports = async (ctx, next) => {
  // 获取get，url传递过来的数据
  const { bookid, appid } = ctx.request.query

  if (bookid) {
    await bookGet
      .findAllComments(bookid)
      .then(res => {
        res.map(v => {
          v['createTime'] = timestampToTime(v['createTime'])
        })
        ctx.body = { code: 0, msg: '成功', data: res }
      })
      .catch(err => {
        console.log(err)
        ctx.body = { code: -1, msg: '失败' }
      })
  } else if (appid) {
    await bookGet
      .findMyComments(appid)
      .then(res => {
        res.map(v => {
          v['createTime'] = timestampToTime(v['createTime'])
        })
        ctx.body = { code: 0, msg: '成功', data: res }
      })
      .catch(err => {
        console.log(err)
        ctx.body = { code: -1, msg: '失败' }
      })
  }
}

function timestampToTime (timestamp) {
  var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y + M + D + h + m + s
}
