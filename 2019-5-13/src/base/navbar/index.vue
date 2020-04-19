<template>
  <div class="me-navbar">
    <div class="me-loc">
      <router-link to="/" class="me-home transition">Home</router-link>
      <router-link to="/productions" class="me-home transition me-z">productions</router-link>
      <span class="me-home transition">backstage</span>
      <span class="me-home transition">contact</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeNavbar"
}
</script>

<style lang="stylus" scoped>
.me-navbar
  padding-top 50px
.me-loc
  position fixed
  top 50px
.me-home
  font-family "DIN-Condensed-Bold-2"
  color #fff
  letter-spacing 2px
  display block
  line-height 36px
  font-size 16px
</style>