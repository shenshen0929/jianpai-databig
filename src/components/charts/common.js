export const propsHandleData = (newData, type) => {
  const legendData = [];
  const seriesData = [];

  if (newData && newData.data) {
    Object.keys(newData.data).forEach((item) => {
      const isShowData =
        newData.data[item].name === "箭牌" ||
        newData.data[item].name === "零售" ||
        newData.data[item].name === "出库";
      seriesData.push({
        type: type,
        data: newData.data[item].data,
        name: newData.data[item].name,
        label: {
          show: isShowData ? true : false,
          position: "bottom",
        },
      });
      legendData.push(newData.data[item].name);
    });
  }
  return {
    legendData,
    seriesData,
  };
};

export const colorList = [
  "#2d8cf0",
  "#19be6b",
  "#ff9900",
  "#E46CBB",
  "#9A66E4",
  "#ed3f14",
];

export function fontSize(res) {
  const scale = 1920 / 1080;
  const clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!clientWidth) return;
  if (window.screen.width / window.screen.height === scale) {
    return res;
  }
  // let fontSize = clientWidth / 1920;
  return res;
}
