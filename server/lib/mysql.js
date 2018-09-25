// 建立了数据库的连接池
const mysql = require('mysql')
const config = require('../config/default.js')

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

// 创建一个函数query，通过返回promise的方式
// 以便可以方便用.then()来获取数据库返回的数据

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      // 使用连接
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            // 使用连接执行查询
            resolve(rows)
          }
          // 连接不再使用，返回到连接池
          connection.release()
        })
      }
    })
  })
}

// 创建用图书表
let books = `create table if not exists books(
  id INT NOT NULL AUTO_INCREMENT,
  appid VARCHAR(50) NOT NULL COMMENT '微信id',
  isnb VARCHAR(50) NOT NULL COMMENT '图书编号',
  title VARCHAR(100) NOT NULL COMMENT '图书名',
  summary VARCHAR(3000) NOT NULL,
  image VARCHAR(255) NOT NULL COMMENT '展示图',
  alt VARCHAR(100) NOT NULL COMMENT '地址',
  tags VARCHAR(200) DEFAULT NULL COMMENT '标签',
  author VARCHAR(100) DEFAULT NULL COMMENT '作者',
  publisher VARCHAR(100) NOT NULL COMMENT '出版社',
  price VARCHAR(100) DEFAULT NULL COMMENT '价格',
  rate float DEFAULT 0,
  count int DEFAULT 0,
  PRIMARY KEY (id)
)ENGINE=InnoDB;`

// 创建用图书表
let comments = `create table if not exists comments(
  cid INT NOT NULL AUTO_INCREMENT,
  appid VARCHAR(50) NOT NULL COMMENT '微信id',
  comment VARCHAR(200) NOT NULL COMMENT '评论',
  phone VARCHAR(100) DEFAULT NULL COMMENT '手机型号',
  location VARCHAR(100) DEFAULT NULL COMMENT '地理位置',
  bookid int(11) NOT NULL COMMENT '书id',
  createTime bigint(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (cid)
);`

let createTable = function (sql) {
  return query(sql, [])
}
// 建表
createTable(books)
createTable(comments)

// 新增图书
let insertBooks = value => {
  let _sql = `insert into books set appid=?,isnb=?,rate=?,title=?,image=?,alt=?,publisher=?,summary=?,price=?,tags=?,author=?;`
  return query(_sql, value)
}
// 新增评论
let insertComments = value => {
  let _sql = `insert into comments set appid=?,comment=?,phone=?,location=?,bookid=?,createTime=?;`
  return query(_sql, value)
}

// 保存登录用户信息
let saveUser = value => {
  let _sql = `insert into user_info set appid=?,avatarUrl=?,city=?,country=?,gender=?,language=?,nickName=?,province=?,sessionKey=?;`
  return query(_sql, value)
}

// 查询用户
let findUser = appid => {
  let _sql = `select * from user_info where appid="${appid}";`
  return query(_sql)
}

// 按照图书编号查询图书
let findBookIsnb = isnb => {
  let _sql = `select * from books where isnb="${isnb}";`
  return query(_sql)
}

// 查询所有图书
let findAllBooks = () => {
  let _sql = `select * from books,user_info where books.appid=user_info.appid order by id desc;`
  return query(_sql)
}

// 查询我添加的所有图书
let findMyBooks = appid => {
  let _sql = `select * from books,user_info where books.appid=user_info.appid and books.appid="${appid}" order by id desc;`
  return query(_sql)
}

// 查询所有评论
let findAllComments = bookid => {
  let _sql = `select * from comments,user_info where comments.appid=user_info.appid and bookid=${bookid} order by cid desc;`
  return query(_sql)
}

// 查询我的评论
let findMyComments = appid => {
  let _sql = `select * from comments,user_info where comments.appid=user_info.appid and comments.appid="${appid}" order by cid desc;`
  return query(_sql)
}

// 按照图书浏览量查询
let findBooksCount = () => {
  let _sql = `select id,title,count,image from books order by count desc limit 9;`
  return query(_sql)
}

// 分页查询图书
let findByPage = (page, size) => {
  // 每页10条
  let _sql = `select * from books,user_info where books.appid=user_info.appid order by id desc limit ${(page -
    1) *
    size},${size} ;`
  return query(_sql)
}

// 累加浏览量
let findUpdateView = id => {
  let _sql = `update books set count=count+1 where id=${id};`
  return query(_sql)
}

// 图书详情
let findDetail = id => {
  let _sql = `select * from books where id=${id} limit 1;`
  return query(_sql)
}

// 按照点赞量排序查询
let findPostsLikes = () => {
  let _sql = `select * from articles ORDER BY pv DESC limit 10;`
  return query(_sql)
}

// 删除点赞
let deleteLike = (uid, postid) => {
  let _sql = `delete from likes where uid="${uid}" and postid="${postid}"`
  return query(_sql)
}

module.exports = {
  query,
  createTable,
  insertBooks,
  findUpdateView,
  findByPage,
  findBookIsnb,
  findPostsLikes,
  deleteLike,
  findAllBooks,
  saveUser,
  findUser,
  findBooksCount,
  findDetail,
  insertComments,
  findAllComments,
  findMyComments,
  findMyBooks
}
