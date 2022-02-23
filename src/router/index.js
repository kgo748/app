/* 配置路由的地方 */
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// 引入测试的路由组件
import TestVuex from "@/pages/Test/TestVuex";


/// 解决 编程式导航重复性点击出现的问题
// 先把VueRouter原型对象的push，replace，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push和replace方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call、apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call和apply传递参数，call传递参数用逗号隔开，apply方法执行，执行数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {}, () => {});
  }
};
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => {}, () => {});
  }
}

// 配置路由
const routes = [
  {
    path: "/home",
    component: Home,
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search",
    // 路由组件能不能传递props数据？
    // 1.布尔值写法，只能传递params参数，Vue开发插件里的组件上查看
    // props: true
    // 2.对象写法，额外的给路由组件传递一些props参数
    // props: {a: 1, b: 2}
    // 3.最常用的函数写法：可以通过params参数、query参数，龙国props查混敌给路由组件
    props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k }),
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
  // **************************************************************测试路由区域
  {
    path: "/testvuex",
    component: TestVuex,
    meta: { show: true },
  },
];

export default new VueRouter({
  // 配置路由
  routes,
});
