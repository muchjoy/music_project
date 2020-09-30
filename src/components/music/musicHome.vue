<template>
  <div id="music_home">
    <top/>
    <index/>
  </div>
</template>

<script>


import index from '@/components/music/index'
import top from '@/components/music/top'

export default {
  name: "musicHome",
  components: {
    index,
    top
  }
}
</script>

<style scoped>
#music_home {
  height: 100%;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
  Microsoft YaHei, '\5FAE\8F6F\96C5\9ED1', Arial, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  /*transition: 0.5s;*/
}

#music_home a {
  text-decoration: none;
}

#music_home ul,
#music_home ol {
  list-style: none;
}
</style>