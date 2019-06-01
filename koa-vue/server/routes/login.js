import Router from 'koa-router'
// import axios from './utils/axios.js'
// import Province from '../dbs/models/Province.js'
const Core = require('@alicloud/pop-core');

function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
        break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
            default:
                return 0;
            break;
    }
}

var params = {
  "RegionId": "cn-hangzhou",
  "PhoneNumbers": "18161975696",
  "SignName": "696px",
  "TemplateCode": "SMS_164970121",
  "TemplateParam": `{\"code\":${randomNum(1000, 9999)}}`
}

var requestOption = {
  method: 'POST'
};

let router = new Router({
  prefix: '/'
})
  var client = new Core({
    accessKeyId: 'LTAIz2QDVt65lAPb',
    accessKeySecret: '7XhfpBspdvqAJevCLN8aDJl2TNZ2Qr',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  })

router.get('login',async (ctx) => {
  let result = await client.request('SendSms', params, requestOption)

  console.log(result)
  ctx.body = '成功'
  ctx.status = 200
  // .then(result => {
  //   ctx.body = '<h1>login</h1>'
  // }, ex => {
  //   ctx.body = '<h1>err</h1>'
  // })
})


export default router



