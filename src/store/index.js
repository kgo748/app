/* Vuex总仓库 */
//引入Vuex -----相当于咱们最大的仓库
import Vue from "vue";
import vuex from "vuex";
// 需要使用插件一次
Vue.use(vuex);

// 引入小仓库
import search from "./search";
import home from "./home";

// state：仓库存储数据的地方
const state = {
  count: 1,
};
// mutations：修改state的唯一手段
const mutations = {
  ADD(state, payload) {
    state.count += payload;
  },
  DECREMENT(state, payload) {
    state.count -= payload;
  },
};
// action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 这里可以书写业务逻辑，但是不能修改state
  add({ commit }, payload) {
    commit("ADD", payload);
  },
};
// getters：理解为计算属性，用于简化操作数据，让组件获取操作的数据更加方便
const getters = {};

// 对外暴露Store类的一个实例
export default new vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // 实现Vuex仓库模块式开发存储数据
  modules: {
      home,
      search
  }
});
