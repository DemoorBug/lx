<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item, index) of navs" :key="index">
        <a :href="item.linkUrl" class="nav-link">
          <img :src="item.picUrl" alt="" class="nav-pic">
          <span class="nav-text">{{ item.text }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { navs } from './config'

export default {
  name: 'HomeNav',
  created () {
    this.navs = navs
  }
}
</script>

<style lang="less" scoped>
.nav {
  width: 100%;
  padding-top: 9px;
  &-list {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    width: 20%;
    margin-bottom: 15px;
  }
  &-link {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-pic {
    width: 60%;
    margin-bottom: 8px;
  }
}
</style>
