// // 屏幕适配 mixin 函数

// // * 默认缩放值
// const scale = {
//   width: "1",
//   height: "1",
// };

// // * 设计稿尺寸（px）
// const baseWidth = 1920;
// const baseHeight = 1080;

// // * 需保持的比例（默认1.77778）
// // const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));

// export default {
//   data() {
//     return {
//       // * 定时函数
//       drawTiming: null,
//     };
//   },
//   mounted() {
//     this.calcRate();
//     window.addEventListener("resize", this.resize);
//   },
//   beforeDestroy() {
//     window.removeEventListener("resize", this.resize);
//   },
//   methods: {
//     calcRate() {
//       const chartRef = this.$refs["chartRef"];
//       if (!chartRef) return;
//       scale.width = (window.innerWidth / baseWidth).toFixed(5);
//       scale.height = (window.innerHeight / baseHeight).toFixed(5);
//       chartRef.style.transform = `scale(${scale.width}, ${scale.height}) tranlate(0,0)`;
//     },
//     resize() {
//       clearTimeout(this.drawTiming);
//       this.drawTiming = setTimeout(() => {
//         this.calcRate();
//       }, 200);
//     },
//   },
// };

export const scaleData = () => {
  const scale = {
    width: "1",
    height: "1",
  };
  const baseWidth = 1920;
  const baseHeight = 1080;
  console.log(window);
  scale.width = (window.outerWidth / baseWidth).toFixed(5);
  scale.height = (window.innerHeight / baseHeight).toFixed(5);
  return scale;
};
