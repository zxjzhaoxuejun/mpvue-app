// 新增图书
// 1.获取豆瓣图书信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 2.入库
const https = require('https')
const bookGet = require('../lib/mysql')
module.exports = async (ctx, next) => {
  const { isnb, appid } = ctx.request.body

  if (isnb) {
    let url = `https://api.douban.com/v2/book/isbn/` + isnb
    const isExist = await bookGet.findBookIsnb(isnb)

    if (isExist.length) {
      ctx.body = { code: -1, msg: '图书已存在！' }
      return
    }

    const bookinfo = await getJson(url)
    const rate = bookinfo.rating.average // 评分
    const { title, image, alt, publisher, summary, price } = bookinfo
    const tags = bookinfo.tags
      .map(v => {
        return `${v.name} ${v.count}`
      })
      .join(',')
    const author = bookinfo.author.join(',')

    await bookGet
      .insertBooks([
        appid,
        isnb,
        rate,
        title,
        image,
        alt,
        publisher,
        summary,
        price,
        tags,
        author
      ])
      .then(res => {
        ctx.body = {
          code: 0,
          title,
          msg: '新增成功'
        }
      })
      .catch(err => {
        ctx.body = {
          code: -1,
          data: {
            msg: '新增失败:' + err
          }
        }
      })
  }
}

function getJson (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        const bookinfo = JSON.parse(urlData)
        if (bookinfo.title) {
          resolve(bookinfo)
        }
        reject(bookinfo)
      })
    })
  })
}
