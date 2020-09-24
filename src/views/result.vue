<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class='title'>{{$route.query.p}}</h2>
      <span class="sub-title">找到{{count}}条结果</span>

    </div>
      <!--tab栏-->
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
          <table class="el-table">
            <thead>
              <th></th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </thead>
            <tbody>
              <tr class="el-table__row" v-for="(item , index) in songlist" :key="index" @dblclick="playMusic(item.id)">
                <td>{{index+1}}</td>
                <td>
                  <div class="song-wrap">
                    <div class="name-wrap">
                      <span>{{item.name}}</span>
                      <span class="iconfont icon-mv" v-if="item.mvid !== 0"></span>
                    </div>
                    <span v-if="item.alias.length!==0">{{item.alias[0]}}</span>
                  </div>
                </td>
                <td>{{item.artists[0].name}}</td>
                <td>{{item.album.name}}</td>
                <td>{{item.duration | gettime}}</td>
              </tr>
            </tbody>
          </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item , index) in playList" :key="index" @click="toplayList(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount | getnum}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="">
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items">
          <div class="item" v-for="(item , index) in mvlist" :key="index" @click="toplayMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="">
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount | getnum}}</div>
              </div>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
    <!--分页-->
    <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'

import {searchNow} from '@/network/result'

//播放音乐
import {getMusicUrl} from '@/network/playMusic'

export default {
  name: "result",
  data(){
    return {
      // input: '',
      activeIndex: 'songs',
      songlist : [] ,
      playList:[],
      mvlist :[],
      count : 0 ,
      page : 1 ,
      total : 0 ,
      pValue:null,
      type :1
    }
  },
  created() {
    this.pValue = this.$route.query.p
    this.search()
  },

  methods: {
    async search(){
     const {data:res} =  await searchNow(this.pValue,1,20,0)
      this.songlist = res.result.songs
      this.count = res.result.songCount
      this.total = res.result.songCount
    },
    //播放音乐
    async playMusic(id){
      const {data : res} = await getMusicUrl(id)
      let url = res.data[0].url
      this.$parent.musicUrl = url
    },
    //跳转歌单
    toplayList(id){
      this.$router.push(`/playlist?id=${id}`)
    },
    //跳转mv
    toplayMV(id){
      this.$router.push(`/mv?id=${id}`)
    },

    async handleCurrentChange(val) {
      this.page = val
      const {data: res} = await searchNow(this.pValue,this.type,20,(this.page - 1) * 20)
      if (this.type === 1) {
        this.songlist = res.result.songs
        this.count = res.result.songCount
        this.total = res.result.songCount

      } else if (this.type === 1000) {
        this.playList = res.result.playlists
        this.count = res.result.playlistCount
        this.total = res.result.playlistCount
      } else {
        this.mvlist = res.result.mvs
        this.count = res.result.mvCount
        this.total = res.result.mvCount
      }
    }
  },
  watch : {
    async activeIndex(){
      this.page = 1
      switch (this.activeIndex){
        case "songs":
          this.type = 1;
          break;
        case "lists":
          this.type = 1000;
          break;
        case "mv" :
          this.type = 1004;
          break;
      }
      const {data: res} = await searchNow(this.pValue,this.type,20,(this.page - 1) * 20)
          if(this.type == 1){
            this.songlist = res.result.songs
            this.count = res.result.songCount
            this.total = res.result.songCount

          }else if(this.type == 1000){
            this.playList = res.result.playlists
            this.count = res.result.playlistCount
            this.total = res.result.playlistCount
          }else {
            this.mvlist = res.result.mvs
            this.count = res.result.mvCount
            this.total = res.result.mvCount

          }
    },
    $route: function (newValue, oldValue) {
      if(newValue.query.p) {
        this.pValue = newValue.query.p
        this.search()

      }
    }
  }

}
</script>

<style scoped>

</style>