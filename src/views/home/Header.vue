<template>
  <div class="header">
    <div class="header_banner" :style="banners">
      <menuBtn :login="login" :name="name" :user_pic="user_pic"></menuBtn>
      <!-- 中间的点击进入博客 -->
      <div class="banner_blog" :class="{'banners_active':isClass === 1}">
        <h1>Muchjoy Blog</h1>
        <p>只要朝着一个方向努力，一切都会变得得心应手</p>
        <el-button type="primary" @click="toBlog">进入博客</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//导入请求
import {getInfo} from "@/network/home/home";

//导入按钮组件
import menuBtn  from "@/components/button/button";

export default {
  name: "Header",
  components: {menuBtn},
  data() {
    return {
      banners: {
        backgroundImage: `url(${require('../../assets/img/index_bg.jpg')})`,
      },
      isClass: 0,
      login : '',
      name : '',
      user_pic : ''
    }
  },
  created() {
    this.isClass = 1;
    this.getUserInfo()
  },
  methods: {
    toBlog() {
      this.$router.push('/Blog')
    },
    //获取用户信息
    async getUserInfo(){
      console.log('1111')
      const res = await getInfo()
      console.log(res)
      if(res.status === 0){
        this.login = '退出登录'
        let name = res.data.nickname || res.data.username
        this.name = name
        this.user_pic = res.data.user_pic
      }else if(res.status === 1){
        this.login = '登录'

      }

    },
  },

}
</script>

<style scoped>
.header {
  width: 100%;
  height: 100%;
}

.header_banner {
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  background-attachment: fixed;
  background-color: transparent;
  background-size: cover;
}

.banner_blog {
  width: 300px;
  height: 150px;
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 150px);
  Color: #ffffff;
  text-align: center;
  transition: all 1s;
}

.banner_blog h1, .banner_blog p {
  margin-bottom: 15px;
  font-weight: 400;
}

.banners_active {
  animation: banner_box 0.5s ease-in-out;
}

@keyframes banner_box {
  0% {
    transform: scale(0);

  }
  100% {
    transform: scale(1);
  }
}



</style>