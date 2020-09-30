import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "@/store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//注册懒加载插件
import VueLazyload from "vue-lazyload";

// 导入全局初始化样式
import '@/assets/index.css'
// 导入登录样式
import '@/assets/dmaku.css'

//定义全局过滤器
//处理时间  xx:xx
Vue.filter('gettime', num => {
  let mm = parseInt(num / 1000 / 60 % 60);
  mm = mm < 10 ? "0" + mm : mm
  let ss = parseInt(num / 1000 % 60)
  ss = ss < 10 ? "0" + ss : ss
  return `${mm}:${ss}`
})

//处理播放次数的
Vue.filter('getnum', num => {
  return num = num > 10000 ? parseInt(num / 10000) + "万" : num
})

//处理日期  yy-xx-zz hh:mm:ss
Vue.filter('getDate', date => {
  const dt = new Date(date)
  const y = dt.getFullYear();
  const m = dt.getMonth() + 1;
  const r = dt.getDate();

  const hh = dt.getHours();
  const mm = dt.getMinutes();
  const ss = dt.getSeconds();
  return `${y}-${m}-${r} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3, // 提前加载高度（数字 1 表示 1 屏的高度） 默认值:1.3
  //error: 'dist/error.png', // 当加载图片失败的时候
  //loading: 'dist/loading.gif', // 图片加载状态下显示的图片
  attempt: 3 //  加载错误后最大尝试次数 默认值:3
})
//
new Vue({
  render: h => h(App),
  router,
  store,
  vuetify: new Vuetify()
}).$mount('#app')
