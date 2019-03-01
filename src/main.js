/*
入口js
 */
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { Button } from 'mint-ui';

import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'
import store from './store'
import './mock/mockServer'  // mockServer.js会被打包执行一次
import './filters'
import loading from './common/imgs/loading.gif'

// 注册全局组件
Vue.component(Button.name, Button) // mt-button
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)

Vue.use(VueLazyload, { // 内部会定义一个指令: lazy
  loading,
})


// 将store保存到Vue上
Vue.store = store

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
  router, // 配置路由器
  store, // 配置vuex
})
