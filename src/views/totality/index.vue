<template>
  <div class="total-warp" :style="{paddingTop: paddingTop}">
    <!-- 时长流程图 -->
    <div class="show-flow-button" @click="showFlowChartHandle">
      {{ isShowFlowChart ? "收起" : "展开" }}流程图
    </div>
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
      <div>
        <dv-border-box-12 :class="isShowFlowChart ? 'normal' : 'big'">
          <CenterLeft
            :cdata="{ data: mountData, category, title: '订单数量变化' }"
          />
        </dv-border-box-12>
      </div>
      <div>
        <dv-border-box-1 :class="isShowFlowChart ? 'normal' : 'big'">
          <div class="total-table total-table-warp">
            <div
              :class="
                index % 2 === 0
                  ? 'total-table-item'
                  : 'total-table-item total-table-item-other'
              "
              v-for="(item, index) in titleItem"
              :key="item"
            >
              <p class="colorBlue item-title">{{ item }}</p>
              <div>
                <NumberScroll :number="tableData[index]" />
              </div>
            </div>
          </div>
        </dv-border-box-1>
      </div>
      <dv-border-box-12 :class="isShowFlowChart ? 'normal' : 'big'">
        <div>
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
      </dv-border-box-12>
    </div>
    <!--各阶段时长-->
    <div class="time-chart-warp">
      <div
        v-for="(item, index) in monthdurationData"
        :key="index"
        :class="isShowFlowChart ? 'normal' : 'bigLine'"
      >
        <CenterRight
          :cdata="{
            data: item,
            category: category,
            unit: '天',
            title: stageItemList[index],
            name: '时长',
          }"
        ></CenterRight>
      </div>
    </div>
  </div>
</template>

<script>
import CenterLeft from "@/components/new_echarts/bar/more_bar_chart.vue";
import CenterRight from "@/components/new_echarts/line/one-line-chart.vue";
import MoreLineChart from "@/components/new_echarts/line/more_line_chart.vue";
import NumberScroll from "@/components/numberScroll";
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
    CenterLeft,
    CenterRight,
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
       paddingTop: '50px',
       fontSizeNum: '16px',
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
    this.getTotalData(this.$route.query);
    this.getAll_ontime(this.$route.query);
    this.paddingTop = `${fontSize(100)}px`
    this.fontSizeNum = `${fontSize(16)}px`
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
 padding-left:20px;
  padding-right: 20px;
  width: 100%;
  height: 100%;
  .show-flow-button {
    position: absolute;
    top: 50px;
    left: 2%;
    font-size: 16px;
    color: black;
    font-weight: 600;
    background: #fff;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
  }
  .big {
    transform: scale(1, 1.5) translateY(1vh);
    transform-origin: left top;
  }
  .bigLine {
    transform: scale(1, 1.5) translateY(13.5vh);
  }
  .normal {
    transform: scale(1, 1);
  }

  .flow-chart-warp {
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin-top: 30px;
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
          padding:10px;
          color: #398bff;
          font-size: 20px;
          font-weight: 600;
          margin-left: -20px;
          margin-top: -10px;
        }
      }
    }
  }
  .total-chart-warp {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .total-table-warp {
    width: 100%;
    height: 90%;
    padding: 20px;
    .item-title  {
      font-size: 12px;
    }
  }
  .time-chart-warp {
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr 3fr;
  }
}
</style>
