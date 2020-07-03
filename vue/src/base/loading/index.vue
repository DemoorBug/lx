<template>
  <div class="mine-loading" :class="{ 'mine-loading-inline' : inline }">
    <span class="mine-loading-indicator" v-if="indicator">
      <slot>
        <div class="loading">
          <div>
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3"></div>
            <div class="c4"></div>
          </div>
        </div>
      </slot>
    </span>
    <span class="mine-loading-text" v-if="loadingText">{{ loadingText }}</span>
  </div>
</template>

<script>
export default {
  name: 'Meloading',
  props: {
    indicator: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: '加载中...'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loadingText: this.text
    }
  },
  watch: {
    text (text) {
      this.loadingText = text
    }
  },
  methods: {
    setText (text) {
      this.loadingText = text
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_mixins.less';

.mine-loading {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &&-inline {
    flex-direction: row;

    .mine-loading-indicator ~ .mine-loading-text{
      margin-top: 0;
      margin-left: 6px;
    }
  }

  &-indicator ~ &-text{
    margin-top: 6px;
  }
}

.loading > div {
  width: 60/@r;
  height: 60/@r;
  position: relative;
  // left: 50%;
  // margin-left: -30px;
  // top: 50%;
  // margin-top: -30px;
}
.loading > div > div {
  content: '';
  position: absolute;
  width: 16/@r;
  height: 16/@r;
  background: @header-bgc;
  top: 10/@r;
  left: 10/@r;
  transform-origin: 20/@r 20/@r;
  border-radius: 8/@r;
  animation: spin-a 1.5s infinite cubic-bezier(0.5, 0, 0.5, 1);
}

.loading > div > .c2 {
  top: 10/@r;
  left: auto;
  right: 10/@r;
  transform-origin: -4/@r 20/@r;
  animation: spin-b 1.5s infinite cubic-bezier(0.5, 0, 0.5, 1);
}
.loading > div > .c3 {
  top: auto;
  left: auto;
  right: 10/@r;
  bottom: 10/@r;
  transform-origin: -4/@r -4/@r;
  animation: spin-c 1.5s infinite cubic-bezier(0.5, 0, 0.5, 1);
}
.loading > div > .c4 {
  top: auto;
  bottom: 10/@r;
  transform-origin: 20/@r -4/@r;
  animation: spin-d 1.5s infinite cubic-bezier(0.5, 0, 0.5, 1);
}

@keyframes spin-a {
  0%   { transform: rotate(90deg); }
  0%  { transform: rotate(90deg); }
  50%  { transform: rotate(180deg); }
  75%  { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-b {
  0%   { transform: rotate(90deg); }
  25%  { transform: rotate(90deg); }
  25%  { transform: rotate(180deg); }
  75%  { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-c {
  0%   { transform: rotate(90deg); }
  25%  { transform: rotate(90deg); }
  50%  { transform: rotate(180deg); }
  50%  { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-d {
  0%   { transform: rotate(90deg); }
  25%  { transform: rotate(90deg); }
  50%  { transform: rotate(180deg); }
  75%  { transform: rotate(270deg); }
  75% { transform: rotate(360deg); }
  100% { transform: rotate(360deg); }
}

.loading > span {
  width: 100/@r;
  height: 30/@r;
  // position: absolute;
  // left: 50%;
  // margin-left: -50/@r;
  // top: 50%;
  // margin-top: 30/@r;
  text-align: center;
}

.content { padding: 1.5em; }
</style>
