<template>
  <div class="user_container">
    <p class="title">企业用能档案</p>
    <div class="content">
      <div class="left">
        <div class="left_top bg_color">
          <bgBorder />
          <div class="top_ring" id="topRing"></div>
        </div>
        <div class="left_bottom bg_color">
          <bgBorder />
          <div class="top_ring" id="bottomRing"></div>
        </div>
      </div>
      <div class="right bg_color">
        <bgBorder />
        <div class="right_top">
          <span class="right_title">能耗排行</span>
          <el-form :model="energyRanking" :inline="true" class="right_form">
            <el-form-item>
              <el-select v-model="energyRanking.indicatorType" filterable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="energyRanking.industry"></el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="energyRanking.industry"></el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="energyRanking.year" type="year" placeholder="选择年"></el-date-picker>
            </el-form-item>
            <el-form-item style="width: 27%;">
              <el-input
                v-model="energyRanking.accountNumber"
                placeholder="企业名称 / 电力户号"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-table
            :data="rankingDate"
            class="ranking_date"
            :header-cell-style="{background:'#062F4C',color:'#40A7AE',}"
            header-align="left"
            style="width:90%;"
          >
            <el-table-column prop="sort" label="排名" min-width="50">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="accountNumber" label="用电户号" min-width="140"></el-table-column>
            <el-table-column prop="name" label="名称" min-width="210">
              <!-- <template slot-scope="scope">
                <a @click="goOrderDetailorderNo(scope.row)">{{ scope.row.name }}</a>
              </template> -->
            </el-table-column>
            <el-table-column prop="industry" label="产业" min-width="140"></el-table-column>
            <el-table-column prop="profession" label="行业" min-width="140"></el-table-column>
            <el-table-column prop="output" label="产值（万元）" min-width="140"></el-table-column>
            <el-table-column prop="energyConsumption" label="单位产值能耗(tce/万元 " min-width="170"></el-table-column>
            <el-table-column prop="comprehensive" label="综合能耗(万tce)" min-width="140"></el-table-column>
            <el-table-column prop="Electricity" label="用电量(kWh)" min-width="140"></el-table-column>
          </el-table>
          <el-pagination
            class="total"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40"
            background
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bgBorder from "../../../components/public/bgBorder/index";
export default {
  name: "enterpriseUser",
  components: {
    bgBorder,
  },
  data() {
    return {
      energyRanking: {}, //能耗排行表单
      rankingDate: [
        {
          accountNumber: "1212121212",
          name: "宁波区蓝天燃气热电有限公司",
          industry: "工业",
          profession: "制造业",
          output: "2436",
          energyConsumption: "2436",
          comprehensive: "2436",
          Electricity: "2436",
        },
        {
          accountNumber: "1212121212",
          name: "宁波区蓝天燃气热电有限公司",
          industry: "工业",
          profession: "制造业",
          output: "2436",
          energyConsumption: "2436",
          comprehensive: "2436",
          Electricity: "2436",
        },
        {
          accountNumber: "1212121212",
          name: "宁波区蓝天燃气热电有限公司",
          industry: "工业",
          profession: "制造业",
          output: "2436",
          energyConsumption: "2436",
          comprehensive: "2436",
          Electricity: "2436",
        },
      ], //能耗排行表格
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    formatNumber(num) {
      let reg = /(?=(\B)(\d{3})+$)/g;
      return num.toString().replace(reg, ",");
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("topRing"));
      let _this = this;
      myChart.setOption({
        title: [
          {
            text: "产业分布",
            top: "20px",
            left: "20px",
            textStyle: {
              fontSize: 18,
              color: "rgba(255,255,255,1)",
            },
          },
          {
            text: "总量",
            top: "center",
            left: "center",
            textStyle: {
              color: "rgba(255,255,255,1)",
            },
          },
        ],
        series: [
          {
            type: "pie",
            radius: ["30%", "40%"],
            color: ["#4D7FDC", "#5CC294", "#D1A61B"],
            hoverAnimation: false,
            data: [
              {
                name: "农业",
                value: "3720",
              },
              {
                name: "工业",
                value: "2920",
              },
              {
                name: "服务业",
                value: "2200",
              },
            ],
            labelLine: {
              normal: {
                length: 20,
                length2: 70,
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  return (
                    "{name|" +
                    params.name +
                    "}{value|" +
                    _this.formatNumber(params.value) +
                    "}"
                  );
                },
                padding: [0, -100, 25, -100],
                rich: {
                  icon: {
                    fontSize: 16,
                  },
                  name: {
                    fontSize: 14,
                    padding: [0, 10, 0, 4],
                    color: "#fff",
                  },
                  value: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff",
                  },
                },
              },
            },
          },
        ],
      });
      let bottomChart = this.$echarts.init(
        document.getElementById("bottomRing")
      );
      bottomChart.setOption({
        title: [
          {
            text: "行业分布",
            top: "20px",
            left: "20px",
            textStyle: {
              fontSize: 18,
              color: "rgba(255,255,255,1)",
            },
          },
          {
            text: "总量",
            top: "45%",
            left: "23%",
            textStyle: {
              color: "rgba(255,255,255,1)",
            },
          },
        ],
        legend: {
          type: "scroll",
          orient: "vertical",
          right: "10%",
          top: "center",
          itemGap: 20,
          selectedMode: false,
          icon: "pin",
          data: ["农业", "工业", "服务业", "服务业服务业服务"],
          textStyle: {
            color: "#D3D3D3",
            rich: {
              uname: {
                width: 100,
              },
              unum: {
                color: "#4ed139",
                width: 40,
                align: "right",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "40%"],
            center: ["30%", "50%"],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            color: [
              "#5B8FF9",
              "#DC6C4D",
              "#D1A61B",
              "#5B6DD0",
              "#F27EB2",
              "#5CC294",
            ],
            hoverAnimation: false,
            data: [
              {
                name: "农业",
                value: "3720",
              },
              {
                name: "工业",
                value: "2920",
              },
              {
                name: "服务业",
                value: "2200",
              },
              {
                name: "服务业服务业服务",
                value: "2200",
              },
            ],
          },
        ],
      });
      window.addEventListener("resize", function () {
        myChart.resize();
        bottomChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user_container {
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  .title {
    line-height: 3%;
    margin-top: 3%;
    margin-left: 10px;
    margin-bottom: 1.5%;
    font-family: PingFangSC-Semibold, PingFang SC;
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .left {
      width: 30%;
      height: 100%;
      float: left;
      margin-left: 10px;
      .left_top {
        width: 100%;
        height: 45%;
        position: relative;
      }
      .left_bottom {
        width: 100%;
        height: 45%;
        margin-top: 2%;
        position: relative;
      }
      .top_ring {
        width: 100%;
        height: 99%;
        margin-top: 1px;
      }
    }
    .right {
      width: 67%;
      height: 91%;
      margin-left: 1%;
      margin-top: 1px;
      float: left;
      position: relative;
      .right_top {
        width: 100%;
        height: 8%;
        margin-top: 3%;
        .right_title {
          display: inline-block;
          font-size: 18px;
          color: #fff;
          height: 24px;
          line-height: 24px;
          margin-left: 3.5%;
          margin-top: 1%;
          vertical-align: middle;
        }
        .right_form {
          float: right;
          width: 76%;
          height: 100%;
          margin-right: 3%;
        }
        .ranking_date {
          width: 70%;
          margin-top: 40px;
          margin-left: 40px;
          background-color: rgba(0, 37, 62, 0.8);
        }
        .total {
          float: right;
        }
      }
    }
    .bg_color {
      background-color: #00253e;
      opacity: 0.8;
      border: 1px solid rgba(51, 153, 255, 0.24);
    }
  }
}
</style>
<style lang="scss">
.user_container {
  .el-form .el-form--inline {
    display: inline-block;
    border: 1px solid #090;
  }
  .el-form--inline .el-form-item {
    width: 17%;
    margin-right: 0;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-input__inner {
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid #93f6fd;
  }
}
</style>