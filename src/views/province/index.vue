<template>
  <div class="province-warp" style="paddingTop: 60px">
    <div class="duration-province-warp">
      <div v-for="(item, index) in durationList" :key="index">
        <OneBarChart
          :cdata="{
            category: provinceCategory,
            unit: '天',
            title: '各省份' + stageItemList[index],
            data: item,
            name: '时长',
          }"
        ></OneBarChart>
      </div>
    </div>
    <div class="bottom-warp">
      <dv-border-box-8>
        <div class="rate-province-warp">
          <div class="map-warp">
            <Map
              :cdata="{
                title: '各省份入库订单总数量',
                data: countList,
                name: '订单数量',
                total,
              }"
            ></Map>
            <div class="map-bar">
              <OneBarChart
                :cdata="{
                  category: sixCountList.category,
                  unit: '天',
                  data: sixCountList.data,
                  name: '订单数量',
                  height: 200,
                }"
              ></OneBarChart>
            </div>
          </div>
          <div class="rate-line-warp">
            <div v-for="(item, key) in trendList" :key="key">
              <FourLineChart
                :cdata="{
                  category: category,
                  unit: '%',
                  title: '各省份准交率趋势' + item.title,
                  data: item,
                  lengedType: 'bottom',
                }"
              ></FourLineChart>
            </div>
          </div>
        </div>
      </dv-border-box-8>
      <div class="duration-line-warp">
        <dv-border-box-1 class="total-chart">
          <div class="total-table-warp">
            <div class="total-table-title" :style="{fontSize: fontSizeNum}">各省份平均总时长(天)</div>
            <div class="total-table">
              <div
                class="total-table-item total-table-item-other"
                v-for="(item, index) in provinceCategory"
                :key="item.title"
              >
                <p class="item-title colorBlue">{{ item }}</p>
                <div>
                  <NumberScroll :number="typeDuration[index]" />
                </div>
              </div>
            </div>
          </div>
        </dv-border-box-1>
        <div v-for="(item, index) in durationMonthList" :key="index">
          <FourLineChart
            :cdata="{
              category: category,
              unit: '天',
              title: '各省份' + stageItemList[index],
              data: item,
              name: '时长',
              lengedType: 'bottom',
            }"
          ></FourLineChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneBarChart from "@/components/new_echarts/bar/one_bar_chart.vue";
import FourLineChart from "@/components/new_echarts/line/more_line_chart.vue";
import Map from "@/components/new_echarts/map/chinaMap.vue";
import NumberScroll from "@/components/numberScroll";
import { fontSize } from "./../common";
import {
  stageItemList,
  provinceList,
  provinceHandleData,
  tableNumberStyle,
  reatOnTimeHandleType,
} from "./../common";
import { proviceconfirmDate, province_ontime, rectangle } from "./../api";
export default {
  components: {
    OneBarChart,
    FourLineChart,
    NumberScroll,
    Map,
  },
  data() {
    return {
      durationList: [],
      tableNumberStyle,
      stageItemList,
      category: [],
       paddingTop: '50px',
       fontSizeNum: '16px',
      provinceList,
      durationMonthList: [],
      // 各省份数量
      countList: [],
      sixCountList: {},
      typeDuration: [],
      total: 0,
      // 准交率趋势
      trendList: {},
      provinceCategory: [],
    };
  },
  watch: {
    $route() {
      this.getProviceconfirmDate(this.$route.query);
      this.getProvince_ontime(this.$route.query);
      this.rectangleHandle(this.$route.query);
    },
  },
  created() {
    this.getProviceconfirmDate(this.$route.query);
    this.getProvince_ontime(this.$route.query);
    this.rectangleHandle(this.$route.query);
    this.paddingTop = `${fontSize(100)}px`
    this.fontSizeNum = `${fontSize(16)}px`
  },
  methods: {
    getProviceconfirmDate(params) {
      proviceconfirmDate(params).then((res) => {
        const data = provinceHandleData(res);
        this.provinceCategory = data.typeCategory;
        this.durationList = data.durationList;
        this.category = data.category;
        this.durationMonthList = data.durationMonthList;
        this.typeDuration = data.typeDuration;
      });
    },
    getProvince_ontime(params) {
      province_ontime(params).then((res) => {
        this.trendList = reatOnTimeHandleType(
          res.map((item) => {
            return {
              [item.province]: item.values,
            };
          })
        );
      });
    },
    rectangleHandle(params) {
      let total = 0;
      rectangle(params).then((res) => {
        const arr = res.sort((a, b) => b.number - a.number);
        const sixCount = {
          category: [],
          data: [],
        };
        this.countList = arr.map((item, index) => {
          if (index < 6) {
            sixCount.data.push(item.number);
            sixCount.category.push(item.province);
          }
          total += item.number;
          return {
            id: index,
            name: item.province,
            value: item.number,
          };
        });
        this.total = total;
        this.sixCountList = sixCount;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./../common.scss";
.province-warp {
  width: 100%;
  padding-left:20px;
  padding-right: 20px;
  .duration-province-warp {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .bottom-warp {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .rate-province-warp {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      .map-warp {
        position: relative;
        .map-bar {
          position: absolute;
          width: 100%;
          // height: 100px;
          bottom: 2vh;
        }
      }
    }
    .rate-line-warp {
      display: grid;
      grid-template-columns: 1fr;
    }
    .duration-line-warp {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .total-table-warp {
    width: 100%;
    height: 90%;
    padding: 20px;
    .total-table-title {
      color: rgb(79, 104, 141);
      font-weight: 600;
      margin-bottom: 1vh;
    }
    .item-title  {
      font-size: 12px;
    }
  }
  .total-chart {
    height: 90%;
  }
}
</style>
