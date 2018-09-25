<template>
<div>
  <div class="comm-list" v-for="comm in comments" :key="comm.cid" @click="handleClick(comm.bookid)">
    <div class="user-con">
      <div class="left-info">
        <img :src="comm.avatarUrl||img" alt="用户头像" class="t-pic" mode="aspectFit" />
        <span>{{comm.nickName}}</span>
      </div>
      <div class="right-info red-color">
        {{comm.createTime}}
      </div>
    </div>
    <div class="comm-con">
      <div class="con-info">
        {{comm.comment}}
      </div>
      <div class="bs-info">
        <span>城市：{{comm.location||'未知'}}</span>
        <span>机型：{{comm.phone||'未知'}}</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    comments: {
      type: [Object],
      default: ''
    },
    modeType: {
      type: [String],
      default: ''
    }
  },
  data() {
    return {
      img: '../../static/img/unlogin.png'
    }
  },
  methods: {
    handleClick(item) {
      if (this.modeType === 'user') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + item
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.comm-list {
  font-size: 28rpx;
  border: 1px #dedede solid;
  border-radius: 10rpx;
  margin: 20rpx;
  padding: 20rpx;

  .user-con {
    display: flex;
    justify-content: space-between;

    .t-pic {
      width: 40rpx;
      height: 40rpx;
      display: inline-block;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 8rpx;
    }
  }
  .comm-con {
    padding-top: 20rpx;

    .con-info {
      line-height: 50rpx;
    }

    .bs-info {
      display: flex;
      justify-content: space-between;
      color: #666;
      font-size: 26rpx;
      margin-top: 10rpx;
    }
  }
}
</style>
