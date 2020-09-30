<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <img src="../../assets/gif.gif" alt="">
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toSearch"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "top",
  data() {
    return {
      inputValue: ""
    }
  },
  methods: {
    toSearch() {
      if (this.inputValue === "") {
        this.$message.warning("请输入内容")
      } else {
        this.$router.push(`/result?p=${this.inputValue}`)
      }
    }
  }
}
</script>

<style scoped>

</style>