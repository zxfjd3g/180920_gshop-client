/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  /*components: {
    App
  },
  template: '<App/>'*/

  /*render: function (createElement) {
    return createElement(App)   //<App/>
  }*/

  render: h => h(App),
  router
})
