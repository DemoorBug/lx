<template>
  <div class="me-productions">
    <ul class="me-list">
      <li
        class="me-item"
        v-for="(item, index) in list"
        :key="index"
        :class="{'hoverBg': index == hoverIndex}"
        @mouseover="hoverIndex = index"
        :style="{ left: index * 55 + 'px', zIndex: 999 - index }"
      >
        <router-link :to="'/video/' + index" class="link-name">
          <div class="img">
          <img :src="item.imgSrc" class="img">
          </div>
          <p>{{ item.title }}</p>
          <p>(2019)</p>
          <p class="p-b">Theatre of Imagination (toi) is an experimental theatre project that publishes film poem zine as re-materualised cinema.</p>
        </router-link>
        <div
          class="shade transition"
          :style="{ background: bgc[index % 4] }"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "productions",
  data() {
    return {
      list: [1, 2, 3, 4],
      bgc: ["#00e1e1", "#0af0aa", "#1eff00", "#1914ff"],
      hoverIndex: 0
    };
  },
  created() {
    document.body.className = 'transition';
    setTimeout(() => {
      document.body.className += " productions";
    });
    axios.get('/mock/productions.json').then((data) => {
      this.list = data.data
    })
  }
}
</script>

<style lang="stylus" scoped>
.me-list
  position absolute
  left 50%
  top 50%
  margin-top -260px
  margin-left -235px
.me-item
  width 300px
  padding 35px 30px 0
  border solid 7px #000
  height 420px
  background-color #fff
  top 0
  text-align center
  position absolute
  font-size 14px
  font-weight bold
  line-height 20px
  p
    color: #0000f9 !important
.p-b
  font-weight 700
  font-size 12px
  line-height 16px
.link-name
  display block
  width 100%
  height 100%
.hoverBg
  z-index 99999 !important
  .shade
    display none !important
.img
  height 242px
  overflow hidden
  width 172px
  margin-bottom 10px
  margin 0 auto 10px 
  img 
    display block
    width 100%
</style>