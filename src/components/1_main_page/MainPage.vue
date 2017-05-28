<template>
  <div id="main-page">
    <top-bar v-bind:props="topBarProps"></top-bar>
    <div id="main-page-wrapper" class="_float_con">
      <div v-for="posting in postings" :key=posting.idx v-on:click="goToPosting(posting.idx)">
        <posting-thumb v-bind:posting="posting"></posting-thumb>
      </div>
    </div>
  </div>
</template>

<script>
  import PostingThumb from '../0_shared/PostingThumb'
  import TopBar from '../0_shared/TopBar'
  import secrets from '../../utils/secrets.js'

  export default {
    components: {PostingThumb, TopBar},
    name: 'main-page',
    data () {
      return {
        topBarProps: {
          location: 'main-page'
        },
        postings: [],
        page: 0,
        perPage: 0
      }
    },
    methods: {
      getList: function () {
        this.perPage = window.innerWidth > 768 ? 30 : 5
        this.$http.get(`${secrets.server.dev}postings?page=${this.page}&per_page=${this.perPage}`)
          .then((result) => {
            this.postings = result.data.postingList
          })
      },
      sizeWrapper: function () {
        if (window.innerWidth > 768) {
          let wrapperWidth = Math.floor(window.innerWidth / 312) * 312
          document.getElementById('main-page-wrapper').style.width = wrapperWidth + 'px'
        }
      },
      goToPosting: function (posting) {
        this.$router.push(`postings/${posting}`)
      }
    },
    mounted () {
      this.sizeWrapper()
      let sizeWrapper = this.sizeWrapper
      window.addEventListener('resize', function () {
        sizeWrapper()
      })
      this.getList()
    }
  }

</script>

<style scoped lang="scss">
  #main-page-wrapper {
    padding: 64px 16px 16px 16px;
    margin: 0 auto;
  }
</style>
