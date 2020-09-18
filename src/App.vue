<template>
  <div id="app">
    <!--顶部-->
    <top></top>
    <!--主体-->
    <index></index>
  </div>
</template>

<script>
import top from './components/top'
import index from './components/index'

export default {
  name: 'App',
  components: {
    top,
    index
  },
  methods : {

  }
}
</script>

<style>

</style>
