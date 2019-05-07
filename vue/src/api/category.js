import axios from 'axios'
// import jsonp from 'assets/js/jsonp'
import { SUCC_CODE, TIMEOUT } from './config'

const CancelToken = axios.CancelToken
let cancel

// 获取轮播数据
export const getCategoryContent = (id) => {
  cancel && cancel('取消了前一次请求')
  cancel = null
  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      return res.data.content
    }
    throw new Error('没有成功获取数据')
  }).catch(err => {
    if (axios.isCancel(err)) { // 取消了前一次请求
      console.log(err)
    } else { // 这里处理正真的错误
      console.log(err)
    }
  })
}
