import moment from "moment";

export const defaultMonths = () => {
  const startMoment = moment()
    .subtract(7, "months")
    .startOf("month")
    .format("YYYY-MM-DD");
  const endMoment = moment()
    .subtract(1, "months")
    .startOf("month")
    .format("YYYY-MM-DD");
  return {
    startMoment,
    endMoment,
  };
};

export const stageItemList = [
  "下单-审核平均时长",
  "审核-下达基地平均时长",
  "下达基地-生产平均时长",
  "生产-入库平均时长",
  "入库-出库平均时长",
];
export const MonthItemcategory = ["7月", "8月", "9月", "10月", "11月", "12月"];

export const provinceList = [
  "上海",
  "云南",
  "内蒙古",
  "北京",
  "吉林",
  "四川",
  "天津",
  "宁夏",
  "安徽",
  "山东",
  "山西",
  "广东",
  "广西",
  "新疆",
  "江苏",
  "江西",
  "河北",
  "河南",
  "浙江",
  "海南",
  "湖北",
  "湖南",
  "甘肃",
  "福建",
  "西藏",
  "贵州",
  "辽宁",
  "重庆",
  "陕西",
  "青海",
  "黑龙江",
];

// 计算一个数组或者对象中各个数据的和，如[1,2,3]或者{a:1,b:2}
export const totalizeHandle = (data) => {
  let total = 0;
  if (Array.isArray(data)) {
    total = data.reduce((prev, curr) => prev + curr);
  } else {
    Object.keys(data).forEach((item) => {
      if (typeof data[item] === "number") {
        total += data[item];
      }
    });
  }
  return total;
};

// 数组的数据打乱重新整合
export const arrToMoreArrHandle = (arr) => {
  const onTimeList = []; // 每个月准时数量
  const notOnTimeList = []; // 每个月不准时数量
  arr[0]["及时"].forEach((item, index) => {
    onTimeList.push(totalizeHandle(item));
    notOnTimeList.push(totalizeHandle(arr[1]["不及时"][index]));
  });
};

// 处理总体分析的数据
export const mountHandleTotal = (arr) => {
  const category = getCategory(arr);
  const mountData = {
    enter: {
      name: "入库数量",
      data: [],
    },
    out: { name: "出库数量", data: [] },
  };
  let monthdurationData = stageItemList.map(() => []);
  let enterTotal = 0;
  let outTotal = 0;
  let totalTime = 0;
  let everyStepTime = [0, 0, 0, 0, 0];
  arr.forEach((item, index) => {
    monthdurationData = monthdurationData.map((every, num) => {
      const time = item[`time${num + 1}`];
      every[index] = time;
      everyStepTime[num] += time;
      return every;
    });
    enterTotal += item["num4"];
    outTotal += item["num5"];
    mountData.enter.data.push(item["num4"]);
    mountData.out.data.push(item["num5"]);
  });
  totalTime = everyStepTime.reduce((pre, cur) => pre + cur);
  const outTimePercent =
    Math.round((everyStepTime[4] / totalTime) * 10000) / 100 + "%";
  const enterTimePercent =
    Math.round((everyStepTime[3] / totalTime) * 10000) / 100 + "%";
  everyStepTime = everyStepTime.map(
    (item) => Math.round((item / category.length) * 100) / 100
  );
  totalTime = Math.round((totalTime / category.length) * 100) / 100;
  return {
    mountData,
    monthdurationData,
    everyStepTime,
    tableData: [
      `${enterTotal}`,
      `${outTotal}`,
      `${totalTime}`,
      enterTimePercent,
      outTimePercent,
    ],
  };
};

export const getCategory = (arr) => {
  return arr.map((item) => {
    const month = moment(item.confirmDate).month();
    return month + 1 + "月";
  });
};

export function fontSize(res) {
  const scale = 1920/1080
  const clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
    console.log(window)
  if (!clientWidth) return;
  if ((window.screen.width / window.screen.height) === scale) {
    return res
  }
  let fontSize = clientWidth / 1920;
  return res * fontSize;
}

