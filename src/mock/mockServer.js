// 先引入mockjs
import Mock from "mockjs";
// 把JSON数据格式引入进来【但json格式数据根本没有对外暴露，但是可以引入】
// 因为webpack默认对外暴露的（js文件里需手动暴露）：图片、JSON格式数据；
import banner from "./banner.json";
import floor from "./floor.json";

// mock数据：参数1：请求地址，参数2:请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }); // 模拟首页大的你轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor });
