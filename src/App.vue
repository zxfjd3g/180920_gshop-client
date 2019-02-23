<template>
  <div>
    <router-view/>
    <FooterGuide/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {reqAddress} from './api'
  export default {

    async mounted () {
      const result = await reqAddress('116.36867', '40.10038')
      console.log('result', result)
    },

    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
