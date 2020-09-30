<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="section-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" @click="area='全部'" :class="{active:area==='全部'}">全部</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='内地'" :class="{active:area==='内地'}">内地</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='港台'" :class="{active:area==='港台'}">港台</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='欧美'" :class="{active:area==='欧美'}">欧美</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='日本'" :class="{active:area==='日本'}">日本</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='韩国'" :class="{active:area==='韩国'}">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" @click="type='全部'" :class="{active:type==='全部'}">全部</span>
          </li>
          <li class="tab">
            <span class="title" @click="type='官方版'" :class="{active:type==='官方版'}">官方版</span>
          </li>
          <li class="tab">
            <span class="title" @click="type='原声'" :class="{active:type==='原声'}">原声</span>
          </li>
          <li class="tab">
            <span class="title" @click="type='现场版'" :class="{active:type==='现场版'}">现场版</span>
          </li>
          <li class="tab">
            <span class="title" @click="type='网易出品'" :class="{active:type==='网易出品'}">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" @click="order='上升最快'" :class="{active:order==='上升最快'}">上升最快</span>
          </li>
          <li class="tab">
            <span class="title" @click="order='最热'" :class="{active:order==='最热'}">最热</span>
          </li>
          <li class="tab">
            <span class="title" @click="order='最新'" :class="{active:order==='最新'}">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!--mv -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item , index) in mvlist" :key="index" @click="playmv(item.id)">
          <div class="img-wrap">
            <img v-lazy="item.cover" alt="">
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount | getnum}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
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
          :limit = "limit"
      >
      </el-pagination>

    </div>


  </div>
</template>

<script>

import {getMvs} from '@/network/music/Mvs'

export default {
  name: "Mvs",
  data(){
    return {
      area :'全部',
      type :'全部',
      order : '上升最快',
      //条数
      total : 20 ,
      //页码
      page : 1,
      //页容量
      limit : 12,
      mvlist : []
    }
  },
  created() {
    this.getList()
  },
  watch : {
    area(){
      this.getList()
    },
    type(){
      this.getList()
    },
    order(){
      this.getList()
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    playmv(id){
      this.$router.push(`/mv?id=${id}`)
    },

  //发送请求
   async getList(){
      const {data : res} = await getMvs(this.limit,
          this.area,
          this.type,
          this.order,
          (this.page-1)*this.limit)
     this.mvlist = res.data
     if(res.count) this.total = res.count
    }
  },
}
</script>

<style scoped>

</style>