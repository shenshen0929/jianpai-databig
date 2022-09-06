<template>
  <div
    class="data-warp-container"
    :style="{
      transform: `scale(${scale.width}, ${scale.height})`,
    }"
  >
    <div class="data-warp">
      <div class="sign">
        <div class="english">ARROW</div>
        <div class="chinese">箭牌家居</div>
      </div>
      <div class="date-choose">
        <span class="date-label">时间：</span>
        <el-date-picker
          v-model="dateValue"
          key="data-view"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :picker-options="pickerOptions"
          :clearable="false"
          @change="dateChange"
        ></el-date-picker>
      </div>
      <div class="nav-container">
        <div class="nav-warp">
          <div
            v-for="item in tabNAvList"
            class="nav-router"
            :class="item.path === tabIndex ? 'active' : ''"
            :key="item.path"
            @click="routerHandle(item.path)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="content-warp">
        <keep-alive><router-view /> </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultDate } from "./common";
import moment from "moment";
import { scaleData } from "@/utils/drawMixin";

let timerTab = null;

export default {
  components: {
    // dvFullScreenContainerSelf,
  },
  data() {
    return {
      tabNAvList: [
        {
          path: "totality",
          name: "总体分析",
        },
        {
          path: "brand",
          name: "品牌维度",
        },
        {
          path: "channel",
          name: "渠道维度",
        },
        {
          path: "province",
          name: "省区维度",
        },
        // {
        //   path: "department",
        //   name: "部门维度",
        // },
      ],
      pathArr: ["totality", "brand", "channel", "province"],
      dateValue: "",
      scale: {},
      useDate: {},
      drawTiming: null,
      pickerOptions: {
        disabledDate(time) {
          const year = `${new Date().getFullYear()}-01-01`;
          return moment(time) < moment(year) || moment(time) > moment();
        },
      },
    };
  },
  created() {
    const scale = scaleData();
    this.scale = scale;
    const obj = defaultDate();
    this.useDate = defaultDate();
    this.dateValue = [new Date(obj.start), new Date(obj.end)];
    this.$router.push(`${this.$route.path}?start=${obj.start}&end=${obj.end}`);
  },
  mounted() {
    // let index = this.pathArr.indexOf(this.$route.path.substring(7));
    // timerTab = setInterval(() => {
    //   if (index === 3) {
    //     this.$router.push("/");
    //   } else {
    //     index += 1;
    //     this.$router.push(
    //       `${this.pathArr[index]}?start=${this.useDate.start}&end=${this.useDate.end}`
    //     );
    //   }
    // }, 10000);
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    clearTimeout(timerTab);
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    tabIndex() {
      return this.$route.path.substring(7);
    },
  },
  methods: {
    routerHandle(path) {
      this.$router.push(
        `${path}?start=${this.useDate.start}&end=${this.useDate.end}`
      );
    },
    dateChange(date) {
      const start = moment(date[0]).format("YYYY-MM-DD");
      const end = moment(date[1]).format("YYYY-MM-DD");
      this.$router.replace(`${this.$route.path}?start=${start}&end=${end}`);
      this.useDate = {
        start,
        end,
      };
    },
    resize() {
      clearTimeout(this.drawTiming);
      this.drawTiming = setTimeout(() => {
        const scale = scaleData();
        this.scale = scale;
      }, 200);
    },
  },
};
</script>

<style lang="scss">
.data-warp-container {
  width: 100%;
  height: 100%;
  transform-origin: center 0;
  .data-warp {
    width: 100%;
    height: 100%;
    padding-top: 8px;
    color: #ffffff;
    position: relative;
    .sign {
      position: absolute;
      top: 10px;
      left: 100px;
      color: #596aff;
      .english {
        font-size: 24px;
      }
      .chinese {
        font-size: 20px;
        margin-top: 8px;
      }
    }
    .date-choose {
      position: absolute;
      right: 50px;
      top: 10px;
      .el-date-editor .el-range-separator {
        width: 10%;
      }
      .date-label {
        font-weight: 600;
      }
    }
    .nav-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .nav-warp {
        display: flex;
        width: 40%;
        height: 50px;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;
        font-weight: 700;
        padding: 4px 0;
        .nav-router {
          color: rgba(0, 0, 0, 0.5);
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
        }
        .active {
          color: #ffffff;
          background: rgba(91, 155, 213);
          border-radius: 10px;
        }
      }
    }
    .content-warp {
      width: 100%;
      // height: calc(100vh - 90px);
      .content-container {
        width: 100%;
      }
    }
  }
}
</style>
