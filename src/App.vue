<script>
export default {
  async created() {}
}
</script>

<style lang="scss">
/* this rule will be remove */
$red: #ea5149;
$red-hover: #fa5149;

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
  background: $red;
  font-size: 32rpx;

  &:hover {
    background: $red-hover;
  }
}
.red-color {
  color: $red;
}

.text-footer {
  text-align: center;
  color: $red;
  padding: 28rpx;
  font-size: 30rpx;
  border-top: 1px #fafafa solid;
}
</style>
