<template>
  <!--
  <Navbar />
  <nav style="background: #303030;color: #fff !important;display: flex;justify-content: space-evenly;align-items: stretch;flex-wrap: nowrap;flex-direction: row;">
    <a style="color: #fff;text-decoration: none;padding: 25px;border-bottom: 5px solid;width: 50%;text-align: center;" href="#">Operatives</a>
    <a style="color: #fff;text-decoration: none;padding: 25px;width: 50%;text-align: center;" href="#">Ploys</a>
  </nav>
  -->
  <!--<div class="container" style="background: #303030 !important">-->
    <router-view></router-view>
  <!--</div>-->
</template>

<script>
  import Navbar from "./components/Navbar.vue";
  export default {
    components: {
      Navbar
    },
    data(){
      return {}
    },
    mounted() {},
    methods: {}
  }
</script>

<style>

</style>
