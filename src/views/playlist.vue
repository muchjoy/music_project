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
          <tr class="el-table__row" v-for="(item , index) in lists.tracks" :key="index" >
            <td>{{ index+1 }}</td>
            <td>
              <div class="img-wrap" @click="playMusic(item.id)">
                <img v-lazy="item.al.picUrl" alt="">
                <span class="iconfont icon-play"></span>
              </div>
            </td>
            <td>
              <div class="song-wrap">
                <div class="name-wrap">
                  <span>{{ item.name }}</span>
                  <span class="iconfont icon-mv" v-if="item.mv !== 0" @click="playMv(item.mv)"></span>
                </div>
                <span>{{item.subTitle}}</span>
              </div>
            </td>
            <td>{{ item.ar[0].name }}</td>
            <td>{{ item.al.name }}</td>
            <td>{{ item.dt }}</td>
          </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`" name="comment">
      <!--评论-->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">({{hotCount}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item , index) in hotcomment" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="">
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}} : </span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content"  v-for="(items, index) in item.beReplied" :key="index">
                <span class="name">{{items.user.nickname}} : </span>
                <span class="comment">{{items.content}}</span>
              </div>
              <div class="data">{{item.time | getDate}}</div>
            </div>
          </div>
        </div>
      </div>
        <!--最新评论-->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">({{ total }})</span></p>
          <div class="comment-wrap">
            <div class="item" v-for="(item,index) in newcomment" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="">
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}} : </span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-for="(items , index) in item.beReplied" :key="index">
                  <span class="name">{{items.user.nickname}}</span>
                  <span class="comment">{{items.content}}</span>
                </div>
                <div class="date">{{ item.time | getDate}}</div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="page"
            :page-size="5"
        >
        </el-pagination>
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
      activeIndex: 'list',
      //热门评论
      hotcomment : [] ,
      hotCount : 0,
      newcomment : [],
      newCount : 0 ,
      // 总条数
      total: 0,
      // 页码
      page: 1,
      limit : 20
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
  created() {
    //获取评论详情
    axios({
      url : 'https://autumnfish.cn/comment/hot',
      method : 'get',
      params : {
        id : this.$route.query.id,
        type : 2
      }
    }).then(res => {
      this.hotcomment = res.data.hotComments
      this.hotCount = res.data.total
    })
    //最新评论
    axios({
      url : 'https://autumnfish.cn/comment/playlist' ,
      method : 'get' ,
      params : {
        id : this.$route.query.id,
        limit : 10,
        offset : 0
      }
    }).then( res => {

      this.newcomment = res.data.comments
      this.total = res.data.total
    })
  },
  methods : {
    handleCurrentChange(val) {
      this.page = val
      axios({
        url : 'https://autumnfish.cn/comment/playlist' ,
        method : 'get' ,
        params : {
          id : this.$route.query.id,
          limit : 10,
          offset : (this.page-1)*10
        }
      }).then( res => {
        console.log(res)
        this.newcomment = res.data.comments
        this.total = res.data.total
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
    },
    playMv(id){
      this.$router.push(`/mv?id=${id}`)
    }
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