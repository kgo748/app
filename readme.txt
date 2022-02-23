尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_贾成豪_67:42:31
尚硅谷哔哩哔哩地址：https://www.bilibili.com/video/BV1Vf4y1T7bw?p=1
投稿时间：2021-12-01
老师码云地址：https://gitee.com/jch1011
不易界面为主，以逻辑为主。

前台+后台，双项目实战！
前台项目：p1 - p112 , 后台管理系统：p113 - p200
前后端项目二者相互独立，又可以结合在一起，满足你对大型Vue项目实战的需求，一套教程覆盖Vue框架方方面面的知识点，全面、详细！

网盘中的内容是：
尚品汇：前台项目（上）
尚品汇：后台管理系统（下）
项目源码地址.doc

路由name和组件name时候非要一致。

shangpinhui_0415-master：前台项目，依赖安装有问题;
shangpinhui_0607-master： 前台项目，这个可正常运行；
guigu-master：后台项目；
background-management-system-master：可以打开，后台页面切换有问题；


网络笔记：
	https://blog.csdn.net/weixin_43424325/article/details/121684101
环境node.v.16，npm.v.8 包管理器；
vue2.x, 
cmd>vue create app
选择默认的大的版本Vue2，项目的dependencies依赖里默认只有 vue 和 core-js 2个依赖。

package-lock.json：可删除，但不建议，他是一个缓存性的一个文件，比如项目中的依赖第一次下载比较慢，第二次就快多了；、
readme.md：说明性的文件；

运行命令后加 --open  项目启动后会自动打开浏览器；

创建 js.config.json 文件，配置@符为src后，以后属性就有提示了；

不指定版本的话是安装最新的版本，容易报错，这里指定less-loader的版本后less会自动安装搭配的，我是 -D 安装在开发依赖里了；
	cmd>npm install --save less less-loader@5

页面结构从资料代码的静态页面的 谷粒商城-辉洪(老师用) 里拷贝；

cmd>cmd>npm install --save vue-router@3

cmd>npm install --save axios
	配置代理服务器；

进度条功能，git网站或相关社区查看使用，
	cmd>npm install --save nprogress
安装vuex，配合此版本的vue：
	cmd>npm install --save vuex@3

lodash: 不用额外安装；

this.$route用来判断params、query参数等；
this.$router用来push|replace进行编程式路由跳转等；

mock模拟数据：
cmd>npm install mockjs --save-dev
轮播图插件：
cmd>npm install swiper@5 --save


git安装步骤，https://blog.csdn.net/m0_37450089/article/details/120939158
	除了自定义安装位置（选好安装位置，会自动创建Git安装目录），基本都是next，新功能就不要勾选了；
	配置环境变量：
		D:\developTools\Git\bin
		D:\developTools\Git\mingw64\libexec		有32位的也配置了一下
	版本号检查：cmd>git --version
		当前使用版本号：2.35.1
	可以先在github网站创建仓库（建议与想要使用的项目名称同名），拉取到本地编码后提交；
	也可以分别独立进行两边的步骤， 创建github上的项目仓库和在本地创建项目并编码，然后再提交至远程仓库。
	新版git:
		cmd>git remote add origin https://github.com/kgo748/app.git 设置提交地址
		不再是设置提交地址的时候确认密码，而是首次提交的时候，且不再是弹出界面，而是跳转到浏览器确认github的密码；


