//配置路由
//导入vueRouter
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

//懒加载
const musichome = () => import('@/components/music/musicHome')
const discovery = () => import('@/views/music/discovery')
const PlayLists = () => import('@/views/music/PlayLists')
const songs = () => import('@/views/music/Songs')
const mvs = () => import('@/views/music/Mvs')
const result = () => import('@/views/music/result')
const playlist = () => import('@/views/music/playlist')
const mv = () => import('@/views/music/mv')
//路由懒加载
const home = () => import('@/components/home/home')
const login = () => import('@/components/login/login')
const blog = () => import('@/components/blog/Blog')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/blog',
    component:blog
  },
  {
    path: '/musichome',
    component: musichome,
    children: [
      {
        path: '/',
        redirect: '/discovery'
      },
      {
        path: '/discovery',
        component: discovery
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
      },
      {
        path: '/mv',
        component: mv
      }
    ]
  },


]


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//创建路由实例
const router = new VueRouter({

  routes
})


export default router;