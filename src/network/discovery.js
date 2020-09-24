import { request } from "@/network/request";

//轮播图
export function getBanners(){
  return request({
    url : '/banner',
    method : 'get'
  })
}

//推荐歌单
export function getPersonalized(){
  return request({
    url : '/personalized',
    method : 'get' ,
    params : {
      limit : 10
    }
  })
}

//最新音乐
export function newsong(){
  return request({
    url: '/personalized/newsong',
    method : 'get' ,
  })
}

//推荐mv
export function recommendMv(){
  return request({
    url : '/personalized/mv',
    method : 'get' ,
  })
}