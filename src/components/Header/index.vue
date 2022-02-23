<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <a href="###">登录</a>
            <a href="###" class="register">免费注册</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="test-box">
        <button @click="$router.push('/testvuex')">测试Vuex/testvuex</button>
      </div>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
/* 头部组件 */
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      // 编程式导航
      // 搜索按钮的回调函数：需要向search路由进行跳转
      // this.$router.push("/search");

      /// 路由传递参数
      // 第一种，字符串模式  http://localhost:8080/#/search/qwe?k=qwe
      // this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toLowerCase());
      // 第二种：模板字符串  http://localhost:8080/#/search/qwe?k=qwe
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toLowerCase()}`);
      // 第三种：对象，name组件名前不加斜杠 /；      http://localhost:8080/#/search/qwe?k=qwe
      // params是跟在 search/ 路径后的，query是问号?后的键值对，在路由里对应的路径要行相应的配置：name: 'search' 属性表组件明，path: "/search/:keyword" 里配置占位符
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: this.keyword },
      //   query: { k: this.keyword.toLowerCase() }
      // });

      /* **************************************************************************************** */
      /// 路由面试题1：路由传递参数（对象写法）path时候可以结合params参数一起使用？
      // 答：路由传参的时候，对象的写法可以是name、path形式，但属要注意的是，path这种写法不能与params参数一起使用
      // err ??????????????????? 好像也可以用
      // this.$router.push({path: "/search", params: { keyword: this.keyword }, query: { k: this.keyword.toLowerCase() }});

      // 面试题2：如何指定params参数可传可不传；在路由里对应的路径要行相应的配置：path: "/search/:keyword?" 里占位符后加一个问号，问号表可不传
      // 如果路由要求传递params参数，但是你就不传递params参数，发现一件事情，URL会有问题的，
      // 如果指定params参数可以传递、或者不传递，在配置路由的时候，在占位符后面加上一个问号，【params可以查混敌或者不传递】，即注释部分可以不写
      // this.$router.push({name: "search", /* params: { keyword: this.keyword }, */ query: { k: this.keyword.toLowerCase() }});

      // 面试题3：params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
      // 使用undefined解决：params参数可以传递、不传递（空的字符串）
      // this.$router.push({name: "search", params: { keyword: "" || undefined }, query: { k: this.keyword.toLowerCase() }})

      // 面试题4：路由组件能不能传递props数据？
      // 可以的，有3中写法：布尔值、对象、函数；路由里配置props
      // 下面这种写法可以解决当前这个抛出异常错误的问题，但是将来我们还是会用到push|replace方法进行路由跳转，还是会出现此类问题；
      // 一次我们需要从“根”解决这个问题，就是咋们自己重写push||replace方法，push|replace方法，是VueRouter.prototype原型对象提供的方法
      // 或打印错误信息
      // this.$router.push({name: "search", params: { keyword: this.keyword  || undefined}, query: { k: this.keyword.toLowerCase() }}/* ,()=>{},(error)=>{console.log(error);} */)
      // 判断如果有query参数路由跳转时也带过去
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);// 点击分类标题再点搜索按钮跳转后也有参数
      }
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>