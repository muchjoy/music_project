<template>
  <div id="home">
    <Header></Header>
<!--    <Home_main></Home_main>-->
  </div>
</template>

<script>
import Header from "@/views/home/Header";
import Home_main from '@/views/home/Home_main'

export default {
  name: "home",
  components: {
    Home_main,
    Header
  },
  methods: {
    loginBtn() {
      console.log(this.$router)
      this.$router.push('/login')
    },
    toMusic() {
      this.$router.push('/musichome')
    }
  }
}
</script>

<style scoped>
#home {
  width: 100%;
  height: 100%;
}
</style>