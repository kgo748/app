<template>
  <div>
    <!-- 三级联动全局组件，已经注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- 循环组件标签，并向子组件传递数据 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>
<script>
import { mapState } from "vuex";
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted(){
    // 1.派发action，获取Floor组件的数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      // 2.获取数据
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>
<style lang="less" scoped>
</style>