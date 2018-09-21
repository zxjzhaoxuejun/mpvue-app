<template>
    <div class="container">
      <div class="user-info" @click="login">
        <p>{{userInfo.openId}}</p>
        <img :src="userInfo.avatarUrl" alt="头像" />
        <div class="user-name">{{userInfo.nickName}}</div>
      </div>
      <YearProgress></YearProgress>
     <button @click="scanBook" class="btn btn-add">添加图书</button>
    <div class="madel-mode" v-if="showModel">
      <div class="madel-bg"></div>
      <div class="madel-con">
        <div class="madel-title">获取微信授权信息</div>
        <div class="madel-body">微信登录需要获取您的用户信息，请前往设置</div>
        <div class="madel-btn"><button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="agreeGetUser">去设置</button></div>
      </div>
    </div>
  </div>
</template>
<script>
import YearProgress from '@/components/YearProgress'
import { post, showModal, outsideReq } from '@/utils/utils'
export default {
  data () {
    return {
      userInfo: {
        avatarUrl: '../../static/img/unlogin.png',
        nickName: '点击登录'
      },
      showModel: '',
      appInfo: ''
    }
  },
  components: {
    YearProgress
  },
  mounted () {
    let self = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync('loginInfo', res.userInfo)
              // 用户已经授权过
              self.showModel = false
              console.log('用户已经授权过')
            }
          })
        } else {
          self.showModel = true
          wx.setStorageSync('loginInfo', {
            avatarUrl: '../../static/img/unlogin.png',
            nickName: '点击登录'
          })
          console.log('用户还未授权过')
        }
      }
    })
    wx.login({
      // 获取code
      success: async function (res) {
        const appInfo = await outsideReq(
          `https://xyy51.cn/login.php?code=${res.code}`,
          'GET'
        )
        let info = { ...self.userInfo }
        info['appid'] = appInfo.openid
        info['sessionKey'] = appInfo.session_key
        self.appInfo = appInfo
        wx.setStorageSync('appInfoData', appInfo)

        // const firstLogin = wx.getStorageSync('skey')
        // console.log(firstLogin)
        // if (!firstLogin) {
        await post('/weapp/user', info)
        // }
      }
    })
  },
  methods: {
    async addBook (isnb) {
      const res = await post('/weapp/addbook', {
        isnb: isnb,
        appid: this.appInfo.openid
      })
      showModal(res.msg, `${res.title}添加成功！`)
    },
    scanBook () {
      // 允许从相机和相册扫码
      wx.scanCode({
        success: res => {
          if (res.result) {
            this.addBook(res.result)
          } else {
            showModal('提示', '图书找不到...')
          }
        }
      })
    },
    login () {
      let self = this
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
                wx.setStorageSync('loginInfo', res.userInfo)
                // 用户已经授权过
                self.showModel = false
                console.log('用户已经授权过')
              }
            })
          } else {
            self.showModel = true
            console.log('用户还未授权过')
          }
        }
      })
    },
    // 获取用户信息新接口
    agreeGetUser (e) {
      // 设置用户信息本地存储
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse('button.open-type.getUserInfo')) {
        // 用户版本可用
      } else {
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo (e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        // 用户按了允许授权按钮
        try {
          wx.setStorageSync('loginInfo', e.mp.detail.userInfo)
        } catch (e) {
          wx.showToast({
            title: '系统提示:网络错误',
            icon: 'warn',
            duration: 1500
          })
        }
        this.userInfo = wx.getStorageSync('loginInfo')
        console.log('用户按了允许授权按钮')
      } else {
        // 用户按了拒绝按钮
        this.userInfo = {
          avatarUrl: '../../static/img/unlogin.png',
          nickName: '点击登录'
        }
        console.log('用户按了拒绝按钮')
      }
      this.showModel = false
    }
  },
  created () {
    this.userInfo = wx.getStorageSync('loginInfo')
  }
}
</script>
<style lang="scss">
.container {
  width: 96%;
  height: 100%;
  margin: 0 auto;

  .user-info {
    margin: 40rpx 0;
    text-align: center;

    img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      margin-bottom: 20rpx;
    }

    .user-name {
      font-size: 32rpx;
    }
  }
}

.madel-mode {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;

  .madel-bg {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: #000;
    opacity: 0.6;
    z-index: 101;
  }

  .madel-con {
    width: 70%;
    height: auto;
    position: fixed;
    background: #fff;
    top: 30%;
    left: 15%;
    border-radius: 8rpx;
    z-index: 102;

    .madel-title {
      background: #f8f8f8;
      padding: 20rpx 0;
      text-align: center;
      border-radius: 8rpx 8rpx 0 0;
      font-size: 32rpx;
    }

    .madel-btn {
      border-radius: 0;

      button {
        border-radius: 0 0 8rpx 8rpx;
        font-size: 32rpx;
        color: #ea5149;
      }
    }

    .madel-body {
      padding: 30rpx 20px;
      text-align: center;
      font-size: 32rpx;
      color: #575757;
    }
  }
}
</style>
