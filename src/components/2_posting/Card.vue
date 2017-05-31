<template>
  <div id="card">
    <div id="card-wrapper" class="_float_con">
        <div id="author"></div>
        <div id="content">{{ card.cont_1 }}</div>
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
      }
    }
  }
</script>

<style scoped lang="scss">
  #card-wrapper {
    :after {
      clear: both;
    }
  }

  @media only screen and (min-width: 1024px) {
    #content {
      width: 500px;
      background-color: white;
    }
  }
</style>
