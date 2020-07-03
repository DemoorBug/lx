// server.js
import Koa from 'koa'
import Router from 'koa-router'
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import {database} from './mongodb'
import {addOne, getAllList, editOne, tickOne, delOne} from './controllers/list'

database() // 链接数据库并且初始化数据模型

const app = new Koa()
const router = new Router();
const port = 4000

app.use(bodyParser());

router.get('/hello', (ctx, next) => {
  ctx.body = "hello world"
});

// 把对请求的处理交给处理器。
router.post('/addOne', addOne)
      .post('/editOne', editOne)
      .post('/tickOne', tickOne)
      .post('/delOne', delOne)
      .get('/getAllList', getAllList)

app.use(KoaStatic(__dirname + '/public'));
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port);

console.log('server listen port: ' + port)
