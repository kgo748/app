<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 或叫 事件委托；鼠标放在全部商品分类上一级分类标题还有背景色，离开才消失 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由的跳转与传参 -->
            <div class="all-sort-list2" @click="goSearch($event)">
              <!-- 一级分类；通过JS控制一级商品分类的显示与隐藏 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 设置自定义属性: data-categoryName；浏览器会自动把名称转为小写字母的 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- 编程式导航，也不太好，循环过多 -->
                  <!-- <a @click="goSearch">{{ c1.categoryName }}</a> -->
                  <!-- 声明式导航，卡顿 -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二三级分类容器；通过JS控制二三级商品分类的显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <a @click="goSearch">{{ c2.categoryName }}</a> -->
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <!-- 三级标题 -->
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <a @click="goSearch">{{ c3.categoryName }}</a> -->
                          <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
/* 商品分类导航 */
import { mapState } from "vuex";
// 这种引入方式：是把lodash全部功能函数引入了
// import _ from "lodash";
// 最好的引入方式：按需加载(throttle这个函数是默认暴露的)
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1, // 初始值给负数
      show: true,
    };
  },
  // 组件挂在完毕：可以向服务器发请求
  mounted() {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是home路由组件，降typeNav进行隐藏
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要一个函数，但使用这个计算属性的时候，右侧函数汇立即执行一次
      // 汇注入一个参数state：其实即为大仓库的中数据，总的state数据对象，包含自己的数据，也包含各个模块的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex的属性值
    // changeIndex(index) {
    //   // index：鼠标移上某一个一级分类元素的索引值
    //   // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
    //   // 非正常情况（用户操作很快）：本身全部的一级分类都英爱触发鼠标进入事件3，但是经过测试，只有部分h3触发了事件
    //   // 就是因为用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
    //   this.currentIndex = index;
    // },
    /// 改善；节流
    // throttle回调函数别用箭头函数，可能出现上下文this
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 进行路由跳转的方法；编程式导航+事件委派+自定义属性
    goSearch(event) {
      // 做好的解决方案：编程式导航+事件委派
      // 利用事件委派存在的一些问题：1.点击的不一定是a标签（点击其它地方也会触发父节点的时间按），2.如何获取参数【1、2、3级分类的名字】
      // 事件委派，是把全部的子节点h3、dt、dl、dd、a等子节点的事件委派给父节点了
      // 这里只想触发a标签的事件，在点击a标签的时候，才会进行理由跳转【怎样才能确定点击的一定是a标签呢】
      // 存在另外一个问题：即使你能确定点击的是a标签，又如何区分是一级、二级、还是三级分类的的标签呢？
      // 解决第一个问题，把直接点当中的a标签，加上自定义属性 data-categoryName，其余的子节点式没有的；
      let element = event.target;
      // 获取到当前触发真的这个事件的节点【h3、dt、dl、dd、a】，需要带有 data-categoryname这样节点【一定是a标签】
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      // console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset; // 浏览器会自动把名称转为小写字母的
      // 判断事件标签
      if (categoryname) {
        /// 区分一级分类、二级分类、三级分类的a标签
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category3Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理完参数
        // 判断，如果路由跳转的时候，带有params参数化，捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 动态给location配置对象添加确认样属性
          location.query = query;
          // 路由跳转
          this.$router.push(location);// 点击搜索按钮再点分类标题跳转后也有参数
        }
      }
    },
    // 当鼠标移入的时候让商品分类列表进行展示
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
    // 一级分类鼠标移出的事件回调
    // 当鼠标移出的时候，让商品分类列表数据进行隐藏
    leaveShow() {
      // 鼠标移出，currentIndex 变为-1
      this.currentIndex = -1;
      // 判断如果是Search路由组件的时候才会执行
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          /* &:hover {
            background-color: skyblue;
          } */
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        /* .item:hover {
          background-color: skyblue;
        } */
        .cur {
          background-color: skyblue;
        }
      }
    }
    /// 过度动画的有样式（sort是transition标签里name的属性值）
    // 过度动画进入的开始状态（进入
    .sort-enter {
      height: 0px;
      // transform: rotate(0deg);
    }
    // 过度动画的结束状态（进入）
    .sort-enter-to {
      height: 461px;
      // transform: rotate(360deg);
    }
    // 定义动画事件、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    // 也可以写离开时的动画
  }
}
</style>