<!-- 全景大厅-业务总览 -->
<template>
  <div class="energy-map-container">
    <!-- <div class="head">
       <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总览" name="first">总览</el-tab-pane>
          <el-tab-pane label="源" name="second">源</el-tab-pane>
          <el-tab-pane label="网" name="third">网</el-tab-pane>
          <el-tab-pane label="荷" name="fourth">荷</el-tab-pane>
          <el-tab-pane label="储" name="five">储</el-tab-pane>
        </el-tabs>
    </div> -->
    <heMap  v-show="page=='荷'"/>
  </div>
</template>

<script>
import heMap from './he'
export default {
  name: "energyMap",
  components: {
    heMap
  },
  data() {
    return {
      page: '荷'
    };
  },
  mounted() {
  },
  methods: {
    // handleClick(tab, event){
    //   this.page = tab.label;
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
