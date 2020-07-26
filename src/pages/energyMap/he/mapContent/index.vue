<!-- 全景大厅-业务总览 -->
<template>
  <div class="map-container">
    <div id="mapContainer"></div>

    <!-- 图例 -->
    <ul class="legend clearfix">
      <li>
        <div class="color color1"></div>
        <div>0</div>
      </li>
      <li>
        <div class="color color2"></div>
        <div>50000</div>
      </li>
      <li>
        <div class="color color3"></div>
        <div>100000</div>
      </li>
      <li>
        <div class="color color4"></div>
        <div>500000</div>
      </li>
      <li>
        <div class="color color5"></div>
        <div>1000000</div>
      </li>
    </ul>
    <!-- 用能负荷 -->
    <div class="info-window" ref="normalInfo" v-show="infoWin&&chargeType==1">
      <bgBorder/>
      <div class="top">
        <div class="btn">{{companyDetailData.userType}}</div>
        <div class="name">{{companyDetailData.companyName}}</div>
        <div class="close" @click="closeInfoWin"></div>
      </div>
      <!-- echarts -->
      <div id="main"></div>
      <p class="total">上月累计用电<span class="value">{{companyDetailData.totalValue}}</span>kwh</p>
    </div>
    <!-- 充电负荷 -->
    <div class="info-window" ref="chargeInfo" v-show="infoWin&&chargeType==2">
    <!-- <div class="info-window" ref="info"> -->
      <bgBorder/>
      <div class="top">
        <div class="btn">{{companyDetailData.chargeType}}</div>
        <div class="name">{{companyDetailData.companyName}}</div>
        <div class="close" @click="closeInfoWin"></div>
      </div>
      <div class="middle-content">
        <div>
          <p>充电额定功率<span>{{companyDetailData.chargeRatedPower}}</span>kW</p>
          <p>充电桩数量<span>{{companyDetailData.chargeNumber}}</span></p>
        </div>
        <div>
          <p>投运日期<span>{{companyDetailData.commissionDate}}</span></p>
          <p>累计充电量<span>{{companyDetailData.value}}</span>kwh</p>
        </div>
      </div>
      <!-- echarts -->
      <div id="main2"></div>
    </div>
    <!-- 可调负荷 -->
    <div class="info-window" ref="adjustInfo" v-show="infoWin&&chargeType==3">
      <!-- <div class="info-window" ref="info"> -->
      <bgBorder/>
      <div class="top">
        <div class="btn">{{companyDetailData.loadProperties}}</div>
        <div class="name">{{companyDetailData.companyName}}</div>
        <div class="close" @click="closeInfoWin"></div>
      </div>
       <div class="middle-content">
        <div>
          <p>可调负荷<span>{{companyDetailData.adjustableLoad}}</span>kW</p>
        </div>
        <div>
          <p>响应类型<span>{{companyDetailData.responseType}}</span></p>
        </div>
      </div>
      <!-- echarts -->
      <div id="main3"></div>
    </div>
  </div>
</template>

