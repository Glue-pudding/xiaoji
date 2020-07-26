const echarts = require('echarts');
import { setRem } from '@/assets/javascript/public'


/**
 * 柱状图
 * xData 横坐标数组
 * color 颜色数组
 * yData 纵坐标数组
 */
const charOption ={
  // 水晶图
  waterChart : (max = 100,scroe = 0.3,yData=[]) => {
    return {
      backgroundColor:'rgba(0,37,62,0.8)',
      title: {
        top: '37%',
        left: 'center',
        text: (scroe * 10000 / 100) + ' %',
        textStyle: {
          color: '#fff',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 16
        }
      },
      series: [{
        type: 'liquidFill',
        itemStyle: {
          opacity:0.8,//波浪的透明度
          shadowBlur: 10,//波浪的阴影范围
        },
        radius:'80%',
        //水波
        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#71D8E0"
        },
          {
            offset: 1,
            color: '#1180A8'
          }
        ])],
        data: [{
          value: scroe,
        }],
        // background: '#000',
        center: ['50%', '50%'],
        backgroundStyle: {
          color: 'rgba(0,37,62,0.8)'
        },
        label: {
          normal: {
            formatter: '',
            textStyle: {
              fontSize: 12
            }
          }
        },
        outline: {
          itemStyle: {
            borderColor: 'transparent',
            borderWidth: 5
          },
          borderDistance: 0
        }
      },
        //外环线
        {
          "color": ['#39B7C9', 'transparent'],
          "type": "pie",
          "center": ["50%", "50%"],
          "radius": ["80%", "81.5%"],
          "hoverAnimation": false,
          "data": [{
            "name": "",
            "value": max * scroe,
            "label": {
              "show": false,
              "position": "center",
              "color": "#fff",
              "fontSize": 38,
              "fontWeight": "bold",
              "formatter": function(o) {
                return max * scroe
              }
            }
          }
          ]
        }
      ]
    }
  },
  // 单条折线图
  oneLineChart : ({title='',color=['','',''],xData=[],yData=[]}) => {
    return {
      title: {
        text: title,
        textStyle: {
          color: '#CBFAFE',
          fontSize: 14
        },
        top:  setRem(50),
        left: 10
      },
      tooltip: {
        confine: true,
        trigger: 'axis',
        formatter: '{b}年:   {c}'
      },
      grid: {
        top: 0,
        bottom: 0,
        left: setRem(-48),
        right: setRem(-48)
      },
      xAxis: [{
        show: false,
        data: xData
      }],
      yAxis: [{
        show: false,
      }],
      series: [
        {
          type: 'line',
          showSymbol: false,
          zlevel: 3,
          lineStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color[0]
              }, {
                offset: 1,
                color: color[1]
              }])
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color[2],
              }, {
                offset: 1,
                color: 'rgba(64,195,197,0.16)'
              }])
            }
          },
          data: yData
        }]
    }
  },
  // 单条柱状图
  barChart : (color=['',''],xData=[],yData=[]) => {
    return {
      tooltip : {
        trigger: 'axis',
        axisPointer : {
          type : 'shadow'
        }
      },
      grid: {
        top: 90,
        left: '10%',
        right: '5%',
        bottom: '11%',
      },
      xAxis: [
        {
          type: 'category',
          data: xData,
          axisLine: {
            lineStyle:{
              color: '#DDDFE9'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 11,
            color: '#707790'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          min: 0,
          splitLine: {
            // show: false
            lineStyle: {
              color: '#F1F2F7',
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#AAB3C0',
            formatter: '{value}%'
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          data: yData,
          type: 'bar',
          name: '',
          barWidth: setRem(28),
          label: {
            show: true,
            position: 'top',
            color: "#AAB3C0",
            formatter: '{c}%'
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 1, 0, 0, [{
                  offset: 0,
                  color: color[0]
                },
                  {
                    offset: 1,
                    color: color[1]
                  }
                ])
            }
          }
        }
      ]
    }
  },
  // 多pie
  multiWarnChart: () => {
    return{
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br /> {c} ({d}%)',
        confine: true,
      },
      color: [],
      grid: {
        top: 0,
        left: 0
      },
      legend: {
        orient: 'vertical',
        top: 'middle',
        // left: '48%',
        // right: 20,
        itemWidth: 10,
        itemHeight: 10,
        selectedMode: false,
        data: []
      },
      itemStyle: { opacity: 0 },
      series: [
        {
          type: 'pie',
          radius: '100%',
          center: ['50%', '50%'],
          clockwise: false,
          hoverOffset: 0,
          selectedOffset: 0,
          // legendHoverLink: false,
          // selectedMode: false,
          minAngle: 10,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        },
        {
          type: 'pie',
          radius: '95%',
          center: ['50%', '50%'],
          clockwise: false,
          hoverOffset: 0,
          selectedOffset: 0,
          // legendHoverLink: false,
          // selectedMode: false,
          minAngle: 10,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        },
        {
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          clockwise: false,
          hoverOffset: 0,
          selectedOffset: 0,
          // legendHoverLink: false,
          // selectedMode: false,
          minAngle: 10,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        },
        {
          type: 'pie',
          radius: '85%',
          center: ['50%', '50%'],
          clockwise: false,
          hoverOffset: 0,
          selectedOffset: 0,
          // legendHoverLink: false,
          // selectedMode: false,
          minAngle: 10,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        },
        {
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          clockwise: false,
          hoverOffset: 0,
          selectedOffset: 0,
          // legendHoverLink: false,
          // selectedMode: false,
          minAngle: 10,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        },
        {
          type: 'pie',
          radius: '75%',
          center: ['50%', '50%'],
          clockwise: false,
          hoverOffset: 0,
          selectedOffset: 0,
          // legendHoverLink: false,
          // selectedMode: false,
          minAngle: 10,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        },
        {
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          clockwise: false,
          hoverOffset: 0,
          selectedOffset: 0,
          // legendHoverLink: false,
          // selectedMode: false,
          minAngle: 10,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        },
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          clockwise: false,
          hoverOffset: 0,
          selectedOffset: 0,
          // legendHoverLink: false,
          // selectedMode: false,
          minAngle: 10,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        }
      ]
    }
  }


}


export default charOption
