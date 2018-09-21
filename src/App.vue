<script>
export default {
  async created () {}
}
</script>

<style lang="scss">
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.btn {
  display: inline-block;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  color: #ffffff;
  background: #ea5149;
  font-size: 32rpx;

  &:hover {
    background: #fa5149;
  }
}
.red-color {
  color: #ea5149;
}

.text-footer {
  text-align: center;
  color: #ea5149;
  padding: 28rpx;
  font-size: 30rpx;
  border-top: 1px #fafafa solid;
}
</style>
