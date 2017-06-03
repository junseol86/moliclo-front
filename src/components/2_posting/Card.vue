<template>
  <div id="card">
    <div id="card-wrapper" class="_float_con">
        <div id="author">
          <div v-if="card.postingInfo">
            <div id="user-thumbnail" v-bind:style="userThumbStyle"></div>
            <div id="user-name">
              {{ card.postingInfo.user_name }}
            </div>
          </div>
        </div>
        <div id="content">
          <div id="card-text" v-if="card.card_type === 'TEXT'">{{ card.cont_1 }}</div>
          <div v-if="card.card_type === 'IMAGE'">
            <div id="card-image" v-bind:style="cardImageStyle"></div>
            <div id="card-image-desc">{{ card.cont_2 }}</div>
          </div>
        </div>
        <div id="branches"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: ['card'],
    data () {
      return {
        cardImageStyle: {
          background: '',
          backgroundSize: '',
          backgroundPosition: '',
          width: '',
          height: ''
        },
        userThumbStyle: {
          background: '',
          backgroundSize: '',
          backgroundPosition: ''
        }
      }
    },
    methods: {
      setImageCardBg: function () {
        var ip = require('../../scripts/image_processor.js')
        var bgImg = new Image()
        var self = this
        bgImg.src = this.card.cont_1
        bgImg.onload = function () {
          var resultStyle = ip.imageProcessor().fitToImageStyle(document.getElementById('card-image'), this)
          self.cardImageStyle.background = resultStyle.background
          self.cardImageStyle.backgroundSize = resultStyle.backgroundSize
          self.cardImageStyle.backgroundPosition = resultStyle.backgroundPosition
          self.cardImageStyle.width = resultStyle.width
          self.cardImageStyle.height = resultStyle.height
        }
      },
      setUserThumbBg: function () {
        var ip = require('../../scripts/image_processor.js')
        var bgImg = new Image()
        var self = this
        bgImg.src = this.card.postingInfo.user_thumbnail
        bgImg.onload = function () {
          var resultStyle = ip.imageProcessor().fillImageStyle(document.getElementById('user-thumbnail'), this)
          self.userThumbStyle.background = resultStyle.background
          self.userThumbStyle.backgroundSize = resultStyle.backgroundSize
          self.userThumbStyle.backgroundPosition = resultStyle.backgroundPosition
        }
      }
    },
    mounted () {
      if (this.card.card_type === 'IMAGE') {
        this.setImageCardBg()
      }
      if (this.card.postingInfo) {
        this.setUserThumbBg()
      }
    }
  }
</script>

<style scoped lang="scss">
  #card-wrapper {
    margin-bottom: 8px;
    :after {
      clear: both;
    }
    #content {
      background-color: white;
      border-radius: 4px;
      overflow: hidden;
      #card-text {
        padding: 16px;
      }
      #card-image {
        background-color: #333;
        cursor: pointer;
      }
      #card-image-desc {
        padding: 6px;
        font-size: 0.9em;
        color: white;
        background-color: #78c199;
      }
      :hover {
        #card-image-desc {
          background-color: #509c6f;
        }
      }
    }
  }

  @media only screen and (min-width: 1024px) {
    #author {
      width: 100px;
      min-height: 1px;
      text-align: right;
      > div > * {
        display: inline-block;
      }
      #user-thumbnail {
        width: 44px;
        height: 44px;
        margin: 2px 12px;
        border-radius: 22px;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
      #user-name {
        margin-right: 15px;
        font-size: 0.9em;
        font-weight: bold;
      }
    }
    #content {
      width: 500px;
    }
  }
</style>
