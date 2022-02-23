/* 对于axios进行二次封装；请求模拟的mock数据 */
import axios from "axios"; 
// 引入进度条；start：进度条开始，done：进度条结束
import nprogress from 'nprogress';
// 如果出现进度条没有显示：一定是你忘记了引入样式了；可在它的样式里修改进度条的颜色，一般都是默认的
import "nprogress/nprogress.css";


// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const request = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: '/mock',
    // 代表请求超时的时间为5s
    timeout: 5000
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以再请求发出去之前做一些事情
request.interceptors.request.use((config) => {
    // config：配置对象，对象里有一个属性很重要，header请求头
    // 进度条开始动
    nprogress.start();
    return config;
});

// 响应拦截器
request.interceptors.response.use((res) => {
    // 服务器成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 进度条结束
    nprogress.done();
    return res.data;
}, (error)=>{
    console.log("服务器响应数据失败: ", error);
})

// 对外暴露
export default request;
