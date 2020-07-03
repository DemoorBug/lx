<template>
  <div class="home">
    <table class="navigator" style="width:100%" v-if="header">
      <tbody>
        <tr>
          <td style="width:100%" align="left">&nbsp;&nbsp; {{ header.title }} -&gt; {{ header.list }} -&gt; {{ header.home }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
        </tr>
      </tbody>
    </table>
    <form name="sform" method="post" action="./action/MainAction" v-if="title.search">
      <input type="hidden" name="ActionType" value="dwwssb_dwwszhcx_dwryjbzlcx_q">
      <input type="hidden" name="BBXH" value="zghmc">
      <input type="hidden" name="BBSJXH" value="13961125">
      <input type="hidden" name="XTJGDM" value="1011">
      <input type="hidden" name="DWSXH" value="118229">
      <input type="hidden" name="GRSXH" value="">
      <input type="hidden" name="tableValidateStr" value="null">
      <table class="dataTable" cellpadding="0" cellspacing="0" align="center" border="0" width="95%">
        <tbody>
          <tr>
            <td nowrap="" class="single_table_title"> &nbsp;<a href="javascript:;"><img id="img_DWWS_DWWSCX_RYJBZL_Q" src="./images/dot11.gif" width="9" height="9"></a>{{ title.search }}
            </td>
          </tr>
        </tbody>
      </table>
      <slot name="search"></slot>

    </form>
    <p align="center" v-if="title.search">
      <a class="buttonlink" href="javascript:;" @click="searchx">查询</a>&nbsp;&nbsp;
      <a class="buttonlink" href="javascript:;" @click="clear">清除</a>&nbsp;&nbsp;
    </p>
    <div id="table_DWWS_DWWSCX_RYJBZL_L" table_title="参保人员列表" table_type="q" table_wherecls="1=1 and bbsjxh='13956425' " table_hastitle="true" table_haspage="true" table_addparams="" table_pagesize="20" table_dgid="null" table_formname="null" table_subtotalcols="null" table_display="block" table_pageurl="null" table_dydicwhere="" table_subtotalname="小计" table_counthint="null" table_counttable="null" table_countwhere="null" table_dsname="" table_datasubject="null" table_filteronnodataright="false" table_actiontype="dwwssb_dwwszhcx_dwryjbzlcx_q" table_menuid="dwwssb_dwwszhcx_dwryjbzlcx">
      <table class="dataTable" cellpadding="0" cellspacing="0" align="center" border="0" width="95%">
        <tbody>
          <tr>
            <td nowrap="" class="single_table_title"> &nbsp;<a href="javascript:;"><img id="img_DWWS_DWWSCX_RYJBZL_L" src="././images/dot11.gif" width="9" height="9"></a>{{ title.title }}
            </td>
          </tr>
        </tbody>
      </table>
      <div id="div_DWWS_DWWSCX_RYJBZL_L" style="display:block">
        <div style="visibility:visible;overflow-y : auto ">
        </div>
        <table align="center" width="95%" class="list_table" name="DWWS_DWWSCX_RYJBZL_L" id="DWWS_DWWSCX_RYJBZL_L" border="0" cellpadding="0" cellspacing="0">
          <thead>
            <slot name="title"></slot>
          </thead>
          <tbody>
            <slot :processing="processing"></slot>
            <!-- <tr gltcss="list_table_tbody_tr1"
              v-for="(item, index) in processing"
              :class="[index % 2 == 0 ? 'list_table_tbody_tr1' : 'list_table_tbody_tr' ]"
              :key="index"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.userId }}</td>
              <td>男</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>-</td>
              <slot></slot>
              <td>在职</td>
              <td>1200</td>
              <td><a href="" target="_blank">详情</a></td>
            </tr> -->
          </tbody>
        </table>
        <table class="list_table_pageSplitInfo" width="95%" align="center" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td nowrap="">
              </td>
              <td nowrap="" width="120px">&nbsp;&nbsp;<img id="pagefirst" @click="leftAllIndex" :src="[currIndex == 1 ? require('./images/pagefirst_d.gif') : require('./images/pagefirst.gif')]"><img id="pageprev" @click="leftIndex" :src="[currIndex == 1 ? require('./images/pageprev_d.gif') : require('./images/pageprev.gif')]"><img id="pagelast" @click="rightIndex" :src="[maxs <= currIndex ? require('./images/pagenext_d.gif') : require('./images/pagenext.gif')]"><img id="pageLine" @click="rightAllIndex" :src="[maxs <= currIndex ? require('./images/pagelast_d.gif') : require('./images/pagelast.gif')]"></td>
              <td width="120px" align="left"> 翻到第<input class="pageinput" type="text" size="5" id="DWWS_DWWSCX_RYJBZL_L_pagenum" :value="currIndex" @blur="currIndexs">页 </td>
              <td nowrap="" align="left" width="30px"> <input style="display:none" type="text" size="1"> <img src="./images/go.gif">
              </td>
              <td nowrap="" align="left">每页显示 <input class="pageinput" type="text" size="4" maxlength="3" id="DWWS_DWWSCX_RYJBZL_L_pagesize" :value="every" @blur="everys" :key="chang">条记录&nbsp;&nbsp;第 <span> {{ currIndex }}/{{maxs}} </span> 页&nbsp;&nbsp;共&nbsp;<span> {{ lengths }} &nbsp;</span>条
                <input type="hidden" name="DWWS_DWWSCX_RYJBZL_L_currentPageNum" value="1">
                <input type="hidden" name="DWWS_DWWSCX_RYJBZL_L_pageCnt" value="1">
                <input type="hidden" name="DWWS_DWWSCX_RYJBZL_L_rowCnt" value="6"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div id="img_loading" style="position:absolute;width:50;height:50;display:none"><img src="./images/tree/loading.gif"></div> -->
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'search',
  props: {
    datas: [Object, Array, Function],
    title: [Object],
    userId: {
      type: [Number, String],
      default: ''
    },
    names: {
      type: String,
      default: ''
    },
    header: {
      type: Object,
      default: null
    },
    sear: {
      type: [Boolean, String, Object],
      default: false
    }
  },
  data () {
    return {
      data: {},
      dataSearch: {},
      length: 0,
      currIndex: 1,
      page: 0,
      every: 10,
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
        this.currIndex = 1
        alert('超出总条目')
        return
      }
      this.currIndex = 1
      this.every = e.target.value
    },
    search (e) {
      let value = this.userId.trim()
      let names = this.names.trim()
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!value && !names) {
        this.data = this.dataSearch
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        this.dataSearch.forEach((item) => {
          if (value) { // id
            if (names) {
              if (item.userId.includes(value) && item.name.includes(names)) {
                result.push(item)
              }
            } else {
              if (item.userId.includes(value)) {
                result.push(item)
              }
            }
          } else {
            if (item.name.includes(names)) {
              result.push(item)
            }
          }
        })
        this.data = result
      }, 100)
    },
    clear () {
      this.$emit('clear', this.search)
    },
    leftIndex () {
      if (this.currIndex > 1) {
        this.currIndex = this.currIndex - 1
      }
    },
    rightIndex () {
      if (this.currIndex < this.maxs) {
        this.currIndex = this.currIndex + 1
      }
    },
    leftAllIndex () {
      if (this.currIndex > 1) {
        this.currIndex = 1
      }
    },
    rightAllIndex () {
      if (this.currIndex < this.maxs) {
        this.currIndex = this.maxs
      }
    },
    searchx () {
      if (this.sear) {
        let value = this.userId.trim()
        if (!value) {
          alert('以下字段不能为空!\n公民身份证号码')
          return
        }
        axios.get(`/mock/${value}.json`).then(data => {
          this.data = data.data
          this.$emit('secc')
          return new Promise(resolve => {
            resolve(data)
          })
        })
      } else {
        this.search()
      }
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
<style lang="less" scoped>
// @import './css/menu.css';
</style>
