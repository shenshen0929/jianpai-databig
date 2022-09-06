<template>
  <div class="brand-warp">
    <div class="duration-brand-warp">
      <div v-for="(item, index) in durationList" :key="index">
        <OneBarChart
          :cdata="{
            category: brandCategory,
            unit: '天',
            title: '各品牌' + stageItemList[index],
            data: item,
            name: '时长',
          }"
        ></OneBarChart>
      </div>
    </div>
    <div class="duration-brand-warp">
      <div v-for="(item, index) in durationMonthList" :key="index">
        <MoreLineSmallChart
          :cdata="{
            category: category,
            unit: '天',
            title: '各品牌' + stageItemList[index],
            data: item,
            name: '时长',
          }"
        ></MoreLineSmallChart>
      </div>
    </div>
    <div class="rate-brand-warp">
      <div class="count-brand-warp">
        <MoreBarBig
          :cdata="{
            category: brandCategory,
            title: '各品牌订单数量',
            data: countList,
          }"
        ></MoreBarBig>
      </div>
      <div class="rate-item">
        <div v-for="(item, key) in trendList" :key="key" class="rate-flex">
          <MoreLineRateChart
            :cdata="{
              category: category,
              unit: '%',
              title: '各品牌准交率趋势' + item.title,
              data: item,
              legendIsTop: 'bottom',
            }"
          ></MoreLineRateChart>
        </div>
      </div>
      <div class="total-table-warp-brand">
        <div>
          <div class="title-table">
            各品牌平均总时长(天)
          </div>
          <div class="total-table">
            <NumberScroll
              :data="{ tableData: brandDuration, titleItem: brandCategory }"
            />
          </div>
        </div>
        <div>
          <div class="title-table">
            各品牌入库订单总数量占比
          </div>
          <div class="total-table">
            <NumberScroll
              :data="{ tableData: brandMound, titleItem: brandCategory }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneBarChart from "@/components/charts/one-bar-small-chart";
import MoreLineSmallChart from "@/components/charts/more-line-small-charts";
import MoreLineRateChart from "@/components/charts/more-line-rate-charts";
import MoreBarBig from "@/components/charts/more-bar-big-chart";
import NumberScroll from "@/components/numberScroll";
import { scaleData } from "@/utils/drawMixin";
import {
  stageItemList,
  getDimensionData,
  tableNumberStyle,
  reatOnTimeHandleType,
} from "./../common";
import { orgnameconfirmDate, orgname_ontime } from "./../api";
export default {
  components: {
    OneBarChart,
    MoreLineSmallChart,
    MoreLineRateChart,
    MoreBarBig,
    NumberScroll,
  },
  data() {
    return {
      durationList: [], // 各阶段各品牌平均时长
      stageItemList,
      category: [],
      tableNumberStyle,
      durationMonthList: [],
      // 各品牌数量
      countList: {},
      // 准交率趋势
      trendList: {},
      brandCategory: [],
      brandDuration: [],
      brandMound: [],
      paddingTop: "50px",
      scale: {},
    };
  },
  created() {
    this.getOrgnameconfirmData(this.$route.query);
    this.getorGname_ontime(this.$route.query);
    const scale = scaleData();
    this.scale = scale;
  },
  watch: {
    $route() {
      this.getOrgnameconfirmData(this.$route.query);
      this.getorGname_ontime(this.$route.query);
    },
  },
  methods: {
    getOrgnameconfirmData(data) {
      orgnameconfirmDate(data).then((res) => {
        const data = getDimensionData(res);
        this.category = data.category;
        this.durationMonthList = data.durationMonthList;
        this.durationList = data.durationList;
        this.brandCategory = data.typeCategory;
        this.countList = data.countList;
        this.brandDuration = data.typeDuration;
        this.brandMound = data.typeMound;
      });
    },
    getorGname_ontime(data) {
      orgname_ontime(data).then((res) => {
        this.trendList = reatOnTimeHandleType(res);
      });
    },
  },
};
</script>

<style lang="scss">
@import "./../common.scss";
.brand-warp {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f7;
  box-shadow: 0px 0px 10px #244cce;
  padding-bottom: 20px;
  padding-top: 40px;
  margin-top: 20px;
  transform-origin: center 0;
  .duration-brand-warp {
    display: grid;
    width: 95%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .rate-brand-warp {
    width: 95%;
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    box-shadow: 0px 0px 10px #244cce;
    .rate-item {
      display: flex;
      justify-content: space-around;
      flex: 2;
      padding-bottom: 20px;
      .rate-flex {
        flex: 1;
      }
    }
    .count-brand-warp {
      border-radius: 10px;
      box-shadow: 0px 0px 10px #244cce;
      flex: 1;
    }
    .total-table-warp-brand {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 250px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px #244cce;
    }
  }
}
</style>
