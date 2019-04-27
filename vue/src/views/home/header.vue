<template>
  <me-navbar class="header">
    <i class="iconfont icon-scan" slot="left"></i>
    <div slot="center">搜索框</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
import MeNavbar from 'base/navbar'

export default {
  name: 'homeHeader',
  components: {
    MeNavbar
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_mixins.less';

.header {
  background-color: transparent;
  .iconfont {
    color: @icon-color-default;
    font-size: @icon-font-size;
  }
}
</style>
