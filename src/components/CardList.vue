<template>
<a :href="detailUrl" >
  <div class="book-list">
     <div class="book-left" @click.stop="preview">
       <img :src="book.image" class="img" mode="aspectFit" />
     </div>
     <div class="book-right">
       <div class="b-row">
         <div class="text-info left-text red-color">{{book.title}}</div>
         <div class="text-info">
           {{book.rate}}
          <Rate :rate="book.rate"></Rate>
         </div>
       </div>
       <div class="b-row">
         <div class="text-info left-text">{{book.author}}</div>
         <div class="text-info red-color">浏览量:{{book.count}}</div>
       </div>
       <div class="b-row">
         <div class="text-info left-text">{{book.publisher}}</div>
         <div class="text-info">{{book.nickName}}</div>
       </div>
     </div>
   </div>
</a>
</template>
<script>
import Rate from '@/components/Rate'
export default {
  props: {
    book: {
      type: [Object],
      default: ''
    }
  },
  components: {
    Rate
  },
  computed: {
    detailUrl () {
      return `/pages/detail/main?id=${this.book.id}`
    }
  },
  methods: {
    preview () {
      // 图片预览
      wx.previewImage({
        current: this.book.image, // 当前显示图片的http链接
        urls: [this.book.image] // 需要预览的图片http链接列表
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.book-list {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 20rpx;
  font-size: 24rpx;
  border-bottom: 1px #fafafa solid;
  overflow: hidden;

  .book-left {
    width: 180rpx;
    height: 180rpx;
    overflow: hidden;
    margin-right: 20rpx;

    .img {
      max-width: 100%;
      display: inline-block;
      max-height: 100%;
    }
  }

  .book-right {
    flex-grow: 1;
  }

  .b-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;

    .left-text {
      max-width: 320rpx;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
