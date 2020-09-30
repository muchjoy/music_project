import {request1} from "@/network/request";
import qs from 'qs'

export const login = (username, password) => {
  let data = qs.stringify({
    username,
    password
  })

  return request1({
    url: '/api/login',
    method: 'POST',
    data
  })
}

export const Reguser = (username, password) => {
  let data = qs.stringify({
    username,
    password
  })

  return request1({
    url: '/api/reguser',
    method: 'POST',
    data
  })
}
