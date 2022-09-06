<!-- <template>
  <div class="department-warp">
    <dv-border-box-6>
      <div class="every-column-warp">
        <div class="every-column-title">定制部审单及时数据分析</div>
        <CustomDepartment @getData="customizationHandle"></CustomDepartment>
      </div>
    </dv-border-box-6>
    <dv-border-box-7>
      <div class="every-column-warp">
        <div class="every-column-title">P<br />M<br />C部排产及时数据分析</div>
        <CustomDepartment></CustomDepartment>
      </div>
    </dv-border-box-7>
    <dv-border-box-6>
      <div class="every-column-warp">
        <div class="every-column-title">生产部生产及时数据分析</div>
        <CustomDepartment></CustomDepartment>
      </div>
    </dv-border-box-6>
    <dv-border-box-6>
      <div class="total-table-warp">
        <div>
          <div class="total-table-title">各订单类型订单数量</div>
          <div class="total-table">
            <div
              class="total-table-item"
              v-for="item in orderTypeMount"
              :key="item.title"
            >
              <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
              <div>
                <dv-digital-flop
                  class="dv-dig-flop ml-1 mt-2 pl-3"
                  :config="item.number"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="total-table-title">各订单类型订单数量占比(%)</div>
          <div class="total-table">
            <div
              class="total-table-item"
              v-for="item in orderTypeMount"
              :key="item.title"
            >
              <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
              <div>
                <dv-digital-flop
                  class="dv-dig-flop ml-1 mt-2 pl-3"
                  :config="item.number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-6>
  </div>
</template>

<script>
import CustomDepartment from "./custom.vue";
export default {
  components: {
    CustomDepartment,
  },
  data() {
    return {
      orderTypeMount: [
        {
          title: "标准订单",
          number: {
            number: [18.69],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "非标准订单",
          number: {
            number: [19.81],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "改款订单",
          number: {
            number: [22.25],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "售后订单",
          number: {
            number: [22.25],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "样品订单",
          number: {
            number: [22.25],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
      ],
      customizationData: {},
      category: [],
    };
  },
  created() {
    this.customizationHandle();
  },
};
</script>

<style lang="scss">
.department-warp {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 1fr;
  padding: 75px 20px 20px;
  .every-column-warp {
    display: grid;
    grid-template-columns: 1fr 12fr;
    .every-column-title {
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(240, 113, 113);
      font-size: 24px;
      line-height: 36px;
      font-weight: 700;
      padding-left: 20px;
    }
  }
  .duration-brand-warp {
    display: grid;
    grid-template-columns: 1fr;
  }
  .rate-brand-warp {
    display: grid;
    grid-template-columns: 4fr 3fr 3fr 5fr;
  }
  .total-table-warp {
    width: 100%;
    height: 90%;
    padding: 25px;

    .total-table-title {
      padding-top: 50px;
      color: rgb(79, 104, 141);
      font-size: 18px;
      font-weight: 600;
      text-align: center;
    }
  }
  .total-table {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    .total-table-item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 50%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
}
</style> -->
