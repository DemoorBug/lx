// const express = require('express')
import express from 'express'
import Home from '../containers/Home'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, matchPath } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import Routes from '../Routes.js'
import { getStore } from '../store'

// http-proxy
import proxy from 'express-http-proxy';
const app =  express()
app.use(express.static('public'))
app.use('/api', proxy('192.168.0.2:3000', {
  proxyReqPathResolver: (req) => {
    return req.url
  }
}))

app.use('/ssr', proxy('192.168.0.2:3333', {
  proxyReqPathResolver: (req) => {
    return '/ssr' + req.url
  }
}))

app.get('*', function (req, res, next) {
  const store = getStore()
  const promises = [];

  // 自带的matchRouters方法实现
  // 缺点就是不能识别子级路由
  // Routes.some(route => {
  //   // use `matchPath` here
  //   const match = matchPath(req.path, route);
  //   if (match) promises.push(route.loadData(store));
  // });

  // 使用react-router-config提供的matchRouters方法就没有以上问题
  const matchs = matchRoutes(Routes, req.path);
  matchs.forEach(item => {
    if (item.route.loadData) {
      const promis = new Promise(resolve => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promis)
    }
  })

  Promise.all(promises).then(() => {
    const staticContext = {}
    const content = renderToString((
      <Provider store={store}>
        <StaticRouter location={req.path} context={staticContext}>
          {renderRoutes(Routes)}
        </StaticRouter>
      </Provider>
    ))
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
          <title>demo</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.context = {
              state: ${JSON.stringify(store.getState())}
            }
          </script>
          <script src="/index.js"></script>
        </body>
      </html>
      `
    console.log(staticContext);
    if (staticContext.action === 'REPLACE') {
      console.log('s');
      res.redirect(301, staticContext.url)
    } else if (staticContext.NotFound) {
      res.status(404)
      res.send(html)
    } else {
      res.send(html)
    }
  });

})


var server = app.listen(3000)
