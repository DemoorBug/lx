import axios from 'axios'
import jsonp from 'assets/js/jsonp'
import { SUCC_CODE, TIMEOUT, HOME_RECOMMEND_PAGE_SIZE, jsonpOptions } from './config'

// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length
  let i = arrLength
  let rndNum

  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]]
    }
  }

  return arr
}

// 获取轮播数据
const getHomeSlider = () => {
  return axios.get('https://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  })
    .then(resolve => {
      if (resolve.data.code === SUCC_CODE) {
        let sliders = resolve.data.slider
        // 随机获取一个数组的数
        const slider = [sliders[Math.floor(Math.random() * sliders.length)]]
        sliders = shuffle(sliders.filter(() => Math.random() >= 0.5)) // 随机返回数组一个书
        if (sliders.length === 0) {
          sliders = slider
        }
        return sliders
      }
      throw new Error('没有成功获取数据!')
    })
    .catch(() => {
      return [
        {
          linkUrl: 'https://www.imooc.com',
          picUrl: require('assets/img/404.png')
        }
      ]
    })
}
// 获取列表数据
const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json'
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  }
  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.code === '200') {
      return res
    }
    throw new Error('没有成功获取到数据')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

export { getHomeSlider, getHomeRecommend }
