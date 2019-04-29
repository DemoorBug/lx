<template>
  <!-- 为什么要单个传输呢,是因为好效验 -->
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length"></me-loading>
    <me-slider
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-if="sliders.length"
    >
      <swiper-slide
        v-for="(item, index) of sliders"
        :key="index">
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt="" class="slider-img">
        </a>
      </swiper-slide>
    </me-slider>
  </div>

</template>

<script>
import MeSlider from 'base/slider'
import MeLoading from 'base/loading'
import { swiperSlide } from 'vue-awesome-swiper'
import { sliderOptions } from './config'
import { getHomeSlider } from 'api/home'

const { direction, loop, interval, pagination } = sliderOptions

export default {
  name: 'homeSlider',
  data () {
    return {
      direction,
      loop,
      interval,
      pagination,
      sliders: [
        // {
        //   'linkUrl': 'https://www.imooc.com',
        //   'picUrl': require('./1.jpg')
        // },
        // {
        //   'linkUrl': 'https://www.imooc.com',
        //   'picUrl': require('./2.jpg')
        // },
        // {
        //   'linkUrl': 'https://www.imooc.com',
        //   'picUrl': require('./3.jpg')
        // },
        // {
        //   'linkUrl': 'https://www.imooc.com',
        //   'picUrl': require('./4.jpg')
        // }
      ]
    }
  },
  components: {
    MeSlider,
    swiperSlide,
    MeLoading
  },
  created () {
    this.getSliders()
  },
  methods: {
    getSliders () {
      getHomeSlider().then(data => {
        this.sliders = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/less/_mixins.less";

.slider-wrapper {
  height: 183 * 2 / @r;
}
.slider-link {
  display: block;
}
.slider-link,
.slider-img {
  height: 100%;
}
</style>
