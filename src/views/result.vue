<template>
  <div class="result">
      <!--tab栏-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <!--分页-->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "result",
  data(){
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  //生命周期钩子
  created() {
    // console.log(111)
    console.log(this.$route.query.p)
  },
  watch:{
    $route(n,o) {
      console.log(n.query.p)
    }
  }
}
</script>

<style scoped>

</style>