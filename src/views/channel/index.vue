<template>
  <div class="channel-warp" :style="{paddingTop: paddingTop}">
    <div class="duration-channel-warp">
      <div v-for="(item, index) in durationList" :key="index">
        <OneBarChart
          :cdata="{
            category: channelCategory,
            unit: '天',
            title: '各渠道' + stageItemList[index],
            data: item,
            name: '时长',
          }"
        ></OneBarChart>
      </div>
    </div>
    <div class="duration-channel-warp">
      <div v-for="(item, index) in durationMonthList" :key="index">
        <FourLineChart
          :cdata="{
            category: category,
            unit: '天',
            title: '各渠道' + stageItemList[index],
            data: item,
            name: '时长',
          }"
        ></FourLineChart>
      </div>
    </div>
    <div class="rate-channel-warp">
      <TwoBarChart
        :cdata="{
          category: channelCategory,
          title: '各渠道订单总数量',
          data: countList,
        }"
      ></TwoBarChart>
      <div v-for="(item, key) in trendList" :key="key">
        <FourLineChart
          :cdata="{
            category: category,
            unit: '%',
            title: '各渠道准交率趋势' + item.title,
            data: item,
            legendIsTop: 'bottom',
          }"
        ></FourLineChart>
      </div>
      <dv-border-box-1 class="total-chart">
        <div class="total-table-warp">
          <div class="total-table-title" :style="{fontSize: fontSizeNum}">各渠道平均总时长(天)</div>
          <div class="total-table">
            <div
              class="total-table-item"
              v-for="(item, index) in channelCategory"
              :key="item.title"
            >
              <p class="colorBlue item-title">{{ item }}</p>
              <div>
                <NumberScroll :number="channelDuration[index]" />
              </div>
            </div>
          </div>
        </div>
      </dv-border-box-1>
    </div>
  </div>
</template>

<script>
import OneBarChart from "@/components/new_echarts/bar/one_bar_chart.vue";
import FourLineChart from "@/components/new_echarts/line/more_line_chart.vue";
import TwoBarChart from "@/components/new_echarts/bar/more_bar_chart.vue";
import NumberScroll from "@/components/numberScroll";
import { fontSize } from "./../common";
import {
  stageItemList,
  getDimensionData,
  tableNumberStyle,
  reatOnTimeHandleType,
} from "../common";
import { saleschannelconfirmDate, saleschannel_ontime } from "./../api";
export default {
  components: {
    OneBarChart,
    FourLineChart,
    TwoBarChart,
    NumberScroll,
  },
  data() {
    return {
      durationList: [],
      stageItemList,
       paddingTop: '50px',
       fontSizeNum: '16px',
      category: [],
      durationMonthList: [],
      // 各渠道数量
      countList: {},
      tableNumberStyle,
      // 准交率趋势
      trendList: {
        delivery: {
          firstData: {
            name: "工程",
            data: [32, 55, 69, 55, 66, 45],
          },
          secondData: {
            name: "家装",
            data: [45, 65, 59, 39, 76, 62],
          },
          thridData: {
            name: "零售",
            data: [56, 45, 66, 65, 78, 87],
          },
          title: "各渠道准交率变化趋势(出库时间）",
        },
        entry: {
          firstData: {
            name: "工程",
            data: [34, 56, 77, 66, 55, 77],
          },
          secondData: {
            name: "家装",
            data: [77, 65, 76, 46, 56, 65],
          },
          thridData: {
            name: "零售",
            data: [56, 45, 66, 65, 78, 87],
          },
          title: "各渠道准交率变化趋势(入库时间）",
        },
      },
      channelCategory: [],
      channelDuration: [],
      channelMound: [],
    };
  },
  created() {
    this.getSalesChannelconfirmDate(this.$route.query);
    this.getSaleschannel_ontime(this.$route.query);
    this.paddingTop = `${fontSize(80)}px`
    this.fontSizeNum = `${fontSize(16)}px`
  },
  watch: {
    $route() {
      this.getSalesChannelconfirmDate(this.$route.query);
      this.getSaleschannel_ontime(this.$route.query);
    },
  },
  methods: {
    getSalesChannelconfirmDate(params) {
      saleschannelconfirmDate(params).then((res) => {
        const data = getDimensionData(res);
        this.category = data.category;
        this.durationMonthList = data.durationMonthList;
        this.durationList = data.durationList;
        this.channelCategory = data.typeCategory;
        this.countList = data.countList;
        this.channelDuration = data.typeDuration;
        this.channelMound = data.typeMound;
      });
    },
    getSaleschannel_ontime(params) {
      saleschannel_ontime(params).then((res) => {
        this.trendList = reatOnTimeHandleType(res);
      });
    },
  },
};
</script>

<style lang="scss">
.channel-warp {
   padding-left:20px;
  padding-right: 20px;
  .duration-channel-warp {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr 3fr;
  }
  .rate-channel-warp {
    display: grid;
    grid-template-columns: 4fr 3fr 3fr 4fr;
  }
  .total-table-warp {
    width: 100%;
    padding: 25px;
    .total-table-title {
      color: rgb(79, 104, 141);
      font-size: 1.8vh;
      font-weight: 600;
    }
  }
  .total-chart {
    height: 80%;
  }
  .total-table {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .item-title  {
      font-size: 12px;
    }
    .total-table-item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 25%;
      height: 50px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
}
</style>
