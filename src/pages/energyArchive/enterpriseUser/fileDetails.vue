<template>
  <div class="detail_container">
    <el-tabs v-model="activeName" class="tabs_style">
      <el-tab-pane label="档案概览" name="profile">
        <profile />
      </el-tab-pane>
      <el-tab-pane label="经济数据" name="economicData">经济数据</el-tab-pane>
      <el-tab-pane label="能源数据" name="energyData">能源数据</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Profile from "./Profile";
export default {
  components: {
    Profile,
  },
  data() {
    return {
      activeName: "profile",
    };
  },
};
</script>

<style lang="scss" scoped>
.detail_container {
  width: 100%;
  height: 100%;
  .tabs_style {
    width: 98%;
    height: 95%;
    margin-left: 10px;
    margin-right: 20px;
  }
}
</style>
<style lang="scss">
.el-tabs__item {
  font-size: 18px;
  color: #fff;
}
.el-tabs__item.is-active {
  color: #55ebff;
}
.el-tabs__nav-wrap::after {
  background-color: rgba(0, 37, 62, 0);
}
</style>