<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" @click="tag='0'" :class="{active:tag==='0'}">全部</span>
      <span class="item" @click="tag='7'" :class="{active:tag==='7'}">华语</span>
      <span class="item" @click="tag='96'" :class="{active:tag==='96'}">欧美</span>
      <span class="item" @click="tag='8'" :class="{active:tag==='8'}">日本</span>
      <span class="item" @click="tag='16'" :class="{active:tag==='16'}">韩国</span>
    </div>
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item , index) in songlist" :key="index">
          <td>{{ index+1 }}</td>
          <td>
            <div class="img-wrap">
              <img v-lazy="item.album.picUrl" alt="">
              <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{item.name}}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{item.album.artists[0].name}}</td>
          <td>{{item.album.name}}</td>
          <td>{{item.duration | gettime}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Songs",
  data() {
    return {
      songlist:[],
      tag : '0'
    }
  },
  watch : {
    tag(){
      this.getlist()
    }

  },
  created() {
    this.getlist()
  },
  methods: {
    getlist(){
      axios({
        url : 'https://autumnfish.cn/top/song',
        method : 'get' ,
        params : {
          type : this.tag
        }
      }).then( res => {
        console.log(res)
        this.songlist = res.data.data

      })
    },
    playMusic(id){
      axios({
        url :'https://autumnfish.cn/song/url',
        method : 'get',
        params:{
          id
        }
      }).then(res => {
        let url = res.data.data[0].url
        this.$parent.musicUrl = url
      })
    }
  },
  filters : {
    gettime(num){
      let mm = parseInt(num/1000/60%60);
      mm=mm<10?"0"+mm:mm
      let ss = parseInt(num/1000%60)
      ss=ss<10?"0"+ss:ss
      return `${mm}:${ss}`
    }
  }
}
</script>

<style scoped>

</style>