<!-- 全景大厅-业务总览 -->
<template>
  <div class="energy-map">
    <!-- 地图 -->
    <mapContent :pointData="pointData" :chargeType = "chargeType" :position="position" :companyNumber= "companyNumber"/>
    <!--顶部搜索框，折叠效果 -->
    <div class="head">
           <el-autocomplete
              popper-class="search-down"
              :popper-append-to-body="false"
              class="select-style"
              placeholder="搜索..."
              suffix-icon="el-icon-search"
              :fetch-suggestions="querySearchAsync"
              value-key="companyName"
              @select="handleSelect"
              :debounce="0"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.companyName }}</div>
                <span class="addr">{{ item.address }}</span>
              </template>
            </el-autocomplete>
            <div class="collapse" @click="collapse()">
              <div class="icon" :class="{'open':!showCollapse}"></div>
            </div>
            <div class="collapse-content" v-show="showCollapse">
              <div class="title">接入情况</div>
              <div class="import-container">
                <span class="import">导入</span>
                <span class="export">导出</span>
              </div>
              <div class="collapse-item-container">
                <div class="collapse-item clearfix">
                  <div class="f_l">
                    <div class="name">
                      发电厂
                    </div>
                    <div class="value">{{powerNum}}</div>
                  </div>
                  <div class="icon icon1 f_r"></div>
                </div>
                 <div class="collapse-item clearfix">
                  <div class="f_l">
                    <div class="name">
                      分布式光伏
                    </div>
                    <div class="value">{{pvNum}}</div>
                  </div>
                  <div class="icon icon2 f_r"></div>
                </div>
                 <div class="collapse-item clearfix">
                  <div class="f_l">
                    <div class="name">
                      风力发电
                    </div>
                    <div class="value">{{windNum}}</div>
                  </div>
                  <div class="icon icon3 f_r"></div>
                </div>
                 <div class="collapse-item clearfix">
                  <div class="f_l">
                    <div class="name">
                      分布式储能
                    </div>
                    <div class="value">{{storageNum}}</div>
                  </div>
                  <div class="icon icon4 f_r"></div>
                </div>
                 <div class="collapse-item clearfix">
                  <div class="f_l">
                    <div class="name">
                      充电站
                    </div>
                    <div class="value">{{chargeNum}}</div>
                  </div>
                  <div class="icon icon5 f_r"></div>
                </div>
                 <div class="collapse-item clearfix">
                  <div class="f_l">
                    <div class="name">
                      用能企业
                    </div>
                    <div class="value">{{businessNum}}</div>
                  </div>
                  <div class="icon icon6 f_r"></div>
                </div>
              </div>
            </div>
        </div>
    <!-- 公司排行 -->
    <companyOrder :companyOrder="companyOrder" :chargeType = "chargeType"/>
    <!-- 底部tab切换 -->
    <div class="bottom-tab">
      <div class="title">荷</div>
      <div class="item" @click="changeChargeType(1)">
        <span class="icon" :class="{'active1':chargeType==1}"></span>
        <span class="tab-text">用能负荷</span>
      </div>
      <div class="item" @click="changeChargeType(3)">
        <span class="icon" :class="{'active2':chargeType==3}"></span>
        <span class="tab-text">可调负荷</span>
      </div>
      <div class="item" @click="changeChargeType(2)">
        <span class="icon" :class="{'active3':chargeType==2}"></span>
        <span class="tab-text">充电负荷</span>
      </div>
    </div>
  </div>
</template>

<script>
// import headContent from '../components/headContent';
import companyOrder from './companyOrder';
import mapContent from './mapContent';
import {energyView, energyLoadRank, energyTypeDistributed, querySelector, queryCompanyDetail} from '../../../network/dqnyMap';
export default {
  name: "heMap",
  components: {
      // headContent,
      companyOrder,
      mapContent
  },
  data() {
    return {
      chargeType: 1,
      pointData: [],
      companyOrder: [],
      selectDate: '2020-05',
      showCollapse: true, //顶部显示隐藏
      stationData: [],
      energyTypeDistributed:[],
      companyNumber: '',
      position: [],
      powerNum: 3,
      pvNum: 34,
      windNum: 54,
      storageNum: 25,
      chargeNum: 67,
      businessNum: 56,
    };
  },
  mounted() {
    this.changeChargeType(1);
    this.getEnergyTypeDistributed();
  },
  methods: {
    collapse(){
      this.showCollapse = !this.showCollapse;
    },
    getEnergyTypeDistributed(){
       // 获取能源类型分布
      energyTypeDistributed().then(data=>{
        if(data.statusCode==200){
          this.stationData = data.result;
          console.log("fffff")
          console.log(data)
        }
      })
    },
     querySearchAsync(queryString, cb) {
      console.log(queryString)
      // if(queryString !== ''){
      querySelector({
        companyName: queryString,
        energyType: this.chargeType,

      }).then(data => {
        this.searchData = data.result
        console.log('searchData', this.searchData)
        cb(this.searchData)
      })
    },
    handleSelect(item){
      queryCompanyDetail({
        companyNumber: item.companyNumber
      }).then(data => {
        console.log("queryCompanyDetail")
        console.log(data)
        // this.createMarkerData = data.result[0].lnglat
        // this.pointData2 = data.result
        // this.setPoint()
        this.position = [121.844618,29.899044];
        this.companyNumber = item.companyNumber;
        // this.createMarker([121.844618,29.899044])
      })
    },
    changeChargeType(type){
      // 切换电量类型
      this.chargeType = type;
      this.getEnergyView();
      this.getCompanyOrder();
    },
    getEnergyView(){
      // 获取所有的电量
       const energyViewParams = {
          energyType: this.chargeType,
          elecDate: this.selectDate
        }
      energyView(energyViewParams).then(data=>{
        if(data.statusCode==200){
          this.pointData = data.result.corporateEnergyOverviews;
        }
      })
    },
    getCompanyOrder(){
      // 获取公司排行
      let company = [];
      for(var pageNum=0; pageNum<3; pageNum++){
        const companyRankParams = {
          date: this.selectDate,
          type: this.chargeType,
          pageSize: 10,
          pageNum: pageNum
        }

        energyLoadRank(companyRankParams).then(data=>{
          if(data.statusCode==200){
            company = company.concat(data.result.list);
            this.companyOrder = company;
          }
        })
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
