<template>
  <div class="playlists-container">
    <!--精品推荐-->
    <div class="top-card">
      <!--封面-->
      <div class="icon-wrap">
        <img :src="toplist.coverImgUrl" alt="">
      </div>
      <!--主体内容-->
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
       <!--标题-->
        <div class="title">
          {{ toplist.copywriter }}
        </div>
        <!--内容-->
        <div class="info">
          {{toplist.description}}
        </div>
      </div>
      <img :src="toplist.coverImgUrl" alt="" class="bg">
      <div class="bg-mask"></div>
    </div>
    <!--tab栏-->
    <div class="tab-container">
      <div class="tab-bar">
        <span class="item" :class="{active:tag==='全部'}" @click="tag='全部'">全部</span>
        <span class="item" :class="{active:tag==='欧美'}" @click="tag='欧美'">欧美</span>
        <span class="item" :class="{active:tag==='华语'}" @click="tag='华语'">华语</span>
        <span class="item" :class="{active:tag==='流行'}" @click="tag='流行'">流行</span>
        <span class="item" :class="{active:tag==='说唱'}" @click="tag='说唱'">说唱</span>
        <span class="item" :class="{active:tag==='摇滚'}" @click="tag='摇滚'">摇滚</span>
        <span class="item" :class="{active:tag==='民谣'}" @click="tag='民谣'">民谣</span>
        <span class="item" :class="{active:tag==='电子'}" @click="tag='电子'">电子</span>
        <span class="item" :class="{active:tag==='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
        <span class="item" :class="{active:tag==='影视原声'}" @click="tag='影视原声'">影视原声</span>
        <span class="item" :class="{active:tag==='ACG'}" @click="tag='ACG'">ACG</span>
        <span class="item" :class="{active:tag==='怀旧'}" @click="tag='怀旧'">怀旧</span>
        <span class="item" :class="{active:tag==='治愈'}" @click="tag='治愈'">治愈</span>
        <span class="item" :class="{active:tag==='旅行'}" @click="tag='旅行'">旅行</span>
      </div>
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item , index) in list" :key="index" @click="toplayList(item.id)">
            <div class="img-wrap">
             <div class="num-wrap">
               播放量:
               <span class="num">{{item.playCount}}</span>
             </div>

            <img v-lazy="item.coverImgUrl" alt="">
            <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  <!-- 分页器-->
    <el-pagination
        @current-change ="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total=total
        :current-page=page
        :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
import {playlist , highquality} from "@/network/music/PlayLists";
export default {
  name: "PlayLists",
  data(){
    return {
      //总条目数
      total :0,
      //页面
      page : 1,
      tag :'全部',
    // 精品推荐数据
      toplist : {},
      list : []
    }
  },
  //监听器
  watch:{
   tag(){
    this.tagData();
    this.page = 1
   }
  },
  created() {
    this.tagData();
  },
  methods : {
    //获取歌单
    async tagData(){
      const {data : res0} = await highquality(1, this.tag)
      this.toplist = res0.playlists[0]
      const {data : res1} = await playlist(10 , (this.page-1)*10 , this.tag )
      this.total = res1.total
      this.list = res1.playlists
    },
    //跳转歌单
    toplayList(id){
      this.$router.push(`/playlist?id=${id}`)
    },
    //切换
    handleCurrentChange(val) {
      this.page = val
      this.tagData()
    },
  }
}
</script>

<style scoped>

</style>