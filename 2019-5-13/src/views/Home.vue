<template>
  <div class="home">
    <ul
      class="list"
      v-for="(items, indexs) of setList"
      :key="indexs"
      :style="{ top: indexs * 8 * 20 + 'px' }"
    >
      <li
        class="item"
        v-for="(item, index) of items"
        :key="index"
        @click="newList"
        :style="[
          indexs % 2 == 0
            ? { top: index * 20 + 'px', left: index * 20 + 'px' }
            : { top: index * 20 + 'px', right: index * 20 + 'px' }
        ]"
      >
        {{ index }}
        <div
          class="shade"
          :style="[ indexs * 8 + index + 1 !== lists.length
           ? { background: bgc[index % 4] } 
           : null
        ]"
        ></div>
      </li>
    </ul>
    <input type="text" v-model="lists" />
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      lists: [1],
      bgc: ["#1914ff", "#1eff00", "#0af0aa", "#00e1e1"]
    };
  },
  created() {
    document.body.className = 'transition'
    setTimeout(() => {
      document.body.className += " demo"
    })
  },
  methods: {
    newList() {
      this.lists.push(1);
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
  }
};
</script>

<style lang="stylus">
.list
  position relative
  width 170px
  left 50px
.item
  position absolute
  width 50px
  height 50px
  background-color #000
.shade 
  width 100%
  height 100%
  position absolute
  left 0
  top 0
  // background-color #000
</style>
