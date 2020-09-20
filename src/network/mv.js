import { request } from "@/network/request";

//播放mv请求
export function playMv(id){
  return request({
    url: '/mv/url',
    method :'get' ,
    params : {
      id
    }
  })
}

//相关mv请求
export function mvs(mvid){
  return request({
    url : '/simi/mv',
    method : 'get',
    params : {
      mvid
    }
  })
}

//mv信息
export function mvInfo(mvid){
  return request({
    url : '/mv/detail',
    method : 'get' ,
    params : {
      mvid
    }
  })
}

//歌手信息
export function playerInfo(id){
  return request({
    url : '/artists',
    method : 'get' ,
    params : {
      id
    }
  })
}

//MV评论
export  function comment(id,page) {
  return request({
    url : '/comment/mv',
    method : 'get' ,
    params : {
      id,
      limit:20,
      offset:(page-1)*20
    }
  })
}