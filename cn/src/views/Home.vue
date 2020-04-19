<template>
  <div>
    <HomeSearch :datas="datas" :title="title" :userId="userId" @clear="clear" :header="header" sear @secc="names">
      <div id="div_dwwssb_dwwszhcx_dwryjfxxcx_q" style="display:block" slot="search">
        <table class="dataTable" cellpadding="0" cellspacing="0" align="center" border="0" name="dwwssb_dwwszhcx_dwryjfxxcx_q" id="dwwssb_dwwszhcx_dwryjfxxcx_q" width="95%">
          <tbody>
            <tr>
              <td class="tdprompt txtntnull" width="13%">公民身份证号码</td>
              <td class="tdinput" width="13%"><input type="text" class="solidborder" size="21" name="GMSFHM" value="" vldstr="公民身份证号码=nn" v-model="userId"></td>
              <td class="tdprompt" width="13%">台账年月从(例:200505)</td>
              <td class="tdinput" width="13%"><input type="text" class="solidborder" size="21" name="SHNYC" value="" vldstr="台账年月从=dc+l(6-6)" minlength="6" maxlength="6"></td>
              <td class="tdprompt" width="13%">至</td>
              <td class="tdinput" width="13%"><input type="text" class="solidborder" size="21" name="SHNYZ" value="" vldstr="至=dc+l(6-6)" minlength="6" maxlength="6"></td>
            </tr>
            <tr>
              <td class="tdprompt" width="13%">缴费标识</td>
              <td class="tdinput" width="13%"><select name="DWJFBZ" class="solidselect">
                  <option value="" selected="">请选择</option>
                  <option value="1">已缴</option>
                  <option value="2">欠缴</option>
                </select></td>
              <td class="tdprompt" width="13%">险种类型</td>
              <td class="tdinput" width="13%"><select name="XZLX" class="solidselect">
                  <option value="" selected="">请选择</option>
                  <option value="10">基本养老</option>
                  <option value="20">工伤</option>
                  <option value="30">生育</option>
                  <option value="40">失业</option>
                  <option value="50">基本医疗</option>
                  <option value="53">大额医疗</option>
                  <option value="54">公务员补助医疗</option>
                </select></td>
              <td class="tdprompt" width="13%">&nbsp;</td>
              <td class="tdprompt" width="13%">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <tr class="list_table_thead_tr_title" slot="title">
        <td class="list_table_thead_td_title" width="5%"> 公民身份证号码</td>
        <td class="list_table_thead_td_title" width="5%"> 姓名</td>
        <td class="list_table_thead_td_title" width="5%"> 险种类型</td>
        <td class="list_table_thead_td_title" width="5%"> 缴费年月</td>
        <td class="list_table_thead_td_title" width="5%"> 台账年月</td>
        <td class="list_table_thead_td_title" width="5%"> 应缴类型</td>
        <td class="list_table_thead_td_title" width="5%"> 缴费方式</td>
        <td class="list_table_thead_td_title" width="5%"> 缴费基数</td>
        <td class="list_table_thead_td_title" width="5%"> 应缴金额</td>
        <td class="list_table_thead_td_title" width="5%"> 个人缴费金额</td>
        <td class="list_table_thead_td_title" width="5%"> 划入个人账户金额</td>
        <td class="list_table_thead_td_title" width="5%"> 划入统筹金额</td>
        <td class="list_table_thead_td_title" width="5%"> 补缴利息</td>
        <td class="list_table_thead_td_title" width="5%"> 滞纳金/积累额</td>
        <td class="list_table_thead_td_title" width="5%"> 缴费标识</td>
        <td class="list_table_thead_td_title" width="5%"> 单位编号</td>
        <td class="list_table_thead_td_title" width="5%"> 单位名称</td>
      </tr>
      <template #default="processing">
        <tr v-for="(item, index) in processing.processing" :class="[index % 2 == 0 ? 'list_table_tbody_tr1' : 'list_table_tbody_tr' ]" :key="index">
          <td>{{ getUsId.userId }}</td>
          <td>{{ getUsId.name }}</td>
          <td>{{ item.Plant }}</td>
          <td>{{ item.monthly }}</td>
          <td>{{ item.years }}</td>
          <td>{{ item.Should }}</td>
          <td>{{ item.payment }}</td>
          <td>{{ item.base }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.Individual }}</td>
          <td>{{ item.Transfer }}</td>
          <td>{{ item.Delimit }}</td>
          <td>{{ item.Payment }}</td>
          <td>{{ item.overdue }}</td>
          <td>{{ item.paid }}</td>
          <td>{{ item.number }}</td>
          <td>{{ item.organization }}</td>
        </tr>
      </template>
    </HomeSearch>
  </div>
</template>
<script>
import axios from 'axios'
import HomeSearch from '../components/search'

export default {
  name: 'About',
  components: {
    HomeSearch
  },
  data () {
    return {
      title: {
        search: '个人缴费信息查询',
        title: '个人缴费信息'
      },
      userId: '',
      // user: '',
      header: {
        title: '单位网上业务',
        list: '单位网申综合查询',
        home: '单位人员缴费信息查询'
      },
      datas: {},
      getUsId: {
        userId: '',
        name: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    names () {
      return axios.get(`/mock/index.json`).then(data => {
        return new Promise(resolve => {
          resolve(data)
        }).then(data => {
          let getId = data.data
          let result = []
          if (!this.userId) {
            return
          }
          getId.forEach((item) => {
            if (item.userId.includes(this.userId)) {
              result.push(item)
            }
          })
          this.getUsId = result[0]
        })
        // console.log(data.data)

        // this.max = Math.ceil(this.data.length/this.every)
      })
    },
    init () {
      this.datas = () => {
        return new Promise(resolve => {
          let data = []
          resolve({ data })
        })
      }
    },
    clear (sear) {
      this.userId = ''
      // this.user = ''
      setTimeout(sear)
    }
  }
}

</script>
