//配置路由
//导入vueRouter
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

//懒加载
const discovery = () => import('@/views/discovery')
const PlayLists = () => import('@/views/PlayLists')
const songs = () => import('@/views/Songs')
const mvs = () => import('@/views/Mvs')
const result = () => import('@/views/result')
const originlPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
  return originlPush.call(this,location).catch(err=>err)
}

const routes = [
  {
    path: '/',
    redirect : '/discovery'
  },
  {
    path : '/discovery',
    component : discovery
  },
  {
    path: '/PlayLists',
    component: PlayLists
  },
  {
    path: '/songs',
    component: songs
  },
  {
    path: '/mvs',
    component: mvs
  },
  {
    path: '/result',
    component: result
  }
]

//创建路由实例
const router =new VueRouter({
  mode : 'history' ,
  routes
})

export default router