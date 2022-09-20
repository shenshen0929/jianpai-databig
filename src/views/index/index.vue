<template>
  <div class="index-warp">
    <h1>
      A&nbsp;&nbsp;R&nbsp;&nbsp;R&nbsp;&nbsp;O&nbsp;&nbsp;W&nbsp;&nbsp;&nbsp;&nbsp;箭&nbsp;&nbsp;&nbsp;牌&nbsp;&nbsp;&nbsp;家&nbsp;&nbsp;&nbsp;居
    </h1>
    <div class="contruduction-warp">
      <el-carousel height="40vh">
        <el-carousel-item v-for="item in imageList" :key="item">
          <div class="pic-warp">
            <img :src="item" alt="图片" />
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="content-warp">
        <div class="content-block">
          <h2>箭牌家居生活智慧</h2>
          <p class="content">
            箭牌家居集团股份有限公司旗下品牌
            ARROW箭牌，1994年创建于广东佛山，拥有十大生产制造基地（2个在建），以“箭牌家居
            生活智慧”为品牌主张，是全球具有实力和影响力的综合性家居品牌，也是中国规模较大的建筑卫生陶瓷制造与销售企业之一，产品及服务包括智能卫浴、瓷砖、橱衣柜、定制家居等智能家居品类。
          </p>
          <p class="content">
            ARROW箭牌家居以卫生陶瓷起步，产品线不断丰富，品类随之完善。1998年开始制造浴缸、淋浴房，2005年涉足浴室柜，2006年又独立开发生产五金水暖，包括龙头、花洒、五金挂件等产品；2006年涉足感应器、智能座便器领域。2007年，为顺应家居装饰潮流，为顾客提供更完善、全面的整体家居空间解决方案、实现瓷砖与卫浴产品全配套，ARROW箭牌开启瓷砖品类建设之路。2010年ARROW箭牌橱柜、2012年ARROW箭牌家居定制相继成立，标志着“ARROW箭牌家居”正式迈入“大家居时代”和“定制化时代”。
          </p>
          <p class="content">
            如今，ARROW箭牌家居产品被广泛应用于国内外地标建筑和高端住宅，成为碧桂园、中国恒大、融创中国、中海地产、华润置地、金地集团等百强地产合作伙伴。未来，ARROW箭牌家居将秉承“改善人们的卫浴生活品质”和“创新人们的智慧生活空间”的核心价值，致力于成为国际一流的智慧家居品牌。
          </p>
          <h2>
            改善人们的卫浴生活品质
          </h2>
          <p>
            自创立伊始，ARROW箭牌就致力于“改善人们的卫浴生活品质”，以品质和价值提升人们的家居幸福感，且在品牌几十年变迁中始终坚守不渝。如今，从卫浴空间到整体智慧家居空间，ARROW箭牌以节水、洁净、智能、品质为核心目标，聚焦健康生活品质、秉持高度人文关怀，为消费者打造更舒适的卫浴生活体验。
          </p>
          <h2>
            创新人们的智慧生活空间
          </h2>
          <p>
            ARROW箭牌以多元智慧创新人们的生活空间，从人文智慧、设计智慧、制造智慧到智能科技，聚焦科技创新、潜心技术研发，以卫浴、瓷砖、定制家居等多样性家居品类，为消费者提供超越传统的创新产品和服务，让更多家庭体验智能生活的无限未来。
          </p>
        </div>
      </div>
    </div>
    <div class="flow-warp">
      <div class="flow-warp-content">
        <div
          class="flow-every"
          :style="
            `border-top: ${item.color} solid  1.5vw;
        border-left: ${item.color} solid  1.5vw;`
          "
          :class="index % 2 === 0 ? 'odd' : 'even'"
          v-for="(item, index) in flowTitle"
          :key="item.color"
        >
          <div class="flow-title" :style="`background-color: ${item.color};`">
            {{ item.title }}
          </div>
          <div
            class="flow-arrow"
            v-if="index > 0"
            :style="`border-top: 1vw solid ${flowTitle[index - 1].color};`"
          ></div>
          <div
            class="flow-arrow flow-arrow-last"
            v-if="index === flowTitle.length - 1"
            :style="`border-top: 1vw solid ${item.color};`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let timerRoute = null;
