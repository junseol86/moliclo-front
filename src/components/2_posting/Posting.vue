<template>
  <div id="main-page">
    <top-bar v-bind:props="topBarProps"></top-bar>
    <div id="posting-wrapper" class="_float_con">
    </div>
  </div>
</template>

<script>
  import TopBar from '../0_shared/TopBar'
//   import secrets from '../../utils/secrets.js'
  
  export default {
    components: {TopBar},
    name: 'posting',
    data () {
      return {
        topBarProps: {
          location: 'posting'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #posting-wrapper {
    padding: 64px 16px 16px 16px;
    margin: 0 auto;
  }
</style>
