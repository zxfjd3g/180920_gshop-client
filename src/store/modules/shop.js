import Vue from 'vue'
import {
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from '../mutation-types'

import {
  reqInfo,
  reqRatings,
  reqGoods
} from '../../api'

/*
包含n个状态数据的对象
 */
const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
}

const mutations = {
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [ADD_FOOD_COUNT](state, {food}) {
    if(food.count) {
      food.count++
    } else { // 第一次增加
      // 给food添加一个新的属性 count: 1   没有数据绑定
      // food.count = 1
      // Vue.set( target, key, value )
      Vue.set(food, 'count', 1)
    }
  },
  [REDUCE_FOOD_COUNT](state, {food}) {
    if(food.count>0) {
      food.count--
    }
  },
}

const actions = {
  // 异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },


  // 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 更新状态后立即调用回调函数
      typeof callback==='function' && callback()
    }
  },

  // 更新指定food的数量
  updateFoodCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(ADD_FOOD_COUNT, {food})
    } else {
      commit(REDUCE_FOOD_COUNT, {food})
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}