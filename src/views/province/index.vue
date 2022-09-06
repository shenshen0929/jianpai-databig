<template>
  <div class="province-warp">
    <div>
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
      <div>
        <MoreLinerate
          :cdata="{
            category: category,
            unit: '%',
            title: '各省份准交率趋势(出库时间)',
            data: trendList['delivery'],
            lengedType: 'bottom',
            type: 'province',
          }"
        ></MoreLinerate>
      </div>
      <div>
        <MoreLinerate
          :cdata="{
            category: category,
            unit: '%',
            title: '各省份准交率趋势(入库时间)',
            data: trendList['entry'],
            lengedType: 'bottom',
            type: 'province',
          }"
        ></MoreLinerate>
      </div>
    </div>
    <div>
      <Map
        :cdata="{
          title: '各省份入库订单总数量',
          data: countList,
          name: '订单数量',
          total,
        }"
      ></Map>
    </div>
    <div class="total-table-province-warp">
      <div v-for="(item, index) in durationMonthList" :key="index">
        <MoreLineSmall
          :cdata="{
            category: category,
            unit: '天',
            title: '各省份' + stageItemList[index],
            data: item,
            name: '时长',
            lengedType: 'bottom',
          }"
        ></MoreLineSmall>
      </div>

      <div class="table-data">
        <div class="title-table">
          各省份平均总时长(天)
        </div>
        <NumberScroll
          :data="{ tableData: typeDuration, titleItem: provinceCategory }"
        />
      </div>
      <div class="map-bar">
        <OneBarChart
          :cdata="{
            category: sixCountList.category,
            unit: '天',
            data: sixCountList.data,
            name: '订单数量',
            height: 200,
            type: 'province',
          }"
        ></OneBarChart>
      </div>
    </div>
  </div>
</template>

<script>
import OneBarChart from "@/components/charts/one-bar-small-chart";
import MoreLineSmall from "@/components/charts/more-line-small-charts";
import MoreLinerate from "@/components/charts/more-line-rate-charts";
import Map from "@/components/charts/map/chinaMap.vue";
import NumberScroll from "@/components/numberScroll";
import { fontSize } from "./../common";
import { scaleData } from "@/utils/drawMixin";
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
    NumberScroll,
    Map,
    MoreLineSmall,
    MoreLinerate,
  },
  data() {
    return {
      durationList: [],
      tableNumberStyle,
      stageItemList,
      category: [],
      paddingTop: "50px",
      fontSizeNum: "16px",
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
      scale: {},
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
    this.paddingTop = `${fontSize(100)}px`;
    this.fontSizeNum = `${fontSize(16)}px`;
    const scale = scaleData();
    this.scale = scale;
  },
  methods: {
    getProviceconfirmDate(params) {
      proviceconfirmDate(params).then((res) => {
        const data = provinceHandleData(res);
        this.provinceCategory = data.typeCategory;
        this.durationList = data.durationList.splice(3);
        this.category = data.category;
        this.durationMonthList = data.durationMonthList.splice(3);
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
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  box-shadow: 7px 5px 20px #244cce;
  margin-top: 20px;
  padding: 40px 20px 20px 20px;
  background-color: #f6f6f7;
  transform-origin: center 0;
  .duration-province-warp {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .table-data {
    box-shadow: 0px 0px 10px #244cce;
    padding-bottom: 10px;
    margin-top: 10px;
    border-radius: 10px;
  }
}
</style>
