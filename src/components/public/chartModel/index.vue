<template>
  <div class="chart_model" ref="chartRef" id="chartDomAll"></div>
</template>
<script>
import initEcharts from "@/config/initEcharts";
import { mapGetters } from 'vuex'
export default {
  name: "chart-model",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  computed: {
    ...mapGetters(['getSidebarFold'])
  },
  mounted() {},
  watch: {
    getSidebarFold() {
      setTimeout(() => {
        this.chart.resize()
      }, 400)
    },
    options: {
      immediate: true,
      deep: true,
      handler(val) {
        const that = this;
        if (!val) {
          return;
        }
        if (this.chart && this.$refs.chartRef) {
          this.chart.clear(); // 清空画布
          this.chart.setOption(val || {});
        } else {
          initEcharts().then(echarts => {
            this.$nextTick(() => {
              this.chart = echarts.init(this.$refs.chartRef);
              this.chart.setOption(val || {});
              this.extension(this.chart);
              this.chart.on("click", function(params) {
                that.$emit("clickEcharts", params);
              });
            });
          });
        }
      }
    }
  },
  methods: {
    //文本超出隐藏
    extension(mychart) {
      //判断是否创建过div框,如果创建过就不再创建了
      var id = document.getElementById("extension");
      if (!id) {
        var div = document.createElement("div");
        div.id = "extension";
        div.style.display = "none";
        var body = document.getElementsByTagName("body");
        body[0].appendChild(div);
      }

      mychart.on("mouseover", function(params) {
        if (params.componentType == "yAxis") {
          var extension = document.getElementById("extension");
          extension.style.position = "absolute";
          extension.style.color = "black";
          extension.style.fontFamily = "Arial";
          extension.style.fontSize = "12px";
          extension.style.padding = "5px";
          extension.style.display = "inline";
          extension.style.backgroundColor = "#fff";
          extension.innerHTML = params.value;
          mychart.on('mouseover',function(event) {
            var xx = event.event.event.pageX - 30;
            var yy = event.event.event.pageY - 20;
            var extension = document.getElementById("extension");
            extension.style.top = yy + 'px';
            extension.style.left = xx + 'px';
          })
        }else{
          var extension = document.getElementById("extension");
          extension.style.display = "none";
        }
      });
      mychart.on("mouseout", function(params) {
        if(params.componentType == "yAxis") {
          var extension = document.getElementById("extension");
          setTimeout(() => {
            extension.style.display = "none";
          }, 3000)
        }
      });
    }
  },
  beforeDestroy() {
    this.chart.clear(); // 清空画布
    this.chart.dispose(); // 释放实例
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
