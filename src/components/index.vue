<template>
    <div class="index-container">
      <!--左侧-->
     <div class="nav">
       <ul>
         <li>
           <router-link to="/discovery">
             <span class="iconfont icon-find-music"></span>
             发现音乐
           </router-link>
         </li>
         <li>
           <router-link to="/playlists">
             <span class="iconfont icon-music-list"></span>
             推荐歌单
           </router-link>
         </li>
         <li>
           <router-link to="/songs">
             <span class="iconfont icon-music"></span>
             最新音乐
           </router-link>
         </li>
         <li>
           <router-link to="/mvs">
             <span class="iconfont icon-mv"></span>
             最新MV
           </router-link>
         </li>
       </ul>
     </div>
      <!--右侧-->
      <div class="main">
        <router-view></router-view>
      </div>
      <!--播放标签-->
      <div class="player">
        <audio :src="musicUrl" controls autoplay></audio>
      </div>
    </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      musicUrl:""
    }
  }
}
</script>

<style scoped>

</style>