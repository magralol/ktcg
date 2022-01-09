<template>
  <Navbar />
  <div class="container">
    <router-view></router-view>
  </div>
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
