<template>
  <div style="height:200px">
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="oneLineChart"
      width="100%"
      height="100%"
      ref="moreLine"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
import { propsHandleData, fontSize } from "./../common";
export default {
  data() {
    return {
      options: {},
      height: '200px'
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
        const legend = {
          data: data.legendData,
          textStyle: {
            color: "#000000",
            fontSize: 8,
          },
          top: "15%",
          left: "15%",
          type: "scroll",
        };
        const grid = {
          x: "8%",
          width: "90%",
          y: "30%",
          height: "57%",
        };
        this.options = {
          title: {
            text: newData.title,
            left: "center",
            top: 5,
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
          grid: grid,
          legend,
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
              name: newData.unit,
              axisLabel: {
                fontSize: 8,
                color: '#000000'
              },
              nameTextStyle: {
                fontSize: 8,
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