<script>
import bgBorder from '../../../../components/public/bgBorder';
import {companyDetail} from '../../../../network/dqnyMap';
import echarts from 'echarts';
export default {
  name: "mapContent",
  props:{
    pointData: Array,
    chargeType: Number,
    position: Array,
    companyNumber: String
  },
  components: {
    bgBorder
  },
  data() {
    return {
      infoWin: null,
      companyDetailData: {},
      userType: '',
      companyName: '',
      totalValue: 0,
      dates: [],
      values: [],
    };
  },
  watch: {
    pointData: function() {
      this.renderMap();
    },
    chargeType: function() {
      if(this.infoWin){
        this.closeInfoWin();
        this.infoWin = null;
      }
    },
    position: function() {
      this.createMarker()
    }
  },
  mounted() {
    this.initMap();
    this.initHexagon();
  },
  methods: {
    initMap(){
       this.map = new AMap.Map('mapContainer', {
        viewMode: '3D',
        pitch: 50,
        resizeEnable: true, // 是否监控地图容器尺寸变化
        mapStyle: 'amap://styles/darkblue',
        center: [121.844618,29.899044],
        zoom: 11 
      })
    },
    initHexagon(){
      this.gridLayer = new Loca.HexagonLayer({
        map: this.map,
        visible: true,
        zindex: 777,
        eventSupport: true,
      })
      // 点击柱子显示悬浮框
      this.gridLayer.on('click', (ev) => {
        console.log(ev)
        this.openInfoWin(this.map, ev.lngLat,ev.rawData[0].companyNumber);        
      })
    },
     createMarker() {
      const marker = new AMap.Marker({
        // icon: this.mapIcon[0],
        // content:'<div></div>',
        position: this.position,
        offset: new AMap.Pixel(-1, -1),
        bubble:false,
      })
      this.map.add(marker)
      // this.markers.push(marker)
      this.map.setZoomAndCenter(17,this.position);
      this.openInfoWin(this.map, this.position, this.companyNumber)
    },
    closeInfoWin(){
      this.infoWin.close();
    },
    openInfoWin(map,lngLat,companyNumber){
      if (!this.infoWin) {
        this.infoWin = new AMap.InfoWindow({
            autoMove:false,
            isCustom: true,  //使用自定义窗体
            offset: new AMap.Pixel(130, 100)
        });
      }
      // var x = event.clientX;
      // var y = event.clientY;
      // var lngLat = map.containerToLngLat(new AMap.Pixel(x, y));
       // 获取所有的电量
       const params = {
          type: this.chargeType,
          companyNumber: companyNumber
        }
      companyDetail(params).then(data=>{
        if(data.statusCode==200){
          this.companyDetailData = data.result;
          if(this.chargeType==1){
            this.initEchart1();  
            this.infoWin.setContent(this.$refs.normalInfo);
          }else if(this.chargeType==2){
            this.infoWin.setContent(this.$refs.chargeInfo);
          }else{
             this.infoWin.setContent(this.$refs.adjustInfo);
          }
          this.infoWin.open(map, lngLat);
        }
      })
    },
    initEchart1(){
     let myChart = echarts.init(document.getElementById('main'));
     let option = {
          title: {
            text: '近12月发电趋势',
            textStyle: {
              align: 'left',
              color: '#fff',
              fontSize: 18,
              fontWeight: 600
            },
            top: '10px',
            left: '25px',
          },
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            top: "75px",
            left: '70px',
            bottom: "40px",
            right: "40px"
          },
          xAxis: {
            type: 'category',
            data: this.companyDetailData.dates,
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(172,238,255,0.6)'
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            name: "万kWh",
            nameGap: 20,
            nameTextStyle: {
              color: "rgba(172,238,255,0.3)",
              // padding: [50,0,0,0],
              align: 'right'
            },
            splitNumber: 3,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(172,238,255,0.6)',
              fontSize: 14,
              fontWeight: 500,
              formatter: (value,index)=>{
                let data = value/10000
                return data
              }
            },
            splitLine: {
              show: false,
            },
          },
          series: [{
            type: 'line',
            smooth: true,
            symbol: 'circle',
            // name: '北仑区',
            data: this.companyDetailData.values,
            itemStyle: {
              normal: {
                color: "rgba(234,225,80,1)",
                lineStyle:{
                  color:"rgba(234,225,80,1)",
                }
              }
            },
            // lineStyle: {
            //   normal: {
            //     color: "rgba(234,225,80,1)",
            //     shadowColor: "#327BFA",
            //   }
            // },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0.5,
                  color: 'rgba(234, 225, 80, 0.13)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(234, 225, 80,0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }]
        };

        myChart.setOption(option);
        setTimeout(function () {
          window.onresize = function () {
            myChart.resize();
          }
        }, 200)
    },
    renderMap(){
      if(this.infoWin) this.closeInfoWin();
      let height = [0,100000];
      if(this.chargeType==2) height = [0,1000];
      let options = {
          unit: 'meter',
          mode: 'median',
          light: {
              // 环境光
              ambient: {
                  // 光照颜色
                  color: '#ffffff',
                  // 光照强度，范围 [0, 1]
                  intensity: 0.8
              },
              // 平行光
              directional: {
                  color: '#ffffff',
                  // 光照方向，是指从地面原点起，光指向的方向。
                  // 数组分别表示 X 轴、Y 轴、Z 轴。
                  // 其中 X 正向朝东、Y 正向朝南、Z 正向朝地下。
                  direction: [0, -1, 0.6],
                  intensity: 0.7
              }
          },
          style: {
              radius: 80,
              gap: 100,
              height: height,
              color: (res)=>{
                if(res.median>1000000){
                  return 'red'
                }else if(res.median>500000){
                  return '#ff6100'
                }else if(res.median>100000){
                  return '#ffac35'  
                }else if(res.median>50000){
                  return '#00e9d0'
                }else {
                  return '#0098ce'
                }
              }
          }
      }

      this.gridLayer.setData(this.pointData,{
        lnglat: 'lnglat',
        value: 'count'
      }).setOptions(options);
      this.gridLayer.render();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
