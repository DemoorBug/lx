<template>
  <div class="mine-navbar">
    <div class="mine-navbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="mine-navbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="mine-navbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <h1 class="mine-navbar-title" v-if="title">
      <span class="mine-navbar-text ellipsis" v-text="title"></span>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'MeNavbar',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_mixins.less';

.mine-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: @navbar-height;
  background-color: #fff;
  &-left {
    margin-left: 20/@r;
  }
  &-center {
    flex: 1;
    margin: 0 20/@r;
  }
  &-right {
    margin-right: 20/@r;
  }
  &-title {
    position: absolute;
    left: 20%;
    right: 20%;
    text-align: center;
    display: flex;
    align-items: center;
  }
  &-text {
    .ellipsis();
    font-size: 18px;
    width: 100%;
    line-height: 1.5;

  }
}

</style>