import { scaleData } from "@/utils/drawMixin";
export default {
  data() {
    return {
      imageList: [],
      scale: {},
      flowTitle: [
        {
          title: "开料",
          color: "rgb(108, 104, 140)",
        },
        {
          title: "封边",
          color: "rgb(66, 98, 130)",
        },
        {
          title: "排钻",
          color: "rgb(246, 113, 103)",
        },
        {
          title: "拣配",
          color: "rgb(254, 193, 113)",
        },
        {
          title: "组装",
          color: "rgb(131, 200, 175)",
        },
        {
          title: "包装",
          color: "rgb(167, 120, 200)",
        },
        {
          title: "入库",
          color: "rgb(160, 100, 150)",
        },
      ],
    };
  },
  mounted() {
    // timerRoute = setTimeout(() => {
    //   this.$router.push("/datav");
    // }, 50000);
  },
  beforeDestroy() {
    clearInterval(timerRoute);
  },
  created() {
    const scale = scaleData();
    this.scale = scale;
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(require(`@/assets/lb_${i + 1}.png`));
    }
    this.imageList = arr;
  },
};
</script>

<style lang="scss">
@keyframes scroll {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: -50vh;
  }
}

.index-warp {
  color: #000000;
  padding: 30px;
  transform-origin: center 0;
  h1 {
    text-align: center;
    font-size: 45px;
    padding-bottom: 30px;
    color: #3f4faa;
    margin-bottom: 1vw;
    text-shadow: 4px 4px 3px #92c5dd;
  }
  .contruduction-warp {
    display: flex;
    justify-content: space-around;
    .el-carousel {
      // box-shadow: 7px 5px 30px #aec0c9;
      transform-origin: center 0;
      width: 60vh;
      .el-carousel__indicators--horizontal {
        top: 0;
        .el-carousel__button {
          width: 2vh;
        }
      }
      .pic-warp {
        display: flex;
        align-items: center;
        justify-content: center;
        // width: 100%;
        // height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .content-warp {
      padding: 30px;
      font-size: 22px;
      line-height: 44px;
      height: 40vh;
      width: 50vw;
      overflow: hidden;
      box-shadow: 0px 0px 10px #244cce;
      border-radius: 10px;
      .content-block {
        animation: scroll 20s linear infinite;
        color: #074597;
        font-family: fantasy;
        h2 {
          margin-top: 30px;
        }
        p {
          margin-top: 15px;
          text-indent: 2em;
        }
        &:hover {
          animation-play-state: paused;
          // overflow-y: scroll;
          height: 50vh;
        }
      }
    }
  }
  .flow-warp {
    width: 100vw;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
    .flow-warp-content {
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 10px #244cce;
      padding: 2vw 2vw 2vw 3vw;
      border-radius: 10px;
    }
    .flow-every {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12vw;
      height: 12vw;
      border: rgb(108, 104, 140, 0) solid 1.5vw;
      margin-left: -1.5vw;
      border-radius: 50%;
      position: relative;
      .flow-arrow {
        position: absolute;
        height: 0;
        width: 0;
        border: rgb(108, 104, 140, 0) solid 1.5vw;
      }
      .flow-title {
        width: 70%;
        height: 70%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: 600;
        color: #ffffff;
      }
    }
    .odd {
      transform: rotate(45deg);
      .flow-title {
        transform: rotate(-45deg);
      }
      .flow-arrow {
        left: -1.2vw;
        bottom: 0;
        transform: rotate(135deg);
      }
    }
    .even {
      transform: rotate(-135deg);
      .flow-title {
        transform: rotate(135deg);
      }
      .flow-arrow {
        right: 0;
        top: -1.1vw;
        transform: rotate(135deg);
      }
    }
    .flow-arrow-last {
      top: 0;
      left: 7.4vw !important;
      transform: rotate(-45deg) !important;
    }
  }
}
</style>
