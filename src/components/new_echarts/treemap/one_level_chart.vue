<template>
  <div style="height:55vh">
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
import { getLevelOption } from "./common";
import { fontSize } from "./../common";
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
      handler(newData) {
        const formatUtil = this.$echarts.format;
        this.options = {
          title: {
            text: newData.title,
            left: "center",
            top: 10,
            textStyle: {
              fontSize: fontSize(18),
            },
          },
          grid: {
            x: "12%",
            width: "80%",
            y: "25%",
            height: "60%",
          },
          tooltip: {
            formatter: function(info) {
              var value = info.value;
              var treePathInfo = info.treePathInfo;
              var treePath = [];
              for (var i = 1; i < treePathInfo.length; i++) {
                treePath.push(treePathInfo[i].name);
              }
              return [
                '<div class="tooltip-title">' +
                  formatUtil.encodeHTML(treePath.join("/")) +
                  "</div>",
                "订单数量: " +
                  formatUtil.addCommas(value) +
                  "<br />" +
                  "数量占比: " +
                  formatUtil.addCommas(
                    Math.round((value / newData.total) * 10000) / 100
                  ) +
                  "%",
              ].join("");
            },
          },
          color: [
            "rgb(86,155,224)",
            "rgb(86,155,200)",
            "rgb(45,160,220)",
            "rgb(75,120,189)",
            "rgb(50,155,229)",
            "rgb(66,124,255)",
          ],
          series: [
            {
              type: "treemap",
              data: newData.data,
              name: newData.name,
              roam: false,
              width: "90%",
              height: "85%",
              bottom: 20,
              label: {
                show: true,
                formatter: "{b}:{c}",
              },
              nodeClick: false,
              colorAlpha: [0.3, 1],
              colorSaturation: [0.3, 1],
              levels: getLevelOption(),
              itemStyle: {
                borderColor: "break",
              },
              breadcrumb: {
                show: false,
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
