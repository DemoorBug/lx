<template>
  <div id="app">
    <!-- <router-view/> -->
    <img src="./assets/logo.png" alt="">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="less">
#app {
  height: 100%;
  text-align: center;
}
</style>
