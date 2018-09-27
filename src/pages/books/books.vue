<template>
  <div>
    <TopSwiper :hots="hots"></TopSwiper>
   <CardList :book="book" :key="book.id" v-for="book in books"></CardList>
   <div class="text-footer" v-if="!more">我是有底线滴~~~</div>
  </div>
</template>
<script>
import { get } from '@/utils/utils'
import CardList from '@/components/CardList'
import TopSwiper from '@/components/TopSwiper'
export default {
  // 如果35条数据
  // 每次加载10条 size
  // 1页 0-10
  // 2   10-20
  // 3   20-30
  // 4   30-40
  // page  当前第几页
  // 没有更多数据
  // page=1,

  data() {
    return {
      books: [],
      page: 1,
      more: true,
      size: 10,
      hots: []
    }
  },
  components: {
    CardList,
    TopSwiper
  },
  methods: {
    // init初始化时只加载第一页
    async getBookList(init) {
      if (init) {
        this.page = 1
        this.more = true
      }
      wx.showNavigationBarLoading()
      const book = await get('/mpvue/booklist', {
        page: this.page,
        size: this.size
      })

      if (book.data.length < 10 && this.page > 1) {
        this.more = false
      }
      if (init) {
        this.books = book.data
        console.log(book)
        wx.stopPullDownRefresh()
      } else {
        // 底部拉取加载，不能直接覆盖books 而是累加
        this.books = [...this.books, ...book.data]
      }

      wx.hideNavigationBarLoading()
    },
    async getHots() {
      const hots = await get('/mpvue/bookhots')
      this.hots = hots.data
    }
  },
  onPullDownRefresh() {
    this.getBookList(true)
    this.getHots()
    console.log('下拉')
  },
  onReachBottom() {
    // 底部刷新
    console.log('底部刷新')
    this.page = this.page + 1
    this.getBookList()
  },
  onShow() {
    this.getBookList(true)
    this.getHots()
  }
}
</script>
<style lang="scss">
</style>
