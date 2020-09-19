<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="lists.coverImgUrl" alt="">
      </div>
      <div class="info-wrap">
        <p class="title">{{ lists.name }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="creator.avatarUrl" alt="" >
          <span class="name">{{creator.nickname}}</span>
          <span class="time">{{lists.createTime | getDate}}</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li  v-for="item in lists.tags">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">
           {{ lists.description }}
          </span>
        </div>
      </div>
    </div>
  <!-- 歌曲列表 评论  -->
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="list">
      <!--歌曲列表 -->


      </el-tab-pane>
      <el-tab-pane label="评论" name="comment">
      <!--评论-->


      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import axios from 'axios'
export default {
name: "playlist",
  data(){
    return {
      lists:{},
      creator: {},
      activeIndex: 'list'
    }
  },
  async mounted() {
    const { data: res } = await axios({
      url:"https://autumnfish.cn/playlist/detail",
      method : 'get',
      params : {
        id : this.$route.query.id
      }
    })
    this.lists = res.playlist
    this.creator = res.playlist.creator
  },
  filters : {
    getDate(date){
      const dt = new Date(date)
      const y = dt.getFullYear();
      const m = dt.getMonth()+1;
      const r = dt.getDate();

      const hh = dt.getHours();
      const mm = dt.getMinutes();
      const ss = dt.getSeconds();
      return `${y}-${m}-${r} ${hh}:${mm}:${ss}`
    }
  }
}
</script>

<style scoped>

</style>