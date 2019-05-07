<template>
  <div class="home">
    <header class="g-header-container">
      <home-header/>
    </header>
    <me-scroll
      :data="recommends"
      :scrollbar="false"
      pullDown
      @pull-down="pullToRefresh"
    >
      <home-slider ref="slider"/>
      <home-nav/>
      <home-recommend @loading="getRecommend"/>
    </me-scroll>
    <div class="g-backtop-container"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import homeHeader from './header'
import homeSlider from './slider'
import homeNav from './nav'
import homeRecommend from './recommend'
import MeScroll from 'base/scroll'

export default {
  name: 'Home',
  components: {
    homeHeader,
    homeSlider,
    MeScroll,
    homeNav,
    homeRecommend
  },
  data () {
    return {
      recommends: []
    }
  },
  methods: {
    getRecommend (recommends) {
      this.recommends = recommends
    },
    pullToRefresh (end) {
      this.$refs.slider.update().then(end)
      // setTimeout(() => {
      //   console.log('s')
      //   end()
      // }, 1000)
    }
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
