<template>
  <div>
    <table class="navigator" style="width:100%">
      <tr>
        <td style="width:100%" align="left">&nbsp;&nbsp; 单位网上业务 -> 单位网申综合查询 -> 单位人员基本资料查询&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table>
    <form name="sform" method="post" action="/dwws/action/MainAction">
      <input type=hidden name="tableValidateStr" value="null">
      <table class="dataTable" cellpadding="0" cellspacing="0" align="center" border="0" width="95%">
        <tr>
          <td nowrap class="single_table_title"> &nbsp;<a href="javascript:;"><img id="img_DWWS_DWWSCX_RYJBZL_GRJBXX_Q" src="/dwws/images/dot11.gif" width="9" height="9"></a>个人基本信息
          </td>
        </tr>
      </table>
      <DIV id="div_DWWS_DWWSCX_RYJBZL_GRJBXX_Q" style="display:block">
        <TABLE class="dataTable" cellpadding="0" cellspacing="0" align="center" border=0 name="DWWS_DWWSCX_RYJBZL_GRJBXX_Q" id="DWWS_DWWSCX_RYJBZL_GRJBXX_Q" width=95%>
          <TBODY>
            <TR>
              <TD class="tdprompt" width="13%">社保机构</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="XTJGDM" value="洪山区" disabled=true></TD>
              <TD class="tdprompt" width="13%">单位编号</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="DWBH" value="10010438" disabled=true></TD>
              <TD class="tdprompt" width="13%">单位名称</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="DWMC" value="武汉凤琪国际船舶管理有限公司" disabled=true></TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">个人编号</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="GRBH" :value="data.id" disabled=true></TD>
              <TD class="tdprompt" width="13%">姓名</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="XM" :value="data.name" disabled=true></TD>
              <TD class="tdprompt" width="13%">性别</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="XB" :value="data.gender" disabled=true></TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">公民身份证号码</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="GMSFHM" :value="data.userId" disabled=true></TD>
              <TD class="tdprompt" width="13%">档案出生日期</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="CSRQ" value="1989-02-08" disabled=true></TD>
              <TD class="tdprompt" width="13%">户口性质</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="HKXZ" value="非中心城区非农业户口" disabled=true></TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">民族</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="MZ" value="汉族" disabled=true></TD>
              <TD class="tdprompt" width="13%">文化程度</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="WHCD" value="高中" disabled=true></TD>
              <TD class="tdprompt" width="13%">参加工作时间</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="CJGZRQ" :value="has[0].monthly" disabled=true></TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">健康状况</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="JKZK" value="" disabled=true></TD>
              <TD class="tdprompt" width="13%">婚姻状况</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="HYZK" value="未婚" disabled=true></TD>
              <TD class="tdprompt" width="13%">个人状态</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="GRZT" value="投保" disabled=true></TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">职工类别</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="ZGLB" value="在职" disabled=true></TD>
              <TD class="tdprompt" width="13%">公务员类别</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="GWYLB" value="非公务员" disabled=true></TD>
              <TD class="tdprompt" width="13%">特殊人员类别</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="TSRQLB" value="" disabled=true></TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">异地人员标志</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="YDRYBZ" value="" disabled=true></TD>
              <TD class="tdprompt" width="13%">财政补助机关</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="CZBZJG" value="" disabled=true></TD>
              <TD class="tdprompt" width="13%">财政补助标志</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="CZBZBZ" value="" disabled=true></TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">离退休类别</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="LXRYLB" value="" disabled=true></TD>
              <TD class="tdprompt" width="13%">离退休日期</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="LTXRQ" value="" disabled=true></TD>
              <TD class="tdprompt" colSpan=2 width="13%">&nbsp;</TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">居住地地址</TD>
              <TD class="tdinput" colSpan=3 width="13%"><input type="text" class="solidborder" size=21 name="JZDDZ" value="" disabled=true></TD>
              <TD class="tdprompt" width="13%">申报工资</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="SBGZ" :value="data.salary" disabled=true></TD>
            </TR>
            <TR>
              <TD class="tdprompt" width="13%">居住地邮政编码</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="JZDYZBM" value="" disabled=true></TD>
              <TD class="tdprompt" width="13%">参保人联系电话</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="CBRLXDH" value="02786709300" disabled=true></TD>
              <TD class="tdprompt" width="13%">参保人联系手机</TD>
              <TD class="tdinput" width="13%"><input type="text" class="solidborder" size=21 name="CBRLXSJ" value="" disabled=true></TD>
            </TR>
          </TBODY>
        </TABLE>
      </DIV>
    </form>
    <home-search :datas="datas" :title="title" :userId="userId" :names="user">
      <tr class="list_table_thead_tr_title" slot="title">          <td class="list_table_thead_td_title" width="24%"> 险种类型</td>
            <td class="list_table_thead_td_title" width="24%"> 个人参保状态</td>
            <td class="list_table_thead_td_title" width="24%"> 个人首次参保年月</td>
            <td class="list_table_thead_td_title" width="24%"> 实际缴费月数</td>
      </tr>
      <template
        #default="processing"
      >
        <tr
          v-for="(item, index) in processing.processing"
          :class="[index % 2 == 0 ? 'list_table_tbody_tr1' : 'list_table_tbody_tr' ]"
          :key="index"
        >
          <td>{{ item.Plant }}</td>
          <td>{{ item.Protect }}</td>
          <td>{{ item.monthly }}</td>
          <td>{{ item.paid }}</td>
        </tr>
      </template>

    </home-search>
  </div>
