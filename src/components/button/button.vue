<template>
  <div id="menuBtn">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="drawer_nav"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <!--头像-->
          <div class="demo-type">
            <el-avatar :size="50" src="" @error="errorHandler">
              <img :src="user_pic"/>
            </el-avatar>
            <span class="uname">欢迎{{name}}</span>
          </div>


          <v-list-item @click="toHome">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>首页</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toBlog">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>博客</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toMusic">
            <v-list-item-icon>
              <v-icon>mdi-music</v-icon>
            </v-list-item-icon>
            <v-list-item-title>音乐</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toLogin" v-if="login === '登录'">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>登录</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toOut()" v-else>
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>退出登录</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div class="btn_menu btn_opan" @click="drawer = true; toClose" :class="{'btn_close':isClose === 1}">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "menuBtn",
  data(){
    return {
      isClose: 0,
      drawer: false,
      group: null,
    }
  },
  props:{
    login : {
      type : String,
      default : '登录'
    },
    name : {
      type : String,
      default : '游客'
    },
    user_pic : {
      type : String,
      default : ''
    }
  },
  methods:{
    toBlog() {
      this.$router.push('/Blog')
    },
    toHome(){
      this.$router.push('/home')
    },
    toMusic(){
      this.$router.push('/musichome')
    },
    toLogin(){
      this.$router.push('/login')
    },
    toClose(){
      this.isClose = 1
    },
    //退出登录操作  回退到登录页面, 同时清空token
    toOut(){
      this.toLogin()
      this.$store.commit('setToken' , '')
    },
    errorHandler() {
      return true
    }
  }
}
</script>

<style scoped>
.btn_menu {
  position: absolute;
  top: 5%;
  right: 2%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, .1);
  overflow: hidden;
  padding-top: 8px;
}

.btn_menu:hover {
  background: #3a8ee6;
}
.btn_opan span {
  display: block;
  width: 26px;
  height: 2px;
  background: #ffffff;
  line-height: 10px;
  margin: 5px auto;
}
.btn_close:first-child {
  animation: btn_close 0.5s ease-in-out;
}

@keyframes btn_close {
  0% {
    transform: rotate(0);

  }
  100% {
    transform: rotate(60deg);

  }
}

.drawer_nav {
  opacity: 0.5;
}

.demo-type  {
  display: flex;
  align-items: center;
}

.demo-type span {
  margin-left: 10px;
  margin-top: 10px;
}

</style>