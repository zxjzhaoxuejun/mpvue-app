const bookGet = require('../lib/mysql')
module.exports = async ctx => {
  const {
    appid,
    avatarUrl,
    city,
    country,
    gender,
    language,
    nickName,
    province,
    sessionKey
  } = ctx.request.body
  const isUser = await bookGet.findUser(appid)
  if (isUser.length) {
    ctx.body = {}
    return
  }
  await bookGet
    .saveUser([
      appid,
      avatarUrl,
      city,
      country,
      gender,
      language,
      nickName,
      province,
      sessionKey
    ])
    .then(res => {
      console.log(res)
      ctx.body = {
        code: 0,
        msg: '成功',
        title: '用户信息保存'
      }
    })
    .catch(err => {
      ctx.body = { code: -1, msg: `失败${err}`, title: '用户信息保存' }
    })
}
