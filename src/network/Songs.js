import { request } from "@/network/request";

export function songs(type){
  return request({
    url : '/top/song',
    method : 'get' ,
    params : {
      type
    }
  })
}