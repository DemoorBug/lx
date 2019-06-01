<template>
  <div>
    <div class="me-home" v-if="lists != 0">
      <transition-group
        tag="div"
        :name="indexa % 2 == 0 ? 'list' : 'right'"
      >
        <template 
          v-for="(items, indexs) of setList"
        >
          <transition-group
            tag="ul"
            :name="indexs % 2 == 0 ? 'list' : 'right'"
            class="me-list"
            :key="indexs"
            :style="{ top: indexs * 8 * 30 + 'px' }"
          >
            <li
              class="me-item"
              v-for="(item, index) of items"
              :key="index + 100"
              @click="newList(index)"
              :style="[
                indexs % 2 == 0
                  ? { top: index * 30 + 'px', left: index * 30 + 'px' }
                  : { top: index * 30 + 'px', right: index * 30 + 'px' }
              ]"
            >
              <div class="fl me-item-l"><span class="me-item-span">{{ item.title }}</span><span class="me-item-spanT">{{ item.lorem }}</span></div>
              <div class="fl me-item-r">
                <div class="me-item-o">{{ item.TheContent }}</div>
                <div class="me-item-t">{{ item.TheContentOf }}</div>
                <div class="me-item-s">{{ item.UnderTheContent }}</div>
              </div>
              <div
                class="shade transition"
                :style="[ indexs * 8 + index + 1 !== lists.length
                 ? { background: bgc[index % 4] } 
                 : null
              ]"
              ></div>
            </li>
          </transition-group>
        </template>
      </transition-group>  
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "MeHome",
  data() {
    return {
      lists: [],
      bgc: ["#00e1e1", "#0af0aa", "#1eff00", "#1914ff"],
      indexa: 0,
      time: null,
      indexs: 0,
      data: [],
      i: 0
    };
  },
  created() {
    document.body.className = 'transition';
    setTimeout(() => {
      document.body.className += " home";
    });
    axios.get('/mock/home.json').then((data) => {
      this.data = data.data
      this.lists.push(data.data[0])
    })
  },
  methods: {
    newList(index) {
      if (this.i >= this.data.length - 1) return
      if (index == 7) {
        ++this.indexa
        this.indexs = 0
      }
      this.i++
      this.indexs++
      this.lists.push(this.data[this.i]);
    },
    chunk(arr, size) {
      size = size || 1;
      var result = [];
      // 我这里能想到的是遍历
      var l = arr.length; //数组的长度
      var s = Math.ceil(l / size); //  假如我们有长度为10的数组，size传入的是3，是要分成4个自数组的。
      for (var i = 0; i < s; i++) {
        result[i] = arr.slice(size * i, size * (i + 1));
      }
      return result;
    }
  },
  computed: {
    setList() {
      return this.chunk(this.lists, 8);
    }
  },
  updated() {
      this.$nextTick(() => {
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          let div = document.querySelector('html');
          div.scrollTop = div.scrollHeight;
        }, 1000)
          
      })
  }
};
</script>

<style lang="stylus" scoped>
.me-home
  position absolute
  left 50%
  top 50%
  margin-top -300px
  margin-left -150px
.me-list
  position relative
  width 480px
.me-item
  position absolute
  width 300px
  height 490px
  border: 7px solid #1d1b1b
  background-color #fff
  color #1503f9
  overflow hidden
  &-l
    width 80px
    height 100%
  &-span
    writing-mode: vertical-lr;
    font-size: 30px
    font-weight bold
    width 80px
    line-height 80px
    margin-right 12px
    display block
    margin-top 50px
    letter-spacing: 4px
    font-family 'Memphis-Bold'
    height 300px
    overflow hidden
    word-break:break-all
  &-spanT
    display inline-block
    font-size 12px
    width 100%
    padding 0 10px
    word-break:break-all
    font-family "Memphis-Medium"
  &-r
    width 170px
    font-weight bold
    word-break:break-all
    line-height 18px
    font-size 15px
    font-family "DIN-Condensed-Bold-2"
  &-o
    margin-top 60px
    font-size 16px
    line-height 17px
    height 80px
    overflow hidden
  &-t
    margin-top 40px
  &-s
    margin-top 10px
.shade 
  width 100%
  height 100%
  position absolute
  left 0
  top 0
/*.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translate(-30px, -30px);
}
.right-item {
  display: inline-block;
  margin-right: 10px;
}
.right-enter-active, .right-leave-active {
  transition: all 1s;
}
.right-enter, .right-leave-to {
  opacity: 0;
  transform: translate(30px, -30px);
}*/
</style>