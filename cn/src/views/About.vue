<template>
  <div>
    <HomeSearch :datas="datas" :title="title" :userId="userId" :names="user" @clear="clear" :header="header">
      <div id="div_DWWS_DWWSCX_RYJBZL_Q" style="display:block" slot="search">
        <table class="dataTable" cellpadding="0" cellspacing="0" align="center" border="0" name="DWWS_DWWSCX_RYJBZL_Q" id="DWWS_DWWSCX_RYJBZL_Q" width="95%">
          <tbody>
            <tr>
              <td class="tdprompt" width="13%">公民身份号码</td>
              <td class="tdinput" width="13%"><input autocomplete="off" type="text" class="solidborder" size="21" name="GMSFHM" v-model="userId"></td>
              <td class="tdprompt" width="13%">姓名</td>
              <td class="tdinput" width="13%"><input autocomplete="off" type="text" class="solidborder" size="21" name="XM" value="" v-model="user"></td>
              <td class="tdprompt" width="13%">职工类别</td>
              <td class="tdinput" width="13%"><select name="ZGLB" class="solidselect">
                  <option value="" selected="">请选择</option>
                  <option value="1">在职</option>
                  <option value="2">退休</option>
                </select></td>
            </tr>
            <tr>
              <td class="tdprompt" width="13%">参保险种</td>
              <td class="tdinput" width="8%"><select name="XZLX" class="solidselect">
                  <option value="" selected="">请选择</option>
                  <option value="10">基本养老</option>
                  <option value="20">工伤</option>
                  <option value="30">生育</option>
                  <option value="40">失业</option>
                  <option value="50">基本医疗</option>
                  <option value="53">大额医疗</option>
                  <option value="54">公务员补助医疗</option>
                </select></td>
              <td class="tdprompt" width="13%">参保状态</td>
              <td class="tdinput" width="13%"><select name="CBZT" class="solidselect">
                  <option value="" selected="">请选择</option>
                  <option value="0">未参保</option>
                  <option value="1">参保缴费</option>
                  <option value="2">暂停缴费</option>
                  <option value="3">终止参保</option>
                </select></td>
              <td class="tdprompt" width="13%">&nbsp;</td>
              <td class="tdprompt" width="13%">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <tr class="list_table_thead_tr_title" slot="title">
        <td class="list_table_thead_td_title" width="7%"> 个人编号</td>
        <td class="list_table_thead_td_title" width="7%"> 姓名</td>
        <td class="list_table_thead_td_title" width="7%"> 公民身份号码</td>
        <td class="list_table_thead_td_title" width="7%"> 性别</td>
        <td class="list_table_thead_td_title" width="7%">
          基本养老</td>
        <td class="list_table_thead_td_title" width="7%"> 基本医疗</td>
        <td class="list_table_thead_td_title" width="7%"> 大额医疗</td>
        <td class="list_table_thead_td_title" width="7%">
          工伤</td>
        <td class="list_table_thead_td_title" width="7%"> 生育</td>
        <td class="list_table_thead_td_title" width="7%"> 失业</td>
        <td class="list_table_thead_td_title" width="12%">
          公务员补助医疗</td>
        <td class="list_table_thead_td_title" width="7%">
          职工类别</td>
        <td class="list_table_thead_td_title" width="7%"> 申报工资</td>
        <td class="list_table_thead_td_title" width="7%">
          详情</td>
      </tr>
      <template
        #default="processing"
      >
        <tr
          v-for="(item, index) in processing.processing"
          :class="[index % 2 == 0 ? 'list_table_tbody_tr1' : 'list_table_tbody_tr' ]"
          :key="index"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.userId }}</td>
          <td>{{ item.gender }}</td>
          <td>√</td>
          <td>√</td>
          <td>√</td>
          <td>√</td>
          <td>√</td>
          <td>√</td>
          <td>-</td>
          <td>在职</td>
          <td>{{ item.salary }}</td>
          <td><a :href="'#/subpage/'+item.userId" target="_blank">详情</a></td>
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
      user: '',
      header: {
        title: '单位网上业务',
        list: '单位网申综合查询',
        home: '单位人员基本资料查询'
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
