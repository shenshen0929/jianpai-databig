<template>
  <div class="total-table total-table-warp">
    <div
      :class="
        index % 2 === 0
          ? 'total-table-item'
          : 'total-table-item total-table-item-other'
      "
      v-for="(item, index) in dataList['tableData']"
      :key="item"
    >
      <div class="colorBlue item-title">{{ dataList["titleItem"][index] }}</div>
      <div>
        <NumberScroll :number="item" />
      </div>
    </div>
  </div>
</template>

<script>
import NumberScroll from "./number.vue";
import { scaleData } from "@/utils/drawMixin";
export default {
  components: {
    NumberScroll,
  },
  props: ["data"],
  data() {
    return {
      dataList: [],
      scale: {},
    };
  },
  created() {
    const scale = scaleData();
    this.scale = scale;
  },
  watch: {
    data(newData) {
      this.dataList = newData;
    },
  },
};
</script>

<style lang="scss">
.total-table-warp {
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .total-table-item {
    width: 200px;
    font-size: 20px;
    .item-title {
      line-height: 40px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
