import { request } from "@/network/request";

export function highquality(limit,cat){
  return request({
    url : '/top/playlist/highquality',
    method : 'get' ,
    params : {
      limit,
      cat
    }
  })
}

export function playlist(limit , offset , cat){
  return request({
    url : '/top/playlist/',
    method : 'get',
    params : {
      limit,
      offset,
      cat
    }
  })
}