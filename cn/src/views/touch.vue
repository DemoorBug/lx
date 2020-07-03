<template>
  <div>
    <HomeSearch :datas="datas" :title="title" :userId="userId" @clear="clear" :header="header">
      <div id="div_grwssb_grsbyw_ybrwcx_q" style="display:block" slot="search">
        <table class="dataTable" cellpadding="0" cellspacing="0" align="center" border="0" name="grwssb_grsbyw_ybrwcx_q" id="grwssb_grsbyw_ybrwcx_q" width="95%">
          <tbody>
            <tr>
              <td class="tdprompt" width="8%">业务类型</td>
              <td class="tdinput" width="29%"><select name="YWLX" class="solidselect">
                  <option value="" selected="">请选择</option>
                </select></td>
              <td class="tdprompt" width="13%">经办时间范围</td>
              <td class="tdinput" width="10%"><input type="text" vldstr="经办时间范围=d" name="JBSJFWC" mask="date" class="mask hasDatepicker" value="" id="dp1557248647830"></td>
              <td class="tdprompt" width="2%">至</td>
              <td class="tdinput" width="10%"><input type="text" vldstr="至=d" name="JBSJFWZ" mask="date" class="mask hasDatepicker" value="" id="dp1557248647831"></td>
              <td class="tdprompt" width="8%">关键信息</td>
              <td class="tdinput" width="20%"><input type="text" class="solidborder" size="21" name="GJXX" v-model="userId" value=""></td>
            </tr>
          </tbody>
        </table>
      </div>

      <tr class="list_table_thead_tr_title" slot="title">
        <td class="list_table_thead_td_title" width="16%"> 业务类型</td>
        <td class="list_table_thead_td_title" width="16%"> 业务顺序号</td>
        <td class="list_table_thead_td_title" width="24%"> 关键信息</td>
        <td class="list_table_thead_td_title" width="16%"> 经办日期</td>
        <td class="list_table_thead_td_title" width="16%"> 审批结果</td>
      </tr>
      <template #default="processing">
        <tr v-for="(item, index) in processing.processing" :class="[index % 2 == 0 ? 'list_table_tbody_tr1' : 'list_table_tbody_tr' ]" :key="index">
          <td>{{ item.business }}</td>
          <td>{{ item.Service }}</td>
          <td>{{ item.userId }},{{ item.name }}</td>
          <td>{{ item.date }}</td>
          <td>结束</td>
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
        search: '查询条件',
        title: '参保人员列表'
      },
      userId: '',
      header: {
        title: '单位网上业务',
        list: '单位网申综合查询',
        home: '已办业务查询'
      }
    }
  },
  created () {
    this.datas()
  },
  methods: {
    datas () {
      return axios.get('/mock/index.json').then(data => {
        return new Promise(resolve => {
          resolve(data)
        })
        // console.log(data.data)

        // this.max = Math.ceil(this.data.length/this.every)
      })
    },
    clear (sear) {
      this.userId = ''
      this.user = ''
      setTimeout(sear)
    }
  }
}

</script>
