<template>
  <div class="swiper-mode">
    <swiper :indicator-dots="indicatorDots" 
    :indicator-color="indicatorColor" 
    :indicator-active-color="activeColor"
    :autoplay="autoplay" 
    :interval="interval" 
    :duration="duration"
    :circular="circular"
    >
  <div :key="imgindex" v-for="(imgUrl,imgindex) in imgUrls">
    <swiper-item>
      <image :src="imgs.image" :key="imgs.id" v-for="imgs in imgUrl" class="slide-image" mode="aspectFit" @click="bookDetail(imgs.id)"/>
    </swiper-item>
  </div>
</swiper>
  </div>
</template>
<script>
import chunk from 'chunk'
export default {
  props: ['hots'],
  data () {
    return {
      indicatorDots: true,
      indicatorColor: '#ea5149',
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
      activeColor: '#fff'
    }
  },
  computed: {
    imgUrls () {
      let res = this.hots
      const arrHot = chunk(res, 3)
      console.log(...arrHot)
      return arrHot
    }
  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${item}`
      })
    }
  }
}
</script>
<style lang="scss">
.swiper-mode {
  margin-top: 10rpx;

  .slide-image {
    width: 33%;
    height: 260rpx;
  }
}
</style>
