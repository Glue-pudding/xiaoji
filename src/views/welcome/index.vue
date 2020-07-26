<!-- welcome -->
<template>
  <div class="welcome_box">
    <div class="header_box">
      <img src="../../assets/images/logo.png">
    </div>
    <div class="content_wrap">
      <div class="layout_box">
        <layout></layout>
      </div>
      <div class="content_box">
        <router-view></router-view>
      </div>
    </div>


  </div>
</template>

<script>
import layout from './../layout'
export default {
  name: 'welcome',
  components: {
    layout
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

