import { request } from "@/network/request";

export function searchNow(keywords,type,limit , offset){
  return request({
    url : '/search',
    method : 'get' ,
    params : {
      keywords,
      type,
      limit,
      offset
    }
  })
}

