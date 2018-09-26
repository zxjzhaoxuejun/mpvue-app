<template>
  <div class="comment-mode">
    <div class="" v-if="appid">
    <div class="my-comment">
      <div class="my-mode-title" >【我的评论】</div>
      <CommentList :comments='comments' modeType="user"></CommentList>
    </div>
    <div class="my-book">
      <div class="my-mode-title" >【我的图书】</div>
      <CardList v-for="book in books" :key="book.id" :book="book"></CardList>
      <div class="no-book red-color" v-if="!books.length">暂时还没添加过书，快去个人中心添加几本吧...</div>
    </div>
    </div>
    <div v-else>
      你还没有登录，请先登录...
    </div>
  </div>
</template>
<script>
import CommentList from '@/components/CommentList'
import CardList from '@/components/CardList'
import { get } from '@/utils/utils'
export default {
  data() {
    return {
      comments: [],
      appid: '',
      books: []
    }
  },
  components: {
    CommentList,
    CardList
  },
  methods: {
    init() {
      wx.showNavigationBarLoading()
      this.getMyComment()
      this.getMyBook()
      wx.hideNavigationBarLoading()
    },
    async getMyComment() {
      const comments = await get('/mpvue/commentlist', {
        appid: this.appid
      })
      this.comments = comments.data
    },
    async getMyBook() {
      const book = await get('/mpvue/booklist', { appid: this.appid })
      this.books = book.data
    }
  },
  onPullDownRefresh() {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow() {
    if (!this.appid) {
      let userId = wx.getStorageSync('appInfoData')
      if (userId) {
        this.appid = userId.openid
        this.init()
      }
    }
  }
}
</script>
<style lang="scss">
.comment-mode {
  font-size: 30rpx;

  .no-book {
    text-align: center;
    padding: 20rpx 0;
  }
}
</style>
