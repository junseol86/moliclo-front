<template>
  <div id="top-bar-wrapper">
    <div id="top-bar">
      <div id="logo" v-on:click="routeTo('/')"></div>
      <div class="button" v-bind:class="{ '-on': props.location=='write'}" id="write"></div>
      <div class="button" v-bind:class="{ '-on': props.location=='my-page'}" id="my-page" v-on:click="routeTo('my-page')"></div>
      <div class="button" v-bind:class="{ '-on': props.location=='likes'}" id="likes"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top-bar',
    props: ['props'],
    methods: {
      routeTo: function (destination) {
        this.$router.push(destination)
      }
    }
  }
</script>

<style lang="scss">
  #top-bar-wrapper {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #ccc;
  }

  #top-bar {
    height: 54px;
    &:after {
      clear: both;
    }
    & .button {
        float:right;
        width: 44px;
        height: 54px;
        opacity: 0.5;
        cursor: pointer;
        background-size: 44px 54px;
        &.-on {
          opacity: 1;
        }
        &:hover {
            opacity: 1;
        }
    }
  }

  #likes { background-image: url('../../assets/images/top-bar-button-likes.png'); }
  #likes.-on { background-image: url('../../assets/images/top-bar-button-likes-on.png'); }
  #my-page { background-image: url('../../assets/images/top-bar-button-my-page.png'); }
  #my-page.-on { background-image: url('../../assets/images/top-bar-button-my-page-on.png'); }
  #write { background-image: url('../../assets/images/top-bar-button-write.png'); }
  #write.-on { background-image: url('../../assets/images/top-bar-button-write-on.png'); }

  #write {
    margin-right: 8px;
  }

  #logo {
    float:left;
    width: 110px;
    height: 54px;
    background-image: url('../../assets/images/top-bar-logo-mobile.png');
    background-size: 110px 54px;
    cursor: pointer;
  }

  @media only screen and (min-width: 768px) {

  }

  @media only screen and (min-width: 1024px) {
    
    #top-bar {
      width: 1024px;
      margin: 0 auto;
    }

    #logo {
      width: 180px;
      height: 54px;
      background-image: url('../../assets/images/top-bar-logo-desktop.png');
      background-size: 180px 54px;
    }
  }

</style>
