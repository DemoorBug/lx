<template>
  <el-row :gutter="5" class="content">
    <el-col :xs="24" :sm="{span: 6, offset: 9}">
      <span class="title">
        欢迎登陆
      </span>
      <!-- <el-row> -->
        <el-input
          v-model="accout"
          placeholder="账号"
          type="text"
        ></el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
        ></el-input>
        <el-button type="primary">登陆</el-button>
      <!-- </el-row> -->

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      accout: '',
      password: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding: 16px
  .title
    font-size 24px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
</style>
