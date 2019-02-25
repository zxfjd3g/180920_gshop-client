/*
包含n个用于间接更新状态数据的方法的对象
 */
import {
  reqShops,
  reqAddress,
  reqCategorys,
  reqUser,
  reqLogout
} from '../api'
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_USER,
  RESET_USER
} from './mutation-types'

export default {

  // 异步获取地址的action
  async getAddress({commit, state}) {
    // 1. 发ajax请求
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    // 2. 成功后, 提交mutation
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, result.data)
    }
  },

  // 异步获取分类列表的action
  async getCategorys({commit}) {
    // 1. 发ajax请求
    const result = await reqCategorys()
    // 2. 成功后, 提交mutation
    if (result.code === 0) {
      commit(RECEIVE_CATEGORYS, result.data)
    }
  },

  // 异步获取商家列表的action
  async getShops({commit, state}) {
    // 1. 发ajax请求
    const {longitude, latitude} = state
    const result = await reqShops({longitude, latitude})
    // 2. 成功后, 提交mutation
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, result.data)
    }
  },

  // 同步保存用户的action
  saveUser({commit}, user) {
    commit(RECEIVE_USER, user)
  },

  // 异步获取当前用户信息的action
  async getUser({commit}) {
    const result = await reqUser()
    if(result.code===0) {
      const user = result.data
      commit(RECEIVE_USER, user)
    }
  },

  // 退出登陆
  async logout({commit}) {
    const result = await reqLogout()
    if(result.code===0) {
      commit(RESET_USER)
    }
  },
}