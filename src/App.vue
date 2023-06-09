<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
</script>

<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style>
html,
body {
  height: 100vh;
  overflow: hidden;
}
#app {
  height: 100vh;
}
</style>
