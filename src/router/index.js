/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 去掉#
  // 配置所有路由
  routes
})

// 包含所有需要进行登陆检查的路由路径
const paths = ['/a', '/b', '/c', 'b']
/*
设置全局前置守卫
对部分路由跳转进行登陆的检查
 */
router.beforeEach((to, from, next) => {
  console.log('beforeEach()', to, from)
  const path = to.path
  // 如果请求的路径在paths, 需要进行登陆检查, 如果没有, 强制跳转到登陆页面
  if(paths.indexOf(path)!==-1) {
    // 如果没有登陆
    if(!Vue.store.state.user.user._id) {
      // 跳转到登陆页面
      return next('/login')
    }
  }

  // 放行跳转
  next()

})

export default router