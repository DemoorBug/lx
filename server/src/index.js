// const express = require('express')
import express from 'express'
import Home from './containers/Home'
import React from 'react'
import { renderToString } from 'react-dom/server'
const app =  express()
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>demo</title>
    </head>
    <body>
      <div id="root">${renderToString(<Home />)}</div>
      <script src="/index.js"></script>
    </body>
    </html>
  `)
})

var server = app.listen(3000)
