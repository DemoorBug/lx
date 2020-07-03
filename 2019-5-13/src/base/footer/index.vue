<template>
  <div class="right">
    <div class="me-footer">
      <router-link to="/" class="me-center">
        theatre
      </router-link>
      <div class="me-center-t">
        f
      </div>
      <div class="me-center-b">
        imagination
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeFooter"
}
</script>

<style lang="stylus" scoped>
.me-footer
  position fixed
  top 0
  color #fff
  height 100%
  margin-left 47px
  font-family "DIN-Condensed-Bold-2"
  font-size 18px
  letter-spacing 2px
  padding-top 50px
.me-center
  position absolute
  top 50px;
  writing-mode: vertical-lr;
  color: #fff
.me-center-t
  position absolute
  width: 50px
  height: 50px
  top 50%;
  margin-top: -25px
  writing-mode: vertical-lr
  font-family: "SnellRoundhand-BlackScript"
.me-center-b
  position absolute
  bottom 50px
  writing-mode: vertical-lr;
.router-link-exact-active {
  color: #fff !important;
}
</style>