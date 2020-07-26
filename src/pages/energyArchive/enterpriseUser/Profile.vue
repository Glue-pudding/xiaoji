<template>
  <div class="profile_container">
    <div class="profile_top border backgroundcolor">
      <bgBorder />
      <div class="top_left">
        <p class="basic">基本信息</p>
        <el-row :gutter="24">
          <el-col :span="10">
            <div>
              <span class="content">企业名称:</span>
              <span>{{info.name || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div>
              <span class="content">统一社会信用代码:</span>
              <span>{{info.idNum || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div>
              <span class="content">区域:</span>
              <span>{{info.name || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div>
              <span class="content">企业地址:</span>
              <span>{{info.idNum || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div>
              <span class="content">所属产业:</span>
              <span>{{info.name || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div>
              <span class="content">行业门类:</span>
              <span>{{info.idNum || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div>
              <span class="content">行业大类:</span>
              <span>{{info.name || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div>
              <span class="content">行业中类:</span>
              <span>{{info.idNum || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div>
              <span class="content">供电户号:</span>
              <span>{{info.name || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div>
              <span class="content">供水户号:</span>
              <span>{{info.idNum || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div>
              <span class="content">天然气户号:</span>
              <span>{{info.name || "-"}}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div>
              <span class="content">供热户号:</span>
              <span>{{info.idNum || "-"}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="top_right"></div>
    </div>
    <div class="profile_bottom">
      <div class="bottom border backgroundcolor">
        <bgBorder />
        <p class="basic title">能源使用情况</p>
        <el-table
          :data="energyDate"
          class="energy_date"
          :header-cell-style="{background:'#062F4C',color:'#40A7AE',}"
          header-align="left"
          style="width:90%;"
        >
          <el-table-column prop="accountNumber" label="能源" min-width="100"></el-table-column>
          <el-table-column prop="name" label="2020" ></el-table-column>
          <el-table-column prop="industry" label="2019" ></el-table-column>
          <el-table-column prop="profession" label="2018" ></el-table-column>
          <el-table-column prop="profession" label="2017" ></el-table-column>
        </el-table>
      </div>
      <div class="bottom border bottom_right backgroundcolor">
        <p class="basic title">经济数据情况</p>
        <bgBorder />
      </div>
    </div>
  </div>
</template>
<script>
import bgBorder from "../../../components/public/bgBorder/index";
export default {
  name: "Profile",
  components: {
    bgBorder,
  },
  data() {
    return {
      info: [],
      energyDate: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.profile_container {
  color: #fff;
  width: 100%;
  .profile_top {
    width: 99%;
    height: 300px;
    position: relative;
    .top_left {
      width: 50%;
      padding-top: 15px;
      font-size: 14px;
      .content {
        width: 170px;
        text-align: right;
        padding-top: 20px;
        color: #3399ff;
        display: inline-block;
      }
    }
  }
  .profile_bottom {
    width: 100%;
    height: 500px;
    margin: 8px auto;
    .bottom {
      width: 49%;
      height: 100%;
      float: left;
      position: relative;
    }
    .energy_date {
      width: 70%;
      margin-top: 20px;
      margin-left: 30px;
    }
    .bottom_right {
      float: left;
      margin-left: 15px;
    }
  }
  .basic {
    margin-left: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-size: 18px;
  }
  .title {
    margin-top: 15px;
  }
  .border {
    border: 1px solid rgba(51, 153, 255, 0.24);
  }
  .backgroundcolor {
    background-color: rgba(0, 37, 62, 0.8);
  }
}
</style>