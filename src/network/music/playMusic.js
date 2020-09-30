import {request} from "@/network/request";

export function getMusicUrl(id){
  return request({
    url : '/song/url',
    method : 'get' ,
    params : {
      id
    }
  })
}