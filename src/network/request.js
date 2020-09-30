//导入axios
import axios from 'axios'

export const request = (config) => {
  const instance = axios.create({
    baseURL : 'https://autumnfish.cn',
    timeout : 10000
  })

  return instance(config)
}

export const request1 = (config) =>{
  const instance1 = axios.create({
    baseURL :'http://www.muchjoyboy.com:3007',
    timeout : 5000
  })
  //设置响应拦截器  两个参数  res  err
  instance1.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance1(config)
}