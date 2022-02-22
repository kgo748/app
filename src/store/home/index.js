/* home模块的小仓库 */
import { reqGetCategoryList, reqGetBannerList } from "@/api";
const state = {
  // state中数据的默认值初始别瞎写，服务器返回对象，服务器返回数组，【根据接口返回值初始化的】
  categoryList: [],// TypenNav组件的三级分类数据
  bannerList: [],// Home组件轮播图数据
};
//mutions是唯一修改state的地方
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
};
// action|用户处理派发action地方的，可以书写异步语句、自己逻辑地方
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取服务端的数据
  async categoryList({ commit }) {
    let result = await reqGetCategoryList();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }){
    let result = await reqGetBannerList();
    if (result.code === 200) {
      commit("BANNERLIST", result.data);
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
