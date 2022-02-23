import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServer.js，mock数据
import '@/mock/mockServer.js'

// 三级联动的组件等功能通用的组件，可以注册为全局组件
import typeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
// 参数1：全局组件的名字，参数2：那个组件
Vue.component('TypeNav', typeNav)
Vue.component('Carousel', Carousel)
// 在入口文件里引入swiper样式；所有组件都可以使用
import "swiper/css/swiper.css";


Vue.config.productionTip = false

/// 测试
// import {reqCategoryList} from '@/api';
// reqCategoryList();

new Vue({
  render: h => h(App),
  // 注册路由：底下的写法KV一致省略【router小写的】
  //需要把router进行注册
  //可以让全部的组件（非路由|路由组件）都可以获取到$route|$router属性
  //$route(路由)：可以获取到路由信息（path、query、params）
  //$router:进行编程式导航路由跳转push||replace
  router,
  // 注册仓库：组件实例的身上会多了一个属性，$store属性
  store
}).$mount('#app')
