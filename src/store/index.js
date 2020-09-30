import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    //设置储存token的方法
    setToken(state , token){
      state.token = token
      localStorage.token = token
    },
  },

  getters : {
    //设置获取token的方法
    getToken(state ){
        //判断是否有token
      if(!state.token){
        state.token = localStorage.getItem('token')
      }
      return state.token
    }
  }

})


export default store