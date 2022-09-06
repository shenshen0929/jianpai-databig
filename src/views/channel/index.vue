<template>
  <div class="channel-warp">
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
        <MOreLineSmallChart
          :cdata="{
            category: category,
            unit: '天',
            title: '各渠道' + stageItemList[index],
            data: item,
            name: '时长',
          }"
        ></MOreLineSmallChart>
      </div>
    </div>
    <div class="rate-channel-warp">
      <div class="count-brand-warp item-channel">
        <TwoBarChart
          :cdata="{
            category: channelCategory,
            title: '各渠道订单总数量',
            data: countList,
          }"
        ></TwoBarChart>
      </div>
      <div v-for="(item, key) in trendList" :key="key" class="item-channel">
        <MOreLineRateChart
          :cdata="{
            category: category,
            unit: '%',
            title: '各渠道准交率趋势' + item.title,
            data: item,
            legendIsTop: 'bottom',
          }"
        ></MOreLineRateChart>
      </div>
      <div class="total-table-warp-channel">
        <div class="title-table">
          各渠道平均总时长(天)
        </div>
        <div>
          <NumberScroll
            :data="{ tableData: channelDuration, titleItem: channelCategory }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneBarChart from "@/components/charts/one-bar-small-chart";
import MOreLineSmallChart from "@/components/charts/more-line-small-charts";
import MOreLineRateChart from "@/components/charts/more-line-rate-charts";
import TwoBarChart from "@/components/charts/more-bar-big-chart";
import NumberScroll from "@/components/numberScroll";
import { scaleData } from "@/utils/drawMixin";
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
    MOreLineRateChart,
    MOreLineSmallChart,
    TwoBarChart,
    NumberScroll,
  },
  data() {
    return {
      scale: {},
      durationList: [],
      stageItemList,
      paddingTop: "50px",
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
    const scale = scaleData();
    this.scale = scale;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 40px;
  margin-top: 20px;
  box-shadow: 0px 0px 10px #244cce;
  background-color: #f6f6f7;
  transform-origin: center 0;
  .duration-channel-warp {
    width: 95%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .rate-channel-warp {
    width: 95%;
    display: flex;
    margin-top: 40px;
    box-shadow: 0px 0px 10px #244cce;
    border-radius: 10px;

    .count-brand-warp {
      box-shadow: 0px 0px 10px #244cce;
      border-radius: 10px;
    }
    .item-channel {
      flex: 1;
      padding: 10px;
    }
  }

  .total-table-warp-channel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    box-shadow: 0px 0px 10px #244cce;
    border-radius: 10px;
  }
}
</style>
