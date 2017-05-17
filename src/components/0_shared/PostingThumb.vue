<template>
  <div class="posting-thumb-wrapper">
    <div class="posting-thumb">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'posting-thumb',
    data () {
      return {
        props: ['props']
      }
    }
  }

</script>

<style scoped>

  .posting-thumb-wrapper {
    width: 100%;
    height: 300px;
    background-color: white;
    border: 1px solid #ddd;
    box-sizing: border-box;
    border-radius: 8px;
    margin: 0 0 12px 0;
    padding: 12px;
    cursor: pointer;
  }


  .posting-thumb {
  }

  @media only screen and (min-width: 768px) {

    .posting-thumb-wrapper {
      width: 300px;
      margin: 6px;
    }
    .posting-thumb-wrapper:hover {
      border: 2px solid #78c199;
      padding: 11px;
    }


    .posting-thumb {
    }
  }
</style>
