<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!--推荐歌单-->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item , index) in result" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
            <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="">
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <!--最新音乐-->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in songer" :key="index" >
          <div class="img-wrap">
            <img :src="item.picUrl" alt="">
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <!--歌名-->
            <div class="song-name">{{item.name}}</div>
            <!--歌手-->
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>

    <!--推荐MV-->
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{item.name}}</div>
            <!-- 歌手名 -->
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//导入axios
import axios from 'axios'
export default {
  name: "discovery",
  data(){
    return {
      banners:[],
      result : [],
      songer : [],
      mvs : []
    }
  },
  created() {
    //轮播图
    axios({
      url :'https://autumnfish.cn/banner',
      method : 'get',

    }).then(res => {
      this.banners = res.data.banners
    })

  // 推荐歌单
    axios({
      url :'https://autumnfish.cn/personalized',
      method : 'get',
      params : {
        limit : 10
      }
    }).then(res => {
      this.result = res.data.result
    })
    //最新音乐
    axios({
      url : 'https://autumnfish.cn/personalized/newsong',
      method :'get',
    }).then(res => {
      this.songer = res.data.result
    })
    //推荐MV
    axios({
      url :'https://autumnfish.cn/personalized/mv',
      method :'get'
    }).then(res => {
        this.mvs = res.data.result
    })
  },
  methods : {
    playMusic(id){
      axios({
        url :'https://autumnfish.cn/song/url',
        method: 'get' ,
        params : {
          id
        }
      }).then(res => {
        let url = res.data.data[0].url
        // console.log(this.$parent.musicUrl)
        this.$parent.musicUrl = url
      })
    }
  }
}

</script>

