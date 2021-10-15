<template>
  <div id="app" data-server-rendered="true">
    <loader id="global"></loader>
    <alert></alert>
    <transition-page>
      <router-view />
    </transition-page>
  </div>
</template>
<script>
import TransitionPage from "./transitions/TransitionPage.vue";
import alert from "./plugins/appNotification/alert/plugin.vue";
export default {
  components: {
    TransitionPage,
    alert
  },
}
</script>
<style lang="scss">
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
