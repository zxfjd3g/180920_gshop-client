<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {

    async mounted () {
      // 触发vuex的getAddress(), 从后台获取address
      this.$store.dispatch('getAddress')
      // 触发vuex的getUser(), 从后台获取user
      this.$store.dispatch('getUser')

      // this.$store.dispatch('getShopInfo')
    },

    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
