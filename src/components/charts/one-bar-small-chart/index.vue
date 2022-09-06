<template>
  <div
    class="chart-warp"
    :style="{
      height: `${cdata.type ? 320 : 200}px`,
    }"
    ref="chartRef"
  >
    <OneLineChart :options="options" />
  </div>
</template>

<script>
import OneLineChart from "./one_bar_chart.vue";
import { scaleData } from "@/utils/drawMixin";
export default {
  components: { OneLineChart },
  data() {
    return {
      options: {},
      scale: {},
    };
  },
  created() {
    const scale = scaleData();
    this.scale = scale;
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
    size: Number,
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          title: {
            text: newData.title,
            left: "center",
            top: 0,
            textStyle: {
              fontSize: 12,
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
                color: "#000000",
              },
            },
            axisLabel: {
              fontSize: 10,
              color: "#000000",
            },
          },
          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#000000",
                },
              },
              name: newData.unit,
              axisLabel: {
                formatter: "{value} ",
                fontSize: 10,
                color: "#000000",
              },
              nameTextStyle: {
                fontSize: 10,
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
                fontSize: 10,
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

<style>
.chart-warp {
  height: 450px;
}
</style>
