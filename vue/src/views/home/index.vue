<template>
  <div class="home">
    <header class="g-header-container">
      <home-header :class="{ 'header-transition' : isHeaderTransition }" ref="header"/>
    </header>
    <me-scroll
      :data="recommends"
      :scrollbar="false"
      pullUp
      pullDown
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
      @scroll="scroll"
      @scroll-end="scrollEnd"
      @pull-down-transition-end="pullDownTransitionEnd"
      ref="scroll"
    >
      <home-slider ref="slider"/>
      <home-nav/>
      <home-recommend @loading="getRecommend" ref="recommend"/>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import homeHeader from './header'
import homeSlider from './slider'
import homeNav from './nav'
import homeRecommend from './recommend'
import MeScroll from 'base/scroll'
import MeBacktop from 'base/backtop'
import { HEADER_TRANSITION_HEIGHT } from './config'

export default {
  name: 'Home',
  components: {
    homeHeader,
    homeSlider,
    MeScroll,
    homeNav,
    homeRecommend,
    MeBacktop
  },
  data () {
    return {
      recommends: [],
      isBacktopVisible: false,
      isHeaderTransition: false
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
    },
    pullToLoadMore (end) {
      this.$refs.recommend.update().then(end).catch(err => {
        if (err) {
          console.log(err)
        }
        end()
        // 处理没有更多数据的情况
        // 禁止继续加载更多数据
        // 替换上拉时的loading，改为没有更多数据了
      })
    },
    scroll (translate) {
      this.changeHeaderStatus(translate)
    },
    scrollEnd (translate, scroll, pulling) { // 隐藏和显示
      if (!pulling) {
        this.changeHeaderStatus(translate)
      }
      this.isBacktopVisible = translate < 0 && -translate > scroll.height
    },
    backToTop () {
      this.$refs.scroll && this.$refs.scroll.scrollToTop()
    },
    changeHeaderStatus (translate) {
      if (translate > 0) {
        this.$refs.header.hide()
        return
      }
      this.$refs.header.show()

      this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT
    },
    pullDownTransitionEnd () {
      this.$refs.header.show()
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
