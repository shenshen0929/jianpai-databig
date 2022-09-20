<template>
  <div class="step-warp">
    <div class="title">木工开料</div>
    <el-table :data="tableData" :row-class-name="tableRowClassName">
      <el-table-column
        prop="BatchCode"
        label="合批号"
        :formatter="normalFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="DesignNumber"
        label="销售单号"
        :formatter="normalFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="TotalNumber"
        label="套数"
        :formatter="normalFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="SubOrderTypeName"
        label="子工单类型"
        :formatter="normalFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="ProcessID"
        label="生产状态"
        :formatter="processFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="IsUrgent"
        label="是否加急"
        :formatter="isUrgentFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="ReceiveTime"
        label="接单日期"
        :formatter="dateFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="DeliveryTime"
        label="交期时间"
        :formatter="dateFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="processDays"
        label="加工天数"
        :formatter="processDaysFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="MainCorlor"
        label="板材类型和颜色"
        :formatter="normalFormatter"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { orderListApi } from "./api";
import { processNameList } from "./common";
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    orderListApi().then((res) => {
      const step = this.$route.query.step ? +this.$route.query.step : 0;
      const arr = [];
      res.data.forEach((item) => {
        const value = item.ProcessID
          ? item.ProcessID.split(",").map((item) => +item)
          : [0];
        const max = Math.max.apply(null, value);
        if (max === step - 1) {
          arr.push(item);
        }
      });
      console.log(arr);
      this.tableData = arr;
    });
  },
  methods: {
    isUrgentFormatter(row) {
      return row.IsUrgent ? "是" : "否";
    },
    dateFormatter(row, column) {
      return moment(row[column.property]).format("YYYY-MM-DD") || "-";
    },
    processDaysFormatter(row) {
      if (!row.StartTime) "-";
      const days = moment().diff(row.StartTime, "day") || 0;
      return days;
    },
    tableRowClassName({ row }) {
      let str = "";
      if (row.IsUrgent) {
        str += "isUrgent-row";
      }
      if (
        moment(row.DeliveryTime).diff(moment(), "day") < 4 &&
        this.$route.query.step < 4
      ) {
        str += " timeout-row";
      }
      return str;
    },
    normalFormatter(row, column) {
      return row[column.property] ? row[column.property] : "-";
    },
    processFormatter(row) {
      if (!row.ProcessID) return "-";
      const arr = row.ProcessID.split(",").map(
        (item) => processNameList[+item]
      );
      return arr.join(",");
    },
  },
};
</script>

<style lang="scss">
@keyframes scroll {
  0% {
    translate: 0 0;
  }
  100% {
    translate: 0 calc(-100% + 60vh);
  }
}
@function time($height) {
  @return $height / 100vh * 20 + "s";
}
.step-warp {
  padding: 0 5%;
  .title {
    font-size: 4vh;
    font-weight: 700;
    font-family: cursive;
    line-height: 8vh;
    text-align: center;
  }
  .el-table .isUrgent-row {
    color: rgb(255, 32, 32);
  }
  .el-table .timeout-row {
    background: yellow;
  }
  .el-table__body {
    animation: scroll 600s linear infinite;
  }
}
</style>
