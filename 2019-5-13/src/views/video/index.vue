<template>
  <div>
    <div class="me-hs">
      <video controls class="videos" v-if="list.videoSrc">
        <source :src="list.videoSrc" type="video/mp4">
        此浏览器不支持视频播放，请更换chrome浏览器
      </video>
      <div class="vid">{{ list.title }}</div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "videos",
  data() {
    return {
      list: {}
    };
  },
  created() {
    document.body.className = 'transition';
    setTimeout(() => {
      document.body.className += " video";
    });
    axios.get('/mock/productions.json').then((data) => {
      this.list = data.data[this.$route.params.id].children
    })
  }
}
</script>

<style lang="stylus" scoped>
.me-hs
  position absolute
  top 10%
.videos
  width 100%
.vid
  width 498px
  margin 0 auto
  margin-top 20px
  text-align center
</style>