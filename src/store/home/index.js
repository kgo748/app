/* home模块的小仓库 */
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";
const state = {
  // state中数据的默认值初始别瞎写，服务器返回对象，服务器返回数组，【根据接口返回值初始化的】
  categoryList: [],// TypenNav组件的三级分类数据
  bannerList: [],// Home组件轮播图数据
  floorList: [], // floor数据
};
//mutions是唯一修改state的地方
const mutations = {
  GET_CATEGORY_LIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GET_BANNER_LIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GET_FLOOR_LIST(state, floorList) {
    state.floorList = floorList;
  },
};
// action|用户处理派发action地方的，可以书写异步语句、自己逻辑地方
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取服务端的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("GET_CATEGORY_LIST", result.data);
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }){
    let result = await reqBannerList();
    if (result.code === 200) {
      commit("GET_BANNER_LIST", result.data);
    }
  },
  // 获取floor数据 reqFloorList
  async getFloorList({ commit }){
    let result = await reqFloorList();
    if (result.code === 200) {
      commit("GET_FLOOR_LIST", result.data);
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
