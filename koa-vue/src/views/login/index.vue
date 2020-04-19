<template>
  <div class="container">
    <div class="login">
      <div class="login-top">
        <el-input v-model="input" placeholder="请输入账号" class="login-input"></el-input>
        <el-input placeholder="请输入密码" v-model="password" class="password" show-password></el-input>
      </div>
      <el-button @click="fa">验证码</el-button>
      <el-button type="primary" @click="open">登陆</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      input: '',
      password: ''
    }
  },
  methods: {
    open () {
      this.$message({
        message: '请输入密码',
        type: 'warning'
      })
    },
    fa () {
      axios.get('/ai/login').then(res => {
        console.log(res)
        this.$message({
          message: '请求成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>

.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
   /deep/ .el-input__inner{
    border: none;
    border-radius: 0;
  }
  /deep/ .el-button {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  &-top {
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #DCDFE6;
  }
}
.login-input /deep/ .el-input__inner {
  border-bottom: 1px solid #DCDFE6;
}
.password /deep/ .el-input__inner {
  // border-top: none
}

.container {
  width: 1230px;
  height: 100%;
}
.login {
  width: 400px;
  margin: 0 auto;
}

</style>
