import axios from 'axios'
import { SUCC_CODE, TIMEOUT } from './config'

const getHomeSlider = () => {
  return axios.get('https://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  })
    .then(resolve => {
      if (resolve.data.code === SUCC_CODE) {
        return resolve.data.slider
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
    .then(data => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, 1000)
      })
    })
}

export { getHomeSlider }
