const express = require('express')

const app = express()

let login = false

//是否登录
app.get('/ssr/isLogin', function(req, res) {
  res.json({
    success: true,
    data: {
      login
    }
  });
})

// 登陆
app.get('/ssr/login', function(req, res) {
  login = true
  res.json({
    success: true,
    data: {
      login
    }
  });
})

// 退出
app.get('/ssr/logout', function(req, res) {
  login = false
  res.json({
    success: true,
    data: {
      logout: true
    }
  });
})

// 没有登陆
app.get('/ssr/translations', function(req, res) {
  if (login) {
    res.json({
      success: true,
      data: [
        {
          id: 1,
          title: "男孩落入洛杉矶污水系统后获救"
        },
        {
          id: 2,
          title: "独立厨师交流点子"
        },
        {
          id: 3,
          title: "移民者关注墨西哥边境政策"
        },
        {
          id: 4,
          title: "成千上万的美国教师罢工要求加薪"
        },
        {
          id: 5,
          title: "五十年前，马丁·路德·金遇刺身亡"
        },
      ]
    })
  } else {
    res.json({
      success: false
    });
  }
})

app.listen('3333')
