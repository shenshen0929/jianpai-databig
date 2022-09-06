<template>
  <div style="height:900px">
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
import { geoCoordMap, planePath, geoProvince } from "./china.js";
import { scaleData } from "@/utils/drawMixin";
export default {
  data() {
    return {
      options: {},
      scale: {},
    };
  },
  components: {
    Echart,
  },
  created() {
    const scale = scaleData();
    this.scale = scale;
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
        const obj = {};
        const regionsArr = [];
        newData.data.forEach((item) => {
          obj[item.name] = item.value;
          regionsArr.push({
            name: item.name,
            itemStyle: {
              areaColor:
                item.value > 500
                  ? "rgba(255, 69, 0,0.5)"
                  : item.value > 100
                  ? "rgba(255, 255, 0,0.5)"
                  : "rgba(135, 206, 250,0.5)",
            },
          });
        });
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
            max: 500,
            text: ["High", "Low"],
            realtime: false,
            calculable: true,
            itemHeight: 100,
            top: "10%",
            left: "10%",
            seriesIndex: 0,
            inRange: {
              color: ["rgba(135, 206, 250,1)", "yellow", "orangered"],
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
          geo: {
            name: "各省数量",
            type: "map",
            map: "china",
            zoom: 1.5,
            colorBy: "data",
            regions: regionsArr,
            top: "20%",
            label: {
              show: true,
              formatter: (params) => {
                return `${params.name}:${obj[params.name]}`;
              },
              fontSize: 10,
              // color: "rgb(199, 213, 230)",
            },
          },

          series: [
            {
              type: "lines",
              name: "景德镇",
              zlevel: 1,
              label: {
                show: true,
                formatter: (params) => {
                  return params.data.toname;
                },
                fontSize: 10,
                color: "rgba(200,152,124,0.3)",
              },
              effect: {
                show: true,
                symbol: planePath, //把矢量图planPath赋值给symbol
                symbolSize: 6, // 控制矢量图的大小
              },
              lineStyle: {
                curveness: 0.2, //控制线条的弯曲度
                color: "#6beef4", //不同的起点显示不同的线条样式
                width: 1, //线条的宽度
              },
              data: this.returnCoords(obj),
              geoIndex: 0,
            },
          ],
        };
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    returnCoords(obj) {
      return Object.keys(geoCoordMap).map((element) => {
        // newData.data;
        let fromcoords = [116.0046, 28.6633];
        let tocoords = geoCoordMap[element];
        return {
          fromname: "景德镇",
          toname: element,
          coords: [fromcoords, tocoords],
          value: obj[geoProvince[element]] ? obj[geoProvince[element]] : 0,
        };
      });
    },
  },
};
</script>
