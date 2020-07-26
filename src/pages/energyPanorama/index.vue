<!-- 全景大厅-业务总览 -->
<template>
  <div class="energyPanorama">
    <div class="left">
      <div class="left_title">
        <span>全市情况(2020年)</span>
        <div class="left_button">
          <button><img src="../../assets/images/upload.png">导入</button>
          <button><img src="../../assets/images/download.png">导出</button>
        </div>
      </div>
      <div class="left_one">
        <bgBorder></bgBorder>
        <div class="open_more">
          <span>能耗总量</span>
          <img src="../../assets/images/more.png">
        </div>
        <div class="two_wrap color1">
          <div class="two_item">
            <h1>10040</h1>
            <p>能耗总量(万tce)</p>
          </div>
          <div class="two_item">
            <h1>125934</h1>
            <p>全年目标(万tce)</p>
          </div>
        </div>
      </div>
      <div class="left_two">
        <bgBorder></bgBorder>
        <div class="open_more">
          <span>能耗强度</span>
          <img src="../../assets/images/more.png">
        </div>
        <div class="two_wrap color2">
          <div class="two_item">
            <h1>3.11</h1>
            <p>单位产值能耗(tce/万元)</p>
          </div>
          <div class="two_item">
            <h1>125934</h1>
            <p>目标值(tce/万元)</p>
          </div>
        </div>
      </div>
      <div class="left_three">
        <bgBorder></bgBorder>
        <div class="open_more">
          <span>能耗结构</span>
          <img src="../../assets/images/more.png">
        </div>
        <div class="left_three_left"></div>
        <div class="left_three_right">
          <div class="right_top"></div>
          <div class="right_bottom">
            <div class="bottom_left"></div>
            <div class="bottom_right"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_time" id="right_time">
        {{currentTime}}
      </div>
      <div class="right_one">
        <bgBorder></bgBorder>
        <div class="open_more">
          <span>清洁环保</span>
          <img src="../../assets/images/more.png">
        </div>
        <div class="qj_left">
          <div>
            <h1>9999</h1>
            <p>光伏发电量</p>
          </div>
          <div>
            <h1>9999</h1>
            <p>风电发电量</p>
          </div>
          <div>
            <h1>9999</h1>
            <p>其他清洁能源</p>
          </div>
        </div>
        <div class="qj_right">
          <chartModel class="water_polo" :options="waterPolo"></chartModel>
          <p>清洁能源占比</p>
        </div>
      </div>
      <div class="right_two">
        <bgBorder></bgBorder>
        <div class="open_more">
          <span>绿色工业</span>
          <img src="../../assets/images/more.png">
        </div>
        <div class="three_wrap">
          <div class="three_item color3">
            <h1>2149</h1>
            <p>规上能耗(万tce)</p>
          </div>
          <div class="three_item three_m_item color4">
            <h1>9132</h1>
            <p>单位产值能耗(tce/万元)</p>
          </div>
          <div class="three_item color4">
            <h1>876</h1>
            <p>规上企业数量</p>
          </div>
        </div>
        <chartModel class="one_line" :options="greenIndustry"></chartModel>
      </div>
      <div class="right_three">
        <bgBorder></bgBorder>
        <div class="open_more">
          <span>绿色建筑</span>
          <img src="../../assets/images/more.png">
        </div>
        <div class="three_wrap">
          <div class="three_item color5">
            <h1>2149</h1>
            <p>规上能耗(万tce)</p>
          </div>
          <div class="three_item three_m_item color6">
            <h1>9132</h1>
            <p>单位产值能耗(tce/万元)</p>
          </div>
          <div class="three_item color6">
            <h1>876</h1>
            <p>规上企业数量</p>
          </div>
        </div>
        <chartModel class="one_line" :options="greenBuilding"></chartModel>
      </div>
      <div class="right_four">
        <bgBorder></bgBorder>
        <div class="open_more">
          <span>绿色出行</span>
          <img src="../../assets/images/more.png">
        </div>
        <div class="three_wrap">
          <div class="three_item color7">
            <h1>2149</h1>
            <p>规上能耗(万tce)</p>
          </div>
          <div class="three_item three_m_item color8">
            <h1>9132</h1>
            <p>单位产值能耗(tce/万元)</p>
          </div>
          <div class="three_item color8">
            <h1>876</h1>
            <p>规上企业数量</p>
          </div>
        </div>
        <chartModel class="one_line" :options="greenTravel"></chartModel>
      </div>
    </div>
    <div class="center">center</div>
  </div>
</template>

<script>
  import * as moment from 'moment'
  import bgBorder from '../../components/public/bgBorder'
  import chartModel from '@/components/public/chartModel'
import charOption from '@/assets/javascript/energyPanorama/panoramaOption'
  import 'echarts-liquidfill'
export default {
  name: 'energyPanorama',
  components: {
    bgBorder,
    chartModel
  },
  data() {
    return {
      currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      waterPolo: {},
      greenIndustry: {},
      greenBuilding: {},
      greenTravel: {},
    }
},
  mounted() {
    this.changeTime()
    this.waterPolo = charOption.waterChart()
    this.greenIndustry = charOption.oneLineChart({
      title: '规上能耗趋势',
      color: ['#0EFCB4', '#9BFBDE', 'rgba(110,194,92,0.16)'],
      xData: [1, 2, 3, 4, 5, 6],
      yData: [0.25, 0.62, 0.65, 0.85, 1.02, 0.51]
    })
    this.greenBuilding = charOption.oneLineChart({
      title: '建筑能耗趋势',
      color: ['#FFDE3F', '#FFF0A6', 'rgba(183,143,15,0.16)'],
      xData: [1, 2, 3, 4, 5, 6],
      yData: [0.25, 0.62, 0.65, 0.85, 1.02, 0.51]
    })
    this.greenTravel = charOption.oneLineChart({
      title: '充电量趋势',
      color: ['#26A1FF', '#66BDFF', 'rgba(0,137,247,0.16)'],
      xData: [1, 2, 3, 4, 5, 6],
      yData: [0.25, 0.62, 0.65, 0.85, 1.02, 0.51]
    })
},
  methods: {
    changeTime() {
      setInterval(function() {
        var box = document.getElementById('right_time')
        box.innerHTML = moment().format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
  }
  }
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
