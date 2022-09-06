<template>
  <div class="chart-warp" style="height: 450px" ref="chartRef">
    <MoreLineChart :options="options" />
  </div>
</template>

<script>
import MoreLineChart from "./more_bar_chart.vue";
import { scaleData } from "@/utils/drawMixin";
import { propsHandleData, colorList } from "./../common";
export default {
  components: { MoreLineChart },
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
              color: "#000000",
              fontSize: 12,
            },
            bottom: 0,
          },
          grid: {
            x: "10%",
            width: "80%",
            y: "10%",
            height: "75%",
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
              nameTextStyle: {
                fontSize: 10,
              },
              axisLabel: {
                formatter: "{value} ",
                fontSize: 10,
                color: "#000000",
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
              color: "#000000",
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

<style>
.chart-warp {
  height: 450px;
}
</style>
