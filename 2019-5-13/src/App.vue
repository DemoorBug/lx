<template>
  <div id="app" class="container">
    <div class="row">
      <me-navbar class="col-md-2"></me-navbar>
      <div class="col-md-9 heg">
        <transition
          enter-active-class="animated fadeInDown"
        >
          <router-view class="heg"/>
        </transition>
      </div>
      <me-footer class="col-md-1"></me-footer>
    </div>

  </div>
</template>
<script>
import MeNavbar from 'base/navbar';
import MeFooter from 'base/footer';

export default {
  name: "App",
  components: {
    MeNavbar,
    MeFooter
  }
}
</script>
<style lang="stylus" scoped>
#app
  height 100%
  // padding-top 50px
.heg
  height 100%
.row
  height 100%
@media (min-width: 1200px)
  .container {
      // width: 1330px;
  }
</style>
