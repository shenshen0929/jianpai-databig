<template>
  <div style="height: 300px" ref="chartRef">
    <OneLineRate :options="options" />
  </div>
</template>

<script>
import OneLineRate from "./one_line_chart.vue";
import { scaleData } from "@/utils/drawMixin";
export default {
  components: { OneLineRate },
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
            formatter: "{a}: {c}" + newData.unit,
          },
          grid: {
            x: "10%",
            width: "80%",
            y: "15%",
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
              type: "line",
              data: newData.data,
              name: newData.name,
              label: {
                show: true,
                position: "bottom",
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

<style></style>
