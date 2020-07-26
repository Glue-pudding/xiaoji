<!-- 全景大厅-业务总览 -->
<template>
   <div class="order-container">
        <div class="btn" @click="openCompnayOrder">
          <div class="icon" :class="{'collapse':!showCompanyOrder}"></div>
        </div>
        <div class="order-main" :class="{'collapse':!showCompanyOrder}">
          <bgBorder/>
          <div class="title">
            <div class="name" v-show="chargeType==1">企业用电排行</div>
            <div class="name" v-show="chargeType==2">充电负荷排行</div>
            <div class="name" v-show="chargeType==3">可调负荷排行</div>
          </div>
          <div class="row">
            <div class="order">排名</div>
            <div class="name" v-show="chargeType==1||chargeType==3">公司名称</div>
            <div class="name" v-show="chargeType==2">充电站</div>
            <div class="kwh"  v-show="chargeType==1">用电量(万kwh)</div>
            <div class="kwh"  v-show="chargeType==2">充电量(万kwh)</div>
            <div class="kwh"  v-show="chargeType==3">可调负荷(万kw)</div>
          </div>
          <div class="scroll-area">
            <div class="row" v-for="(item,index) in companyOrder" :key="index">
              <div class="order">{{index+1}}</div>
              <div class="name">{{item.name}}</div>
              <div class="kwh">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
          
</template>

<script>
import bgBorder from '../../../../components/public/bgBorder'
export default {
  name: "companyOrder",
  data() {
    return {
        showCompanyOrder: true, //企业用电排行
    };
  },
  components:{
    bgBorder
  },
  props:{
    companyOrder:{},
    chargeType: 0
  },
  watch: {
    companyOrder: function() {
      // this.renderMap()
    }
  },
  methods: {
     openCompnayOrder(){
      this.showCompanyOrder = !this.showCompanyOrder;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
