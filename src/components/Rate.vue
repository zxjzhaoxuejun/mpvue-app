<template>
  <div class="rate-mode">
    <span class="red-color">☆☆☆☆☆</span>
    <div class="hollow red-color" :style="style">★★★★★</div>
  </div>
</template>
<script>
export default {
  props: {
    rate: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    style() {
      return `width:${this.rate / 2}em`
    }
  }
}
</script>
<style lang="scss" scoped>
.rate-mode {
  position: relative;
  display: inline-block;

  .hollow {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
  }
}
</style>
