const router = require('koa-router')({
  prefix: '/weapp'
})

const controller = require('../controllers')

// 测试
router.get('/demo', controller.demo)

// 保存用户信息
router.post('/user', controller.user)

// 添加图书
router.post('/addbook', controller.addbook)

// 添加评论
router.post('/addcomment', controller.addComment)

// 图书列表
router.get('/booklist', controller.booklist)

// 评论列表
router.get('/commentlist', controller.commentlist)

// 图书详情
router.get('/bookdetail', controller.bookdetail)

// 热门图书
router.get('/bookhots', controller.bookhots)

module.exports = router
