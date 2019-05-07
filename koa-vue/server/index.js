import Koa from 'koa'
import json from 'koa-json'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>Hello, koa2</h1>'
})

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

app.listen(3000)

console.log('app started 3000')
