<!-- <template>
  <div class="duration-brand-warp">
    <MoreBarChart
      :cdata="{
        category: MonthItemcategory,
        unit: '%',
        title: '审单是否及时订单数量占比',
        data: mountMonthList,
        legendIsTop: 'bottom',
      }"
    ></MoreBarChart>
    <OneLineChart
      :cdata="{
        category: MonthItemcategory,
        unit: '%',
        title: '定制部审单及时率变化趋势',
        data: rateMonthList,
        legendIsTop: 'bottom',
        name: '准交率',
      }"
    ></OneLineChart>
    <FourLineChart
      :cdata="{
        category: MonthItemcategory,
        unit: '%',
        title: '各订单类型审单及时率变化趋势',
        data: rateMonthTypeList,
      }"
    ></FourLineChart>
  </div>
</template>

<script>
import MoreBarChart from "@/components/new_echarts/bar/more_bar_chart.vue";
import FourLineChart from "@/components/new_echarts/line/more_line_chart.vue";
import OneLineChart from "@/components/new_echarts/line/one-line-chart.vue";
import { MonthItemcategory } from "../common";
export default {
  components: {
    MoreBarChart,
    FourLineChart,
    OneLineChart,
  },
  data() {
    return {
      MonthItemcategory,
      mountMonthList: {
        firstData: {
          name: "生产及时",
          data: [8232, 16004, 14683, 16987, 20732, 8819],
        },
        secondData: {
          name: "生产不及时",
          data: [9963, 5117, 8585, 3291, 5376, 2622],
        },
      },
      rateMonthTypeList: {
        standardOrder: {
          name: "标准订单",
          data: [82, 16, 14, 16, 20, 88],
        },
        noStandardOrder: {
          name: "非标订单",
          data: [99, 51, 85, 32, 53, 26],
        },
        changeFundOrder: {
          name: "改款订单",
          data: [96, 17, 85, 91, 76, 22],
        },
        afterSaleOrder: {
          name: "售后订单",
          data: [63, 57, 58, 39, 57, 62],
        },
        sampleOrder: {
          name: "样品订单",
          data: [93, 17, 55, 29, 56, 22],
        },
      },
      rateMonthList: [31, 43, 45, 47, 54, 57],
    };
  },
};
</script>

<style></style> -->
