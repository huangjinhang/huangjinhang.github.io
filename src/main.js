// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'
import 'bootstrap3/dist/css/bootstrap.css'
import 'bootstrap3/dist/js/bootstrap'

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

import animated from 'animate.css'
Vue.use(animated)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站，一定会调用main.js，调用时先从本地存储中，把购物车数据读出来，放到store中
let car = JSON.parse(localStorage.getItem('car') || '[]')

let store = new Vuex.Store({
  state: { // this.$store.state.***
    car: car //购物车中商品的数据，用一个数组存储起来，里面包含商品的对象
            //{id:商品id,count:购买的数量，price:商品单价，selected:true}
  },
  mutations: {  // this.$store.commit('方法名','按需传递唯一的参数')
    addToCar(state, goodsinfo) {//点击加入购物车，把数据保存到state的car中
      let flag = false;
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true
        }
      })

      if (!flag) {
        state.car.push(goodsinfo)
      }
      // 当更新car之后，把car数组存储到 本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo){ //修改购物车中商品的数量值
      state.car.some(item =>{
        if (item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state,id){   //点击删除购物车中的商品
      state.car.some((item,i)=>{ //item是car数组中循环的每一项，i是每一项的索引
        if(item.id == id){
          this.state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){ //更新购物车的商品是否开关为选中
      state.car.some(item=>{
        if (item.id == info.id){
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },

  },
  getters: {  // this.s.getters.***
    getAllCount(state) {  //得到购物车中的全部数量给小红点
      let c = 0;
      state.car.forEach(item => {
        if(item.selected){
          c += item.count
        }
      })
      return c
    },
    getGoodsCount(state){    //得到商品的数量，给到购物车中的加减显示
      let o = {}
      state.car.forEach(item=>{
        o[item.id] = item.count; //把商品的id作为键，count数量作为值
     })
      return o
    },
    getGoodsSelected(state){  //得到商品的开关是否被选中
      let o = {}
      state.car.forEach(item=>{
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){ //计算购物车中的总数量和总价
      let sum = {count:0,amount:0};
      state.car.forEach(item=>{
        if(item.selected){
          sum.count += item.count;
          sum.amount += item.price*item.count;
        }
      })
      return sum
    }
  }
})

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(Mint)

import '../lib/mui/css/mui.min.css';
import '../lib/mui/css/icons-extra.css';

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import vuePicturePreview from 'vue-picture-preview';
Vue.use(vuePicturePreview)

import moment from 'moment' //导入时间插件
Vue.filter('dateFormat', function (datestr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(datestr).format(pattern)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//挂载 store 状态管理对象
  components: {App},
  template: '<App/>'
})
