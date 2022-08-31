<template>
  <div style="height:200px">
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="bottomLeftChart"
      width="100%"
      height="100%"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
import { propsHandleData, colorList } from "./../common";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
    category: {
      type: Array,
      default: () => [],
    },
    size: Number,
  },
  watch: {
    cdata: {
      handler(newData) {
        const data = propsHandleData(newData, "bar");
        this.options = {
          title: {
            text: newData.title,
            left: "center",
            top: 10,
            textStyle: {
              fontSize: 16,
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.1)",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC",
              },
            },
          },
          legend: {
            data: data.lengthData,
            textStyle: {
              color: "#B4B4B4",
              fontSize: 12,
            },
            bottom: 4,
          },
          grid: {
            x: "12%",
            width: "80%",
            y: "12%",
            height: "65%",
          },
          xAxis: {
            data: newData.category,
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              fontSize: 8,
              color: '#000000'
            },
          },

          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4",
                },
              },
              nameTextStyle: {
                fontSize: 8,
              },
              axisLabel: {
                formatter: "{value} ",
                fontSize: 8,
                color: '#000000'
              },
            },
          ],
          series: data.seriesData.map((item, index) => ({
            ...item,
            barWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: colorList[index + 2],
              },
            },
            z: -12,
            label: {
              show: true,
              position: [-5, -5],
              color: '#000000',
              fontSize: 10,
            },
          })),
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
