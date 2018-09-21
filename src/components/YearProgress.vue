<template>
  <div class="progress-bar">
    <progress active="true" :percent="precent" color="#EA5149" stroke-width="8"/>
    <p>{{year}}年已经过去了<span>{{days}}</span>天，<span>{{precent}}%</span></p>
  </div>
</template>
<script>
export default {
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        // 闰年
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start就是今年的第一天
      // 今天的时间戳 减去今年第一天的时间戳 为已经过去的时间
      let offset = new Date().getTime() - start.getTime()

      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    precent () {
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
    }
  }
}
</script>

<style lang="scss">
.progress-bar {
  width: 100%;
  text-align: center;
  margin-bottom: 40rpx;

  progress {
    margin-bottom: 16rpx;
  }

  p {
    font-size: 30rpx;

    span {
      color: #ea5149;
    }
  }
}
</style>
