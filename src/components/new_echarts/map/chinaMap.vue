<template>
  <div style="height:400px">
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="oneTreemapChart"
      width="100%"
      height="100%"
      ref="oneTreemap"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
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
      default: () => [],
    },
  },
  watch: {
    cdata: {
      async handler(newData) {
        this.options = {
          title: {
            text: "各省份订单数量",
            left: "center",
            top: 10,
            textStyle: {
              fontSize: 16,
            },
          },
          visualMap: {
            min: 0,
            max: 1000,
            text: ["High", "Low"],
            realtime: false,
            calculable: true,
            itemHeight: 100,
            top: "1%",
            inRange: {
              color: ["lightskyblue", "yellow", "orangered"],
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}:{c}",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          series: [
            {
              name: "各省数量",
              type: "map",
              map: "china",
              zoom: 1,
              colorBy: "data",

              label: {
                show: true,
                formatter: (params) => {
                  return `${params.name}:${params.value ? params.value : 0}`;
                },
                fontSize: 8,
                // color: "rgb(199, 213, 230)",
              },
              data: newData.data,
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
