<template>
  <swiper :options="swiperOption">
    <!-- <swiper-slide v-for="item in sliders">
      <a href="#">
        <img src="" alt="">
      </a>
    </swiper-slide> -->
    <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination">
    </div>
  </swiper>
</template>

<script>
import { swiper } from 'vue-awesome-swiper'

export default {
  name: 'MeSlider',
  components: {
    swiper
  },
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return [
          'horizontal',
          'vertical'
        ].includes(value)
      }
    },
    interval: {
      type: Number,
      default: 3000,
      validator (value) {
        return value >= 0
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      swiperOption: {
        watchOverflow: true, // 仅有一张图,禁止滑动
        direction: this.direction,
        autoplay: this.interval ? {
          delay: this.interval,
          disableOnInteraction: false // 如果自动轮播时,有触摸发生就会停止,false就是不停止,那不好吧?
        } : false,
        slidesPerView: 1, // 容器同时显示几张图片
        loop: this.loop,
        pagination: { // 分页器?
          el: this.pagination ? '.swiper-pagination' : null,
          clickable: true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>
