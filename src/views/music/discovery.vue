<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img v-lazy="item.imageUrl" alt=""/>
      </el-carousel-item>
    </el-carousel>
    <!--推荐歌单-->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item , index) in result" :key="index" @click="toplayList(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img v-lazy="item.picUrl" alt="">
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!--最新音乐-->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in songer" :key="index">
          <div class="img-wrap">
            <img v-lazy="item.picUrl" alt="">
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <!--歌名-->
            <div class="song-name">{{ item.name }}</div>
            <!--歌手-->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!--推荐MV-->
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index" @click="playMv(item.id)">
          <div class="img-wrap">
            <img v-lazy="item.picUrl" alt/>
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {getBanners, getPersonalized, newsong, recommendMv} from "@/network/music/discovery";

//播放音乐
import {getMusicUrl} from '@/network/music/playMusic'

export default {
  name: "discovery",
  data() {
    return {
      banners: [],
      result: [],
      songer: [],
      mvs: []
    }
  },
  created() {
    //轮播图
    this.getbanner()

    // 推荐歌单
    this.getplayerlist()

    //最新音乐
    this.getNewsongs()

    //推荐MV
    this.getMv()
  },
  methods: {
    //轮播图
    async getbanner() {
      const {data: res} = await getBanners()
      this.banners = res.banners
    },
    //推荐歌单
    async getplayerlist() {
      const {data: res} = await getPersonalized()
      this.result = res.result
    },
    //最新音乐
    async getNewsongs() {
      const {data: res} = await newsong()
      this.songer = res.result
    },
    //推荐MV
    async getMv() {
      const {data: res} = await recommendMv()
      this.mvs = res.result
    },
    //跳转mv页面
    playMv(id) {
      this.$router.push(`/mv?id=${id}`)
    },
    //播放音乐
    async playMusic(id) {
      const {data: res} = await getMusicUrl(id)
      let url = res.data[0].url
      this.$parent.musicUrl = url
    },

    //跳转歌单
    toplayList(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
  }
}

</script>

