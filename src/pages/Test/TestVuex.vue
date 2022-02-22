<template>
    <div class="container">
        <p>仓库数据count: {{count}}</p>
        <button @click="add">点击加1</button>
        <button @click="decrement">点击减1</button>
    </div>
</template>
<script>
import {mapState} from "vuex";

export default {
    name: 'TestVuex',
    computed: {
        ...mapState(["count"])
    },
    methods: {
        add(){
            // 派发action
            this.$store.dispatch("add", 1)
        },
        decrement(){
            this.$store.commit("DECREMENT", 1)
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 1200px;
    margin: 20px auto;
    border: 1px solid black;
}
</style>