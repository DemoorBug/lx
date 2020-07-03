const Koa = require('koa')
const next = require('next')
const Router = require('@koa/router')
const session = require('koa-session')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  //
  // router.get('/b/:id', async (ctx) => {
  //   const id = ctx.params.id
  //   // await handle(ctx.req, ctx.res, {
  //   //   pathname: '/b',
  //   //   query: { id }
  //   // })
  //   await app.render(ctx.req, ctx.res, '/a', { id })
  //   ctx.respond = false
  // })
  server.keys = ['demo or bug']
  const SESSION_CONFIG = {
    key: 'jid'
  }

  server.use(session(SESSION_CONFIG, server))

  // server.use(async (ctx, next) => {
  //   if (ctx.session.user) {
  //     ctx.session.user = {
  //       name: 'jokcy',
  //       age: 18
  //     } else {
  //       console.log('session is:', ctx.session);
  //     }
  //   }
  // })

  server.use(async (ctx, next) => {
    console.log('session is:',ctx.session);
    await next()
  })


  router.get('/a/:id', async ctx => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    ctx.respond = false
  })

  // router.get('/set/user', async (ctx, next) => {
  //   // ctx.respond = false
  //   ctx.session.user = {
  //     name: 'jokcy',
  //     age: 18
  //   }
  //   ctx.body = 'set session success'
  //   // await next()
  // })

  router.get('/set/user', async ctx => {
    // ctx.respond
    ctx.session.user = {
      name: 'debug',
      age: '23',
    }
    ctx.body = 'set session success'
  })

  router.all('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    // await handle(ctx.req, ctx.res)
    // ctx.respond = false
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())

  server.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`)
  })
})
