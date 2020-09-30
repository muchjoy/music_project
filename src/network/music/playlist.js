import { request } from "@/network/request";

export function getList(id){
  return request({
    url : '/playlist/detail',
    method : 'get' ,
    params : {
      id
    }
  })
}

//获取热门评论
export function commentHot(id , type){
  return request({
    url : '/comment/hot',
    method:'get',
    params : {
      id,
      type
    }
  })
}

//获取最新评论
export function commentNow(id,limit,offset){
  return request({
    url : '/comment/playlist',
    method: 'get',
    params : {
      id,
      limit,
      offset
    }
  })
}