</template>
<script>
import axios from 'axios'
import HomeSearch from '../components/search'

export default {
  name: 'subpage',
  data () {
    return {
      data: {},
      has: [{
        monthly: '201801'
      }],
      title: {
        search: '',
        title: '参保人员列表'
      },
      userId: '',
      user: ''
    }
  },
  components: {
    HomeSearch
  },
  methods: {
    getSubpage () {
      return axios.get(`/mock/index.json`).then(data => {
        return new Promise(resolve => {
          resolve(data)
        })
        // console.log(data.data)

        // this.max = Math.ceil(this.data.length/this.every)
      })
    },
    datas () {
      return axios.get(`/mock/${this.$route.params.id}.json`).then(data => {
        return new Promise(resolve => {
          resolve(data.data)
        })
      }).then(data => {
        return new Promise(resolve => {
          let result = []
          let ai = 0
          let bi = 0
          let ci = 0
          let di = 0
          let ei = 0
          let fi = 0
          data.forEach((item, index) => {
            if (item.Plant.includes('基本养老')) {
              if (item.paid.includes('已缴')) {
                result[0] = {
                  Plant: '基本养老',
                  Protect: '参加缴费',
                  monthly: data[data.length - 1].monthly,
                  paid: ++ai
                }
              }
            }
            if (item.Plant.includes('工伤')) {
              if (item.paid.includes('已缴')) {
                result[1] = ({
                  Plant: '工伤',
                  Protect: '参加缴费',
                  monthly: data[data.length - 1].monthly,
                  paid: ++bi
                })
              }
            }
            if (item.Plant.includes('生育')) {
              if (item.paid.includes('已缴')) {
                result[2] = ({
                  Plant: '生育',
                  Protect: '参加缴费',
                  monthly: data[data.length - 1].monthly,
                  paid: ++ci
                })
              }
            }
            if (item.Plant.includes('失业')) {
              if (item.paid.includes('已缴')) {
                result[3] = ({
                  Plant: '失业',
                  Protect: '参加缴费',
                  monthly: data[data.length - 1].monthly,
                  paid: ++di
                })
              }
            }
            if (item.Plant.includes('基本医疗')) {
              if (item.paid.includes('已缴')) {
                result[4] = ({
                  Plant: '基本医疗',
                  Protect: '参加缴费',
                  monthly: data[data.length - 1].monthly,
                  paid: ++ei
                })
              }
            }
            if (item.Plant.includes('大额医疗')) {
              if (item.paid.includes('已缴')) {
                result[5] = ({
                  Plant: '大额医疗',
                  Protect: '参加缴费',
                  monthly: data[data.length - 1].monthly,
                  paid: ++fi
                })
              }
            }
          })
          this.has = result
          resolve({ data: result })
        })
      })
    }
  },
  mounted () {
    this.getSubpage().then(({ data }) => {
      let result = []
      data.forEach((item) => {
        if (item.userId.includes(this.$route.params.id)) {
          result.push(item)
        }
      })
      this.data = result[0]
    })
  }
}

</script>
