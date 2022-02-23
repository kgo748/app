<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播 通常写法-->
        <!-- <div class="swiper-container" id="mySwiper" ref="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(carousel, index) in bannerList"
              :key="carousel.id"
            >
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div> -->
        <!-- 使用轮播图组件 -->
        <Carousel :list="bannerList" />
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* 列表 */
import { mapState } from "vuex";
// 引入swiper JS对象 ，css样式在入口文件引入；
// import Swiper from "swiper";

export default {
  name: "ListContainer",
  mounted() {
    // mounted: 组件挂载完毕，正常说（涉及到ajax请求，动态渲染结构时另说）组件结构（DOM）已经全有了
    // 为什么swiper实例在mounted当中直接书写不可以：因为结构还没有完整

    // 派发action：通过Vuex发起ajax请求，将交数据存储在仓库当中
    this.$store.dispatch("getBannerList");

    // 在new Swiper实例之前，页面中的结构必须要有，【现在在mounted里new实例却发现不行】
    // 因为结构里有vue指令，使用了异步请求的数据，请求数据需要时间，那使用数据的页面结构肯定还未完全渲染；
    // 因为dispatch当中涉及到异步语句，导致v-for便利的时候结构还没有完全渲染，因此不行；
    // 也可通过定时器包裹解决，不推荐
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
  // 轮播图使用组件后注释掉
  /* watch: {
    // 监听bannerList数据的变化，因为这条数据发生过变化---由一个开两个数组变为数组里面有四个元素
    bannerList: {
      // 通过watch监听bannseList属性的属性值的变化
      // 如果执行handler方法，代表组件实例身上这个属性的属性值已经有了变化【数组：是个元素】
      // 当前这个函数执行，只能保证bannerList数据已经有了，不能保证v-for已经执行结束了，因为遍历也需要时间的
      // v-for执行完毕，才有DOM结构，现在在watch当中不能能保证有swiper的DOM结构
      // 
      handler(newValue, oldValue) {
        // console.log(newValue, oldValue);
        // nextTick：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        // P36；
        this.$nextTick(() => {
          // 当执行这个回调的时候，可以保证服务器数据已经回来了，v-fot循环执行完毕【此时轮播图需要的DOM结构一定也存在了】
          // 不再建议用原生方式获取DOM结构了 document.querySelector(".swiper-container")
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
        
      },
    },
  }, */
};
</script>
<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>