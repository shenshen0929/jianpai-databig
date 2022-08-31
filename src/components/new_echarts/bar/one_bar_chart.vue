<template>
  <div :style="{ height: height }">
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="bottomLeftChart"
      width="100%"
      height="100%"
      ref="oneBar"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
import { fontSize } from "./../common";
export default {
  data() {
    return {
      options: {},
      height: "200px",
    };
  },
  components: {
    Echart,
  },
  created() {
    this.height = `${fontSize(200)}px`;
  },

  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        if (newData.height) {
          this.height = `${fontSize(newData.height)}px`;
        }
        this.options = {
          title: {
            text: newData.title,
            left: "center",
            top: 0,
            textStyle: {
              fontSize: fontSize(16),
            },
          },
          tooltip: {
            trigger: "axis",
            // formatter: "{a}: {c}" + newData.unit,
            backgroundColor: "rgba(255,255,255,0.1)",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC",
              },
            },
          },
          grid: {
            x: "12%",
            width: "80%",
            y: "20%",
            height: "70%",
          },
          xAxis: {
            data: newData.category,
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              fontSize: fontSize(8),
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
              name: newData.unit,
              axisLabel: {
                formatter: "{value} ",
                fontSize: fontSize(8),
                color: '#000000'
              },
              nameTextStyle: {
                fontSize: fontSize(8),
              },
            },
          ],
          series: [
            {
              name: newData.name,
              type: "bar",
              barWidth: 20,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#956FD4" },
                    { offset: 1, color: "#3EACE5" },
                  ]),
                },
              },
              z: -12,
              data: newData.data,
              label: {
                show: true,
                position: "top",
                color: "#000000",
                fontSize: fontSize(8),
              },
            },
          ],
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
