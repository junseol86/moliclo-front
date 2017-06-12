<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted () {
    // let vm = this
    window.fbAsyncInit = function () {
      window['FB'].init({
        appId: '834049790080322',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      })
      window['FB'].AppEvents.logPageView()
    }
  }
}
</script>

// npm install sass-loader node-sass style-loader --save-dev만 해주면 돌아간다
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
