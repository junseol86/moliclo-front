<template>
  <div id="posting-thumb-wrapper">
    <div id="posting-thumb">
      <div id="header">
        <div id="user-thumb" v-bind:style="userThumbStyle">
        </div>
        <div id="user-name-and-date">
          <span>{{ posting.user_name }}</span><br>
          <span id="date">{{ posting.updated }}</span>
        </div>
      </div>
      <div id="body">
        <div id="bg-image" v-bind:style="bgImgStyle">
        </div>
        <div id="body-content" v-bind:style="bodyContentStyle">
          {{ posting.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'posting-thumb',
    props: ['posting'],
    data () {
      return {
        userThumbStyle: {
          background: '',
          backgroundSize: '',
          backgroundPosition: ''
        },
        bgImgStyle: {
          width: '',
          background: '',
          backgroundSize: '',
          backgroundPosition: ''
        },
        bodyContentStyle: {
          width: ''
        }
      }
    },
    methods: {
      setUserThumbBg: function () {
        var ip = require('../../scripts/image_processor.js')
        var bgImg = new Image()
        var self = this
        bgImg.src = this.posting.user_thumbnail
        bgImg.onload = function () {
          var resultStyle = ip.imageProcessor().fillImageStyle(document.getElementById('user-thumb'), this)
          self.userThumbStyle.background = resultStyle.background
          self.userThumbStyle.backgroundSize = resultStyle.backgroundSize
          self.userThumbStyle.backgroundPosition = resultStyle.backgroundPosition
        }
      },
      setPostingThumbBg: function () {
        var ip = require('../../scripts/image_processor.js')
        var bgImg = new Image()
        var self = this
        bgImg.src = this.posting.posting_thumbnail
        bgImg.onload = function () {
          var resultStyle = ip.imageProcessor().fillImageStyle(document.getElementById('bg-image'), this)
          self.bgImgStyle.background = resultStyle.background
          self.bgImgStyle.backgroundSize = resultStyle.backgroundSize
          self.bgImgStyle.backgroundPosition = resultStyle.backgroundPosition
        }
      }
    },
    mounted () {
      this.bgImgStyle.width = Number(getComputedStyle(document.getElementById('posting-thumb')).width.replace('px', '')) + 20 + 'px'
      this.bodyContentStyle.width = getComputedStyle(document.getElementById('posting-thumb')).width
      this.setUserThumbBg()
      this.setPostingThumbBg()
    }
  }

</script>

<style scoped lang="scss">

  #posting-thumb-wrapper {
    width: 100%;
    height: 300px;
    background-color: white;
    border: 1px solid #ddd;
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 0 12px 0;
    cursor: pointer;
  }


  #posting-thumb {
    & #header {
      height: 60px;
      text-align: left;
      &::after {
        clear: both;
      }
      & #user-thumb {
        float: left;
        margin: 10px;
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        border-radius: 20px;
      }
      & #user-name-and-date {
        float: left;
        width: 200px;
        margin: 14px 0 0 2px;
        font-size: 0.9em;
        & #date {
          color: #bbb;
        }
      }
    }
    & #body {
      height: 240px;
      position: relative;
      overflow: hidden;
      background-color: black;
      & #bg-image {
        position: absolute;
        height: 260px;
        left: -10px;
        top: -10px;
        -webkit-filter: blur(8px);
        -moz-filter: blur(8px);
        -o-filter: blur(8px);
        -ms-filter: blur(8px);
        filter: blur(8px);
        opacity: 0.6;
      }
      
      & #body-content {
        z-index: 100;
        opacity: 0.99;
        height: 240px;
        line-height: 240px;
        text-align: center;
        color: white;
        font-size: 1.3em;
      }
    }
    &:hover {
      & #body {
        & #bg-image {
          -webkit-filter: blur(0);
          -moz-filter: blur(0);
          -o-filter: blur(0);
          -ms-filter: blur(0);
          filter: blur(0);
          opacity: 0.3;
        }
      }
    }
  }

  @media only screen and (min-width: 1023px) {

    #posting-thumb-wrapper {
      width: 300px;
      margin: 6px;
    }
    #posting-thumb-wrapper:hover {
      border: 1px solid #78c199;
    }
  }
</style>
