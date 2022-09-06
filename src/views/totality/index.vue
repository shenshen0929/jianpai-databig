<template>
  <div class="total-warp">
    <!-- 时长流程图 -->
    <!-- <div class="show-flow-button" @click="showFlowChartHandle">
      {{ isShowFlowChart ? "收起" : "展开" }}流程图
    </div> -->
    <div class="flow-chart-warp" ref="flowChartWarp" v-if="isShowFlowChart">
      <div
        v-for="(item, index) in flowChartList"
        :key="item.subTitle"
        class="flow-chart-item"
      >
        <div class="flow-chart-content">
          <div class="flow-chart-title">{{ item.title }}</div>
          <div class="flow-chart-subtitle">{{ item.subTitle }}</div>
        </div>
        <div class="arrow-align" v-if="index < 5">
          <img src="@/assets/arrowAlign.png" alt="箭牌家居" />
        </div>
        <div class="arrow-colums" v-if="index < 5">
          <img src="@/assets/arrowColums.png" alt="" />
          <div class="flow-data">({{ everyStepTime[index] }}天)</div>
        </div>
      </div>
    </div>
    <!--月份数量-->
    <div class="total-chart-warp">
      <div class="count-chart item-warp">
        <MOreBarBig
          :cdata="{ data: mountData, category, title: '近六个月订单数量变化' }"
        />
      </div>
      <div class="table-data">
        <div class="title-table">2022.03至2022.07月数据</div>
        <NumberScroll :data="{ tableData, titleItem }" />
      </div>

      <div class="item-warp">
        <MoreLineChart
          :cdata="{
            data: rateData,
            category,
            unit: '%',
            title: '准交率变化趋势',
          }"
          :category="category"
        ></MoreLineChart>
      </div>
    </div>
    <!--各阶段时长-->
    <div class="time-chart-warp">
      <div
        v-for="(item, index) in monthdurationData"
        :key="index"
        :class="isShowFlowChart ? 'normal' : 'bigLine'"
      >
        <OneLineSmallChart
          :cdata="{
            data: item,
            category: category,
            unit: '天',
            title: stageItemList[index],
            name: '时长',
          }"
        ></OneLineSmallChart>
      </div>
    </div>
  </div>
</template>

<script>
import MOreBarBig from "@/components/charts/more-bar-big-chart";
import OneLineSmallChart from "@/components/charts/one-line-small-charts";
import MoreLineChart from "@/components/charts/more-line-rate-charts";
import NumberScroll from "@/components/numberScroll";
import { scaleData } from "@/utils/drawMixin";
import {
  stageItemList,
  mountHandleTotal,
  tableNumberStyle,
  getCategory,
  reatOnTimeHandleTotal,
  skeletonStyle,
} from "./../common";
import { totalData, all_ontime } from "./../api";
import { debounce } from "@/utils";
import { fontSize } from "./../common";

