//导入axios
import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL : 'https://autumnfish.cn',
    timeout : 10000
  })

  return instance(config)
}