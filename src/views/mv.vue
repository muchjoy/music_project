<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
            controls
            :src="mvcontent.url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="player.img1v1Url" alt="" />
          </div>
          <span class="name">{{mvinfo.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvinfo.name}}</h2>
          <span class="date">发布：{{mvinfo.publishTime}}</span>
          <span class="number">播放：{{mvinfo.playCount}}次</span>
          <p class="desc">
            {{mvinfo.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap" v-if="hotcomments.length != 0">
        <p class="title">精彩评论<span class="number">({{hotcomments.length}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item ,index) in hotcomments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-for="(items , index) in item.beReplied" :key="index">
                <span class="name">{{items.user.nickname}}：</span>
                <span class="comment">{{items.content}}</span>
              </div>
              <div class="date">{{item.time | getDate}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number">({{total}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item , index) in comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-for="(items , index) in item.beReplied" :key="index">
                <span class="name">{{items.user.nickname}}：</span>
                <span class="comment">{{items.content}}</span>
              </div>
              <div class="date">{{item.time | getDate}}</div>
            </div>
          </div>

        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
          :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item , index) in mvlist" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount | getnum}}</div>
              </div>
              <span class="time">{{item.duration | gettime}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playMv , mvInfo , mvs , playerInfo , comment} from "@/network/mv";

export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 20,
      mvcontent : {},
      mvinfo : {} ,
      mvlist : [],
      player : {},
      comments : [],
      hotcomments : [],
      count : 0

    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val)
      this.page = val
      //评论
      comment(this.$route.query.id,this.page).then(res => {
        console.log(res)
        if (res.data.hotComments) {
          this.hotcomments = res.data.hotComments;
        }
        this.hotcomments = []
        this.comments = res.data.comments;
        this.total = res.data.total;
      })
    }
  },
  created() {
    //播放mv  async await
    playMv(this.$route.query.id).then(res => {
      this.mvcontent = res.data.data
    })
    //mv信息
    mvInfo(this.$route.query.id).then(res => {
      this.mvinfo = res.data.data
      //歌手信息
      playerInfo(this.mvinfo.artists[0].id).then(res => {
        this.player = res.data.artist
      })
    })
    //相关mv
    mvs(this.$route.query.id).then(res => {
      this.mvlist = res.data.mvs
    })
    //评论
    comment(this.$route.query.id,this.page).then(res => {
      console.log(res)
      this.comments = res.data.comments
      this.hotcomments = res.data.hotComments
      this.total = res.data.total
    })
  },
  filters : {
    getnum(num) {
      return num = num > 10000 ? parseInt(num / 10000) + "万" : num
    },
    gettime(num) {
      let mm = parseInt(num / 1000 / 60 % 60);
      mm = mm < 10 ? "0" + mm : mm
      let ss = parseInt(num / 1000 % 60)
      ss = ss < 10 ? "0" + ss : ss
      return `${mm}:${ss}`
    },
    getDate(date) {
      const dt = new Date(date)
      const y = dt.getFullYear();
      const m = dt.getMonth() + 1;
      const r = dt.getDate();

      const hh = dt.getHours();
      const mm = dt.getMinutes();
      const ss = dt.getSeconds();
      return `${y}-${m}-${r} ${hh}:${mm}:${ss}`
    }
  }
  }
</script>

<style>

</style>
