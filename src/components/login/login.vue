<template>
  <div id="lg" :style="backgd">
    <menu-btn></menu-btn>
    <div class="dowebok" id="dowebok" :class="{'right-panel-active':isClick===1}">
      <div class="form-container sign-up-container">
        <form action="#" @submit.prevent="register">
          <!--注册 -->
          <h1>注册</h1>
          <input type="text" v-model.trim="username" placeholder="用户名" required>
          <input type="password" v-model.trim="password" placeholder="密码" required>
          <button>注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#" @submit.prevent="logon">
          <!--登录-->
          <h1>登录</h1>
          <input type="text" v-model.trim="name" placeholder="用户名" required>
          <input type="password" v-model.trim="pwd" placeholder="密码" required>
          <a href="#">忘记密码？</a>
          <button>登录</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有帐号？</h1>
            <p>请使用您的帐号进行登录</p>
            <button class="ghost" id="signIn" @click="signIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有帐号？</h1>
            <p>立即注册加入我们</p>
            <button class="ghost" id="signUp" @click="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login, Reguser} from "@/network/login/login";

//导入菜单按钮组件
import menuBtn from "@/components/button/button";

export default {
  name: "login",
  components:{menuBtn},
  data() {
    return {
      isClick: 0,
      username: '',
      password: '',
      name: '',
      pwd: '',
      backgd: {
        backgroundImage: `url(${require('../../assets/img/bg.jpg')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    }
  },
  methods: {
    signIn() {
      this.isClick = 0
    },
    signUp() {
      this.isClick = 1
    },
    async register() {
      const res = await Reguser(this.username, this.password)
      console.log(res)
      if (res.status !== 0) {
        this.$message.error('注册失败');
      } else {
        this.$notify({
          title: '注册成功',
          message: '即将跳转到登录页面',
          type: 'success'
        });
        //跳转到登录页面
        this.signIn()
      }
    },
    async logon() {
      const res = await login(this.name, this.pwd)
      console.log(res)
      if (res.status !== 0) {
        this.$message.error('登录失败');
      } else {
        this.$notify({
          title: '登录成功',
          message: '欢迎来到Muchjoy的个人博客',
          type: 'success'
        });
        //存入token
        this.$store.commit('setToken' , res.token)
        this.$router.push('/home');

      }

    }
  }
}
</script>

<style scoped>
/** {*/
/*  box-sizing: border-box;*/
/*}*/

#lg {
  font-family: 'Montserrat', sans-serif;
  /*background: #f6f5f7;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /*margin: -20px 0 50px;*/


}

#lg h1 {
  font-weight: bold;
  margin: 0;
}

#lg p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  margin: 20px 0 30px;
}

#lg span {
  font-size: 12px;
}

#lg a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

#lg button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

#lg button:active {
  transform: scale(.95);
}

#lg button:focus {
  outline: none;
}

#lg button.ghost {
  background: transparent;
  border-color: #fff;
}
</style>