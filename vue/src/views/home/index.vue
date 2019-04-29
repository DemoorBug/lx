<template>
  <div class="home">
    <header class="g-header-container">
      <home-header/>
    </header>
    <me-scroll>
      <home-slider/>
      <home-slider/>
      <home-slider/>
      <home-slider/>
      <home-slider/>
    </me-scroll>
    <div class="g-backtop-container"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import homeHeader from './header'
import homeSlider from './slider'
import MeScroll from 'base/scroll'

export default {
  name: 'Home',
  components: {
    homeHeader,
    homeSlider,
    MeScroll
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_mixins.less';
.home {
  width: 100%;
  height: 100%;
  background: @bgc-theme;
}
</style>
