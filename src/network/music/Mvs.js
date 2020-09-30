import { request } from "@/network/request";

export function getMvs(limit,area,type,order,offset){
  return request({
    url : '/mv/all',
    method : 'get',
    params : {
      limit,
      area,
      type,
      order,
      offset
    }
  })
}