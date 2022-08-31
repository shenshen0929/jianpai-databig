<template>
  <div style="height:200px">
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="oneLineChart"
      width="100%"
      height="100%"
      ref="oneLine"
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
      height: '200px'
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => [],
    },
    category: {
      type: Array,
      default: () => [],
    },
    unit: {
      type: String,
      default: () => "%",
    },
    title: {
      type: String,
      default: () => "近6个月准交率变化趋势",
    },
  },
  created() {
    this.height = `${fontSize(200)}px`;
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          title: {
            text: newData.title,
            left: "center",
            top: 10,
            textStyle: {
              fontSize: fontSize(16),
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
