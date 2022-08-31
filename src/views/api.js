import { http } from "@/api";

// 总体分析
export const totalData = (data) => {
  return http({
    method: "post",
    url: "/alloeb2201",
    data,
  });
};
export const all_ontime = (data) => {
  return http({
    method: "post",
    url: "/all_ontimeudf07",

    data,
  });
};

// 品牌分析
export const orgnameconfirmDate = (data) => {
  return http({
    method: "post",
    url: "/orgnameconfirmDate",
    data,
  });
};
export const orgname_ontime = (data) => {
  return http({
    method: "post",
    url: "/orgname_ontimeudf07",
    data,
  });
};

// 渠道分析
export const saleschannelconfirmDate = (data) => {
  return http({
    method: "post",
    url: "/saleschannelconfirmDate",
    data,
  });
};
export const saleschannel_ontime = (data) => {
  return http({
    method: "post",
    url: "/saleschannel_ontimeudf07",
    data,
  });
};

// 省份分析
export const proviceconfirmDate = (data) => {
  return http({
    method: "post",
    url: "/proviceconfirmDate",
    data,
  });
};
export const province_ontime = (data) => {
  return http({
    method: "post",
    url: "/province_ontimeudf07",
    data,
  });
};

export const rectangle = (data) => {
  return http({
    method: "post",
    url: "/rectangle",
    data,
  });
};
