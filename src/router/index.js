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
const playlist = () => import('@/views/playlist')

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
  },
  {
    path: '/playlist',
    component: playlist
  }
]


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//创建路由实例
const router =new VueRouter({
  mode : 'history' ,
  routes
})



export default router;