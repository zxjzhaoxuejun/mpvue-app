<template>
  <div class="book-info">
    <div class="thumb">
      <img :src="info.image" class="img-bg" mode="aspectFill" />
      <img :src="info.image" class="des-img" mode="aspectFit" />
      <div class="book-text">
        <h3 class="book-title">{{info.title}}</h3>
        <div class="book-aut">作者：{{info.author}}</div>
      </div>
    </div>
    <div class="add-info">
      <div class="b-row">
         <div class="text-info left-text">
           <img :src="info.avatarUrl" class="avatar-pic" />
           {{info.nickName}}
           </div>
         <div class="text-info red-color">
           {{info.rate}}
          <Rate :rate="info.rate"></Rate>
         </div>
       </div>
       <div class="b-row">
         <div class="text-info left-text red-color">{{info.publisher}}</div>
         <div class="text-info">
           价格：{{info.price}}
         </div>
       </div>
       <div class="tags">
         <span class="tags-item red-color" :key="tag" v-for="tag in tags">{{tag}}</span>
       </div>
       <div class="con-info">
         <h3 class="con-title">【图书介绍】</h3>
         <p class="con-item" :key="index" v-for="(con,index) in content">{{con}}</p>
       </div>
    </div>
  </div>
</template>
<script>
import Rate from '@/components/Rate'
export default {
  props: {
    info: {
      type: [Object],
      default: ''
    }
  },
  components: {
    Rate
  },
  computed: {
    tags () {
      if (this.info.tags) {
        return this.info.tags.split(',')
      }
    },
    content () {
      if (this.info.summary) {
        return this.info.summary.split('\n')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.book-info {
  width: 750rpx;
  // height: 500rpx;

  .thumb {
    position: relative;
    overflow: hidden;

    .book-text {
      position: absolute;
      top: 320rpx;
      width: 100%;
      color: #ffffff;
      font-size: 34rpx;
    }

    .book-title {
      text-align: center;
    }
    .book-aut {
      text-align: center;
      font-size: 30rpx;
      margin-top: 10rpx;
    }
  }
  .img-bg {
    width: 100%;
    filter: blur(10px);
  }
  .des-img {
    position: absolute;
    top: 30rpx;
    left: 0;
    width: 100%;
    height: 280rpx;
  }

  .add-info {
    margin-top: 20rpx;

    .b-row {
      display: flex;
      justify-content: space-between;
      padding: 0 20rpx 20rpx 20rpx;
      font-size: 28rpx;

      .left-text {
        max-width: 320rpx;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
      }

      .avatar-pic {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        margin-right: 10rpx;
        vertical-align: middle;
      }
    }

    .tags {
      width: 100%;
      padding: 0 20rpx;

      .tags-item {
        display: inline-block;
        padding: 10rpx 20rpx;
        border: 1px #ea5149 solid;
        border-radius: 10rpx;
        font-size: 28rpx;
        margin: 8rpx;
      }
    }

    .con-info {
      padding: 20rpx;

      .con-item {
        text-indent: 50rpx;
        line-height: 50rpx;
        font-size: 28rpx;
        margin-bottom: 20rpx;
      }
    }
  }
}
</style>
