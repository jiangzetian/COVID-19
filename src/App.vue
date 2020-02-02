<template>
  <div id="app">
    <router-view></router-view>
    <div style="padding: 8%"></div>
    <Nav></Nav>
  </div>
</template>
<script>
  import Nav from '@/components/Nav'
  export default {
    name: 'home',
    components: {
      Nav
    },
    methods:{

    },
    created() {

    },
    mounted() {
    }
  }
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    width: 100%;
    height: 100%;
    max-width: 750px;
  }
  #app{
    width: 100%;
    height: 100%;
    /*background: #2d2f33;*/
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    /*max-width: 750px;*/
  }
</style>