export const tableNumberStyle = {
  toFixed: 2,
  textAlign: "left",
  content: "{nt}",
  animationFrame: 100,
  style: {
    fontSize: fontSize(20),
  },
};

// 处理各维度数据 stageItemList
export const getDimensionData = (arr) => {
  const typeCategory = arr.map((item) => Object.keys(item)[0]);
  const durationList = [];
  const category = getCategory(arr[0][typeCategory[0]]);
  const enterMount = [];
  const outMount = [];
  let typeMound = [];
  const durationMonthList = [1, 2, 3, 4, 5].map((item) => {
    const obj = {};
    const duration = [];
    typeCategory.forEach((every, index) => {
      obj[every] = {
        name: every,
        data: [],
      };

      let arrItem = 0;
      category.forEach((month, a) => {
        arrItem += arr[index][every][a][`time${item}`];
        obj[every].data.push(arr[index][every][a][`time${item}`]);
      });
      duration.push(Math.round((arrItem / category.length) * 100) / 100);
    });
    durationList.push(duration);
    return obj;
  });

  arr.forEach((item, a) => {
    let enterTotal = 0;
    let outTotal = 0;
    item[typeCategory[a]].forEach((every) => {
      enterTotal += every[`num${4}`];
      outTotal += every[`num${5}`];
    });
    enterMount.push(enterTotal);
    outMount.push(outTotal);
  });

  const countList = {
    outMount: {
      name: "出库库数量",
      data: outMount,
    },
    enterMount: {
      name: "入库数量",
      data: enterMount,
    },
  };

  const enterTotal = enterMount.reduce((pre, cur) => pre + cur);

  const typeDuration = arr.map((every, index) => {
    let duration = 0;
    durationList.forEach((item) => {
      duration += item[index];
    });
    typeMound = enterMount.map(
      (item) => Math.round((item / enterTotal) * 100) + "%"
    );
    return Math.round(duration * 100) / 100;
  });

  return {
    typeCategory,
    durationMonthList,
    durationList,
    countList,
    typeDuration,
    typeMound,
    category,
  };
};

// 处理总体分析的准时率
export const reatOnTimeHandleTotal = (arr) => {
  const outRate = [];
  const inRate = arr.map((item) => {
    outRate.push(rateNumHandle(item.ontimebyout, item.notontimebyout));
    return rateNumHandle(item.ontimebyin, item.notontimebyin);
  });
  return {
    out: {
      name: "出库",
      data: outRate,
    },
    in: {
      name: "入库",
      data: inRate,
    },
  };
};

const rateNumHandle = (onTime, noTime) => {
  return Math.round((onTime / (noTime + onTime)) * 10000) / 100;
};

// 处理各维度分析的准时率
export const reatOnTimeHandleType = (arr) => {
  const typeCategory = arr.map((item) => Object.keys(item)[0]);
  const outData = {};
  const inData = {};
  arr.forEach((item, index) => {
    const outArr = [];
    const inArr = [];
    item[typeCategory[index]].forEach((every) => {
      outArr.push(rateNumHandle(every.ontimebyout, every.notontimebyout));
      inArr.push(rateNumHandle(every.ontimebyin, every.notontimebyin));
    });
    outData[typeCategory[index]] = {
      name: typeCategory[index],
      data: outArr,
    };
    inData[typeCategory[index]] = {
      name: typeCategory[index],
      data: inArr,
    };
  });
  return {
    delivery: { ...outData, title: "(出库时间)" },
    entry: { ...inData, title: "(入库时间)" },
  };
};

// 处理省份的时长数据
export const provinceHandleData = (arr) => {
  return getDimensionData(
    arr.map((item) => ({ [item.province]: item.values }))
  );
};

export const skeletonStyle = {
  padding: "60px",
  // background: "red",
};

export const defaultDate = () => {
  const start = moment()
    .add(-6, "months")
    .startOf("month")
    .format("YYYY-MM-DD");
  const end = moment()
    .add(-1, "months")
    .startOf("month")
    .format("YYYY-MM-DD");
  return {
    start,
    end,
  };
};

