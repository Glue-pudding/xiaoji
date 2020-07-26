<!-- 菜单 -->
<template>
  <div class="layout_wrap">
    <div class="head_icon">
      <img src="../../assets/images/menu/head.png" @click="changeMenu">
    </div>
    <el-menu
      default-active="1-4-1"
       background-color="#00253E"
       text-color="#BECDD7"
       active-text-color="#5EF4FF"
       class="el-menu-vertical-demo"
       @open="handleOpen"
       @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="iconfont el-icondingwei"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">能源档案</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">企业用能档案</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="5-2">能源站点档案</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'layout',
  components: {},
  data() {
    return {
      isCollapse: false
    }
  },
  mounted() {

  },
  methods: {
    changeMenu() {
      this.isCollapse = !this.isCollapse
      this.$store.commit('SETSIDEBARFOLD', this.isCollapse)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
