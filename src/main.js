import Vue from 'vue'
import App from './App.vue'
import router from  './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//注册懒加载插件
import VueLazyload from "vue-lazyload";

// 导入全局初始化样式
import '@/assets/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueLazyload , {
  preLoad: 1.3, // 提前加载高度（数字 1 表示 1 屏的高度） 默认值:1.3
  //error: 'dist/error.png', // 当加载图片失败的时候
  //loading: 'dist/loading.gif', // 图片加载状态下显示的图片
  attempt: 3 //  加载错误后最大尝试次数 默认值:3
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
