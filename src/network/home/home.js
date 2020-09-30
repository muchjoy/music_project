import qs from 'qs'
import {request1} from "@/network/request";
import store from "@/store";

export const getInfo = () => {
  return request1({
    url : '/my/userinfo',
    method : 'get',
    headers : {
      Authorization : store.getters.getToken
    }
  })
}