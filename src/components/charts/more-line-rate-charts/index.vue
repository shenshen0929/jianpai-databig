<template>
  <div
    :style="{
      height: `${cdata.type ? 350 : 450}px`,
    }"
    ref="chartRef"
  >
    <MoreLineRate :options="options" />
  </div>
</template>

<script>
import MoreLineRate from "./more_line_chart.vue";
import { propsHandleData } from "./../common";
import { scaleData } from "@/utils/drawMixin";
export default {
  components: { MoreLineRate },
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
    size() {
      this.$refs["moreLine"]["chart"].resize();
    },
    cdata: {
      handler(newData) {
        const data = propsHandleData(newData, "line");

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
          grid: {
            x: "10%",
            width: "80%",
            y: "10%",
            height: "75%",
          },
          legend: {
            textStyle: {
              color: "#000000",
              fontSize: 10,
            },
            bottom: 0,
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
                fontSize: 10,
                color: "#000000",
              },
              nameTextStyle: {
                fontSize: 10,
              },
            },
          ],
          series: data.seriesData,
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style></style>
