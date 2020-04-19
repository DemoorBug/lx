import Router from 'koa-router'
import User from '../schema/users.js'

let router = new Router({
  prefix: '/user'
})

router.get('/password', async (ctx) => {
  let username = await User.find({username: 'demoorbug'})
  ctx.body = username.map(item => {
    return {
      id: item.username,
      pas: item.password
    }
  })
  ctx.status = 200
})

export default router
