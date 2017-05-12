<template>
  <div id="main-page">
    <top-bar v-bind:props="topBarProps"></top-bar>
    <div id="main-page-wrapper" class="_float_con">
      <!--<posting-thumb v-for="posting in postings" v-bind:posting="posting"></posting-thumb>-->
    </div>
  </div>
</template>

<script>
//   import PostingThumb from '../reused/PostingThumb'
  import TopBar from '../0_shared/TopBar'

  export default {
    // components: {PostingThumb, TopBar},
    components: {TopBar},
    name: 'main-page',
    data () {
      return {
        topBarProps: {
          location: 'main-page'
        },
        postings: []
      }
    },
    methods: {
      sizeWrapper: function () {
        if (window.innerWidth > 768) {
          let wrapperWidth = Math.floor(window.innerWidth / 322) * 322
          document.getElementById('main-page-wrapper').style.width = wrapperWidth + 'px'
        }
      }
    },
    mounted () {
      this.sizeWrapper()
      let sizeWrapper = this.sizeWrapper
      window.addEventListener('resize', function () {
        sizeWrapper()
      })
    }
  }

</script>

<style scoped>
  #main-page-wrapper {
    padding: 64px 16px 16px 16px;
    margin: 0 auto;
  }
</style>