export default {
  components: {
    MOreBarBig,
    OneLineSmallChart,
    MoreLineChart,
    NumberScroll,
  },
  watch: {
    $route() {
      this.getTotalData(this.$route.query);
      this.getAll_ontime(this.$route.query);
    },
  },
  data() {
    return {
      skeletonStyle,
      scale: {},
      flowChartList: [
        {
          title: "创建订单",
          subTitle: "CreateDate",
        },
        {
          title: "审核订单",
          subTitle: "ConfirmDate",
        },
        {
          title: "下达基地",
          subTitle: "oeb2201",
        },

        {
          title: "开始生产",
          subTitle: "sfb08",
        },
        {
          title: "订单入库",
          subTitle: "udf07",
        },
        {
          title: "订单出库",
          subTitle: "delivery_date",
        },
      ],
      paddingTop: "50px",
      fontSizeNum: "16px",
      stageItemList,
      tableNumberStyle,
      category: [],
      rateData: {},
      monthdurationData: [],
      mountData: {},
      tableData: [],
      everyStepTime: [],
      isShowFlowChart: true,
      titleItem: [
        "订单入库总数量",
        "订单出库总数量",
        "订单平均总时长(天)",
        "生产耗时占比",
        "订单出库耗时占比",
      ],
    };
  },
  created() {
    const scale = scaleData();
    this.scale = scale;
    this.getTotalData(this.$route.query);
    this.getAll_ontime(this.$route.query);
    this.paddingTop = `${fontSize(100)}px`;
    this.fontSizeNum = `${fontSize(16)}px`;
  },
  methods: {
    getTotalData(params) {
      totalData(params).then((res) => {
        this.category = getCategory(res);
        const data = mountHandleTotal(res);
        this.monthdurationData = data.monthdurationData;
        this.mountData = data.mountData;
        this.tableData = data.tableData;
        this.everyStepTime = data.everyStepTime;
      });
    },
    getAll_ontime(params) {
      all_ontime(params).then((res) => {
        this.rateData = reatOnTimeHandleTotal(res);
      });
    },
    showFlowChartHandle: debounce(function() {
      this.isShowFlowChart = !this.isShowFlowChart;
    }, 300),
  },
};
</script>

<style lang="scss">
@import "./../common.scss";

.total-warp {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  // height: calc(100vh - 90px);
  padding-top: 60px;
  transform-origin: center 0;
  translate: 0 20px;
  box-shadow: 0px 0px 10px #244cce;
  // .show-flow-button {
  //   position: absolute;
  //   top: 50px;
  //   left: 2%;
  //   font-size: 16px;
  //   color: black;
  //   font-weight: 600;
  //   background: #fff;
  //   padding: 8px;
  //   border-radius: 5px;
  //   cursor: pointer;
  // }
  // .big {
  //   transform: scale(1, 1.5) translateY(1vh);
  //   transform-origin: left top;
  // }
  // .bigLine {
  //   transform: scale(1, 1.5) translateY(13.5vh);
  // }
  // .normal {
  //   transform: scale(1, 1);
  // }
  .flow-chart-warp {
    display: flex;
    width: 70%;
    justify-content: center;
    .flow-chart-label {
      font-size: 16px;
      font-weight: 500;
    }
    .flow-chart-item {
      display: flex;
      flex-shrink: 0;
      .flow-chart-content {
        padding: 8px 16px;
        height: 40px;
        position: relative;
        background-color: #5b9bd5;
        border-radius: 5px;
        .flow-chart-subtitle {
          position: absolute;
          width: 80%;
          height: 30px;
          background-color: #5b9bd5;
          font-size: 10px;
          color: rgb(0, 255, 0);
          top: -30px;
          left: 10%;
          text-align: center;
          line-height: 30px;
          border-radius: 5px 5px 0 0;
        }
        .flow-chart-title {
          font-size: 20px;
          font-weight: 900;
        }
      }
      .arrow-align {
        margin-top: 20px;
      }
      .arrow-colums {
        margin-left: -60px;
        margin-top: 30px;
        img {
          height: 80px;
        }
        .flow-data {
          padding: 10px;
          color: #398bff;
          font-size: 20px;
          font-weight: 600;
          margin-left: -20px;
          margin-top: -10px;
        }
      }
    }
  }
  .table-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #244cce;
    .title-table {
      color: rgb(83, 109, 146);
      font-size: 20px;
      font-weight: 600;
      line-height: 48px;
    }
  }
  .item-warp {
    flex: 1;
  }

  .total-chart-warp {
    width: 95%;
    margin: 20px 0;
    display: flex;
    border-radius: 20px;
    box-shadow: 0px 0px 10px #244cce;
  }
  .time-chart-warp {
    width: 95%;
    display: grid;
    // translate: 0 60px;
    grid-template-columns: 3fr 3fr 3fr 3fr 3fr;
  }
}
</style>
