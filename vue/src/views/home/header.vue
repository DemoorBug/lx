<template>
  <me-navbar class="header" v-show="visible">
    <i class="iconfont icon-scan" slot="left"></i>
    <me-search-box
      slot="center"
      placeholder="开学季有利，好货5折起"
      @query="getSearch"
      :fake="true"
      @click.native="toGo"
    />
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
import MeNavbar from 'base/navbar'
import MeSearchBox from 'base/search-box'

export default {
  name: 'homeHeader',
  components: {
    MeNavbar,
    MeSearchBox
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    getSearch (query) {
      console.log(query)
    },
    toGo () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_mixins.less';

.header {
  background-color: transparent;
  transition: background-color 0.5s;
  .iconfont {
    color: @icon-color-default;
    font-size: @icon-font-size;
  }
  &.header-transition {
    background-color: @header-bgc-translucent;
  }
}
</style>
