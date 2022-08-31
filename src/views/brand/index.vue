<template>
  <div class="brand-warp" style="paddingTop: 60px">
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
        <FourLineChart
          :cdata="{
            category: category,
            unit: '天',
            title: '各品牌' + stageItemList[index],
            data: item,
            name: '时长',
          }"
        ></FourLineChart>
      </div>
    </div>
    <div class="rate-brand-warp">
      <TwoBarChart
        :cdata="{
          category: brandCategory,
          title: '各品牌订单数量',
          data: countList,
        }"
      ></TwoBarChart>
      <div v-for="(item, key) in trendList" :key="key">
        <FourLineChart
          :cdata="{
            category: category,
            unit: '%',
            title: '各品牌准交率趋势' + item.title,
            data: item,
            legendIsTop: 'bottom',
          }"
        ></FourLineChart>
      </div>
      <dv-border-box-1 class="total-chart">
        <div class="total-table-warp">
          <div>
            <div class="total-table-title" :style="{fontSize: fontSizeNum}">各品牌平均总时长(天)</div>
            <div class="total-table">
              <div
                class="total-table-item"
                v-for="(item, index) in brandCategory"
                :key="item.title"
              >
                <p class="ml-3 colorBlue fw-b fs-xl">{{ item }}</p>
                <div>
                  <NumberScroll :number="brandDuration[index]" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="total-table-title total-table-last" :style="{fontSize: fontSizeNum}">
              各品牌入库订单总数量占比
            </div>
            <div class="total-table">
              <div
                class="total-table-item"
                v-for="(item, index) in brandCategory"
                :key="item.title"
              >
                <p class="item-title colorBlue">{{ item }}</p>
                <div>
                  <NumberScroll :number="brandMound[index]" />
                </div>
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
} from "./../common";
import { orgnameconfirmDate, orgname_ontime } from "./../api";
export default {
  components: {
    OneBarChart,
    FourLineChart,
    TwoBarChart,
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
      paddingTop: '50px',
      fontSizeNum: '16px'
    };
  },
  created() {
    this.getOrgnameconfirmData(this.$route.query);
    this.getorGname_ontime(this.$route.query);
    this.paddingTop = `${fontSize(50)}px`
    this.fontSizeNum = `${fontSize(16)}px`
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
  width: 100%;
  padding-left:20px;
  padding-right: 20px;
  .duration-brand-warp {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr 3fr;
  }
  .rate-brand-warp {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .total-table-warp {
    height: 90%;
    padding: 20px 20px 40px 40px;
    .total-table-title {
      color: rgb(79, 104, 141);
      font-weight: 600;
    }
    .total-table-last {
      margin-top: 10px;
    }
    .item-title {
      font-size: 12px;
    }
  }
  .total-chart {
    height: 90%;
  }
}
</style>
