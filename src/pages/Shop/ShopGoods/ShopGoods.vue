<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods"
              :key="index" :class="{current: index===currentIndex}" @click="clickLeftItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--标签对象就是组件对象-->
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import Food from '../../../components/Food/Food.vue'
  // import Food from '@/components/Food/Food.vue'


  export default {

    data() {
      return {
        scrollY: 0, // 右侧列表在Y轴滑动坐标  --> 初始值是0, 在右侧滑动过程中不断变化
        tops: [], // 右侧所有分类列表li的top组成的数组  --> 初始值[], 在列表显示之后确定其值, 后面不再变化
        food: {}, // 要显示的food
      }
    },
    async mounted() {
      // 使用callback + nextTick
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick(() => {
          this._initScroll()
          this._initTops()
        })
      })

      /*
      利用dispatch返回的promise
      promise内部在更新完界面后才调用resolve()
      */
      /*await this.$store.dispatch('getShopGoods')
      new BScroll('.menu-wrapper', {})
      new BScroll('.foods-wrapper', {})*/
    },

    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      // 当前分类的下标
      currentIndex() {
        console.log('currentIndex()')
        const {scrollY, tops} = this
        /*
        tops = [0, 5, 8, 10, 16]
        scrollY = 9   [top, nextTop)   top所对应的index就是currentIndex
         */
        // 得到当前新的下标
        const index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1])

        // 如果下标变化, 让左侧列表滑动当前分类处
        /*需要保存index: this组件对象*/
        if(this.index!=index && this.leftScroll) {
          this.index = index
          // 得到index对应的分类项li
          const li = this.$refs.leftUl.children[index]
          // 滑动右侧列表到指定li
          this.leftScroll.scrollToElement(li, 500)
        }


        return index
      }
    },

    methods: {
      // 初始化滚动对象
      _initScroll() {
        // 在列表数据显示之后创建对象

        // 左侧滑动对象
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true, // 才会分发click事件
        })
        // 右侧滑动对象
        this.rightScroll = new BScroll('.foods-wrapper', {
          probeType: 1, // 触摸, 每隔一定的时间触发一次
          // probeType: 2, // 触摸, 实时的
          // probeType: 3, // 触摸/惯性, 实时的
          click: true, // 才会分发click事件
        })

        // 绑定对右侧滑动的监听
        this.rightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', x, y)
          this.scrollY = Math.abs(y)
        })

        // 绑定对右侧滑动结束的监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', x, y)
          this.scrollY = Math.abs(y)
        })

      },

      // 初始统计右侧所有分类li的top值
      _initTops() {
        const tops = []
        let top = 0
        tops.push(top)
        // 得到所有li
        const lis = this.$refs.rightUl.children
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        // 更新tops状态
        this.tops = tops
        console.log('tops', tops)
      },

      // 点击左侧分类项
      clickLeftItem(index) {
        console.log('clickLeftItem()')

        // 得到目标位置对应的top
        const top = this.tops[index]

        // 立即更新scrollY为最终位置的坐标
        this.scrollY = top

        // 让右侧列表滑动到对应的位置
        this.rightScroll.scrollTo(0, -top, 500)
      },

      // 显示指定food
      showFood (food) {
        // 1. 更新food状态
        this.food = food
        // 2. 显示food组件界面
        this.$refs.food.toggleShow()
      }
    },

    components: {
      Food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

