<template>
  <div class="home">
    <header class="g-header-container">
      <home-header/>
    </header>
    <div>
      <home-slider/>
    </div>
    <div class="g-backtop-container"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import homeHeader from './header'
import homeSlider from './slider'

export default {
  name: 'Home',
  components: {
    homeHeader,
    homeSlider
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
