import axios from 'axios';

export const instanceClient = (port = '3000') => {
  return axios.create({
    baseURL: '/'
  })
}

export const instanceServer = (port = '3000') => {
  return axios.create({
    baseURL: `http://localhost:${port}`
  })
}
