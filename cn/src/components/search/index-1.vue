<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in processing"
        :key="index"
      >{{ item.name }}</li>
    </ul>
    <input type="number" :value="currIndex" @blur="currIndexs">
    <input type="text" :value="every" @blur="everys" :key="chang">
    <div>{{currIndex}}/ {{maxs}}-- {{ lengths }}</div>
    <input type="text" ref="userId">
    <button @click="search">提交</button>
    <slot></slot>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'search',
  props: {
    datas: [Object, Array, Function]
  },
  data () {
    return {
      data: {},
      dataSearch: {},
      length: 0,
      currIndex: 1,
      page: 0,
      every: 3,
      max: 0,
      chang: 0
    }
  },
  mounted () {
    // this.datas()
    this.init()
  },
  methods: {
    // 获取数据
    // datas () {
    //   return axios.get('/mock/index.json').then(data => {
    //     return new Promise(resolve => {
    //       console.log('num')
    //       resolve(data)
    //     })
    //     // console.log(data.data)

    //     // this.max = Math.ceil(this.data.length/this.every)
    //   })
    // },
    init () {
      this.datas().then(data => {
        this.data = data.data
        this.dataSearch = data.data
        this.length = this.data.length
      })
    },
    // 分页处理
    getPageCurData (data, PageSize, PageNo) {
      let Pedata = []
      let idx
      // 假如当前页码是2 每页展示10条 那么就是data[10] 到 data[19] 当前第2页展示的数据 如：第11条就是 10 * 2 - 10 + 0 = 10
      for (let i = 0; i < PageSize; i++) {
        idx = PageSize * PageNo - PageSize + i
        if (idx < data.length) Pedata.push(data[idx])
      }
      return Pedata
    },
    // 当前第几页
    currIndexs (e) {
      let value = e.target.value

      if (value <= 0) {
        alert('页数必须在总页数之内')
        return
      }
      if (value > this.maxs) {
        alert('页数必须在总页数之内')
        return
      }
      this.currIndex = e.target.value
    },
    // 页面显示条目
    everys (e) {
      let value = e.target.value
      // console.log(Math.ceil((this.data.length / value))
      if (value <= 0) {
        return
      }
      if (value > this.lengths) {
        this.every = this.lengths
        this.chang = value
        alert('超出总条目')
        return
      }
      this.currIndex = 1
      this.every = e.target.value
    },
    search (e) {
      let value = this.$refs.userId.value
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!value) {
        this.data = this.dataSearch
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        this.dataSearch.forEach((item) => {
          if (item.userId.includes(value)) {
            result.push(item)
          }
        })
        this.data = result
      }, 100)
    }
  },
  computed: {
    processing () {
      return this.getPageCurData(this.data, this.every, this.currIndex)
    },
    maxs () {
      return Math.ceil(this.data.length / this.every)
    },
    lengths () {
      return this.data.length
    }
  }
}
</script>
