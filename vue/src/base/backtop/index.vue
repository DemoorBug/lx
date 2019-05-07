<template>
  <transition name="mine-backtop">
    <a
      href="javascript:;"
      class="mine-backtop"
      v-show="visible"
      @click="backToTop"
    >
      <i class="iconfont icon-backtop"></i>
    </a>
  </transition>
</template>
<script>
  export default {
    name: 'MeBacktop',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backToTop() {
        this.$emit('backtop');
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~assets/less/_mixins.less";

  .mine-backtop {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;

    .iconfont {
      color: #fff;
      font-size: 38px;
    }
  }

  .mine-backtop {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
