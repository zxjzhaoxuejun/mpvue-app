<template>
<div class="detail-mode">
  <BookInfo :info="bookInfo"></BookInfo>
  <h3 class="con-title">【评论】</h3>
  <CommentList :comments="comments"></CommentList>
  <div class="commet" v-if="showAdd">
    <textarea class="textarea" v-model="comment" placeholder="请输入短评..." auto-focus placeholder-style="color:#ea5149" maxlength="140"></textarea>
    <div class="location col-3">
      <span>地理位置</span>
      <span class="red-color">{{location}}</span>
      <switch color="#ea5149" :checked="location" class="min-switch" @change="getLocation"/>
    </div>
    <div class="phone col-3">
      <span>手机型号</span>
      <span class="red-color">{{phone}}</span>
      <switch color="#ea5149" :checked="phone" class="min-switch" @change="getPhone"/>
    </div>
    <button class="btn" @click="addComment">提交评论</button>
  </div>
  <div class="text-footer" v-else>
    {{footerInfo}}
  </div>
  <div class="share">
  <button class="btn" open-type="share">转发给好友</button>
  </div>
</div>
</template>
<script>
import { get, showModal, post } from '@/utils/utils'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  data() {
    return {
      bookId: '',
      bookInfo: '',
      location: '',
      phone: '',
      comment: '',
      appid: '',
      comments: [],
      footerInfo: ''
    }
  },
  components: {
    BookInfo,
    CommentList
  },
  computed: {
    showAdd() {
      if (!this.appid) {
        // 未登录
        this.footerInfo = '未登录不能评论...'
        return false
      }
      // 登录了但是已经评论过
      if (this.comments.filter(v => v.appid === this.appid).length > 0) {
        this.footerInfo = '已经评论了...'
        return false
      }
      return true
    }
  },
  methods: {
    async addComment() {
      // 评论表字段，书本id,用户appid，手机型号，地理位置，评论内容，评论时间
      let data = {
        bookid: this.bookId,
        phone: this.phone,
        location: this.location,
        appid: this.appid,
        comment: this.comment
      }
      if (this.comment) {
        console.log(data)
        const res = await post('/weapp/addcomment', data)
        showModal('评论提示', res.msg)
        this.comment = ''
        this.getComments()
      } else {
        showModal('评论提示', '请先输入评论...')
      }
    },
    async getDetail() {
      const info = await get('/weapp/bookdetail', { id: this.bookId })
      console.log(info.data)
      wx.setNavigationBarTitle({
        title: info.data.title
      })
      this.bookInfo = info.data
    },
    async getComments() {
      const commentList = await get('/weapp/commentlist', {
        bookid: this.bookId
      })
      this.comments = commentList.data
      console.log(commentList)
    },
    // 获取手机型号
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        console.log(phoneInfo)
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    // 获取地理位置
    getLocation(e) {
      const ak = 'zNXXG8Wjglx0boZYIZIrBHZuCPUzDTtT'
      const url = 'https://api.map.baidu.com/geocoder/v2/'
      // http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
      if (e.target.value) {
        wx.getLocation({
          // latitude:22.52291longitude:114.05454获取经度纬度
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                  // console.log('出错了')
                }
              }
            })
          }
        })
      } else {
        // 没选择
        this.location = ''
      }
    }
  },
  mounted() {
    this.bookId = this.$root.$mp.query.id
    this.getDetail()
    this.appid = wx.getStorageSync('appInfoData').openid
    this.getComments()
  }
}
</script>
<style lang="scss">
.detail-mode {
  .con-title {
    font-size: 32rpx;
  }

  .commet {
    padding: 0 20rpx;

    .textarea {
      width: inherit;
      height: 160rpx;
      font-size: 28rpx;
      padding: 10rpx;
      margin: 20rpx auto;
      border: 1px #ea5149 solid;
      border-radius: 10rpx;
    }

    .placeholder-class {
      color: #ea5149;
    }

    .col-3 {
      display: flex;
      justify-content: space-between;
      font-size: 30rpx;
      margin-bottom: 20rpx;

      .min-switch {
        zoom: 0.7;
      }
    }
  }

  .share {
    padding: 30rpx 20rpx;
  }
}
</style>
