<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(keyword, index) in list.keywords"
              :key="index"
            >
              <a href="#tab1" data-toggle="tab">{{ keyword }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="nav in list.navList" :key="nav.id">
                  {{ nav.text }}
                </li>
              </ul>
              <img :src="list.bigImg" />
            </div>
            <!-- 轮播图 通常写法 -->
            <!-- <div class="floorBanner">
              <div class="swiper-container" id="floor1Swiper" ref="mySwiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(carousel, index) in list.carouselList"
                    :key="carousel.id"
                  >
                    <img :src="carousel.imgUrl" />
                  </div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div> -->
            <!-- 使用轮播图组件 -->
            <Carousel :list="list.carouselList" />
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* 楼层 */
// 引入swiper JS对象 ，css样式在入口文件引入；
// import Swiper from "swiper";
export default {
  name: "Floor",
  // 接收父组件的传参
  props: ["list"],
  // 组件挂在完毕的钩子函数
  mounted() {
    // ListContainer组件当中书写Swiper的时候，new实例不能放在mounted中，为什么现在在这里可以却可以；
    // 因为ListContainer组件当中书写Swiper的时候，是在它的组件内部发请求、动态渲染DOM结构的【前台至少需要等服务器的数据返回】，所以ListContainer组件在mounted中的那个写法不行，
    // 现在这种写法在这里却可以，解释方式1：因为当前Floor组件，在自己组件内部是没有发请求的，数据是接收的父组件的数据，在展示Floor组件之前数据早就存在了，
    // 解释方式2：因为请求是父组件发的，数据是父组件通过props传递过来的，而且结构都已经有了的情况下执行mounted
    /// 轮播图编码 方式1
    // 轮播图使用组件后注释掉
    /* var mySwiper = new Swiper(this.$refs.mySwiper, {
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
    }); */
  },
  // 轮播图使用组件后注释掉
  /// 轮播图编码 方式2
  /* watch: {
    list: {
      // immediate: true, 立即监听：不管数据有没有变化，上来立即监听一次，不加就监听不到，
      // 为什么watch监听不到list的变化，因为Floor的这个数据没有发生变化（数据是父组件给的，父组件给的时候就是一个对象，对象里面该有的数据都是有的）
      immediate: true,
      handler(newValue, olValue) {
        console.log(newValue, olValue);
        // 只能监听到数据已经有了，但是v-for动态渲染的DOM结构我们还是没有办法确定时候已经存在，因此我们还是需要用nextTick
        this.$nextTick(() => {
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
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>