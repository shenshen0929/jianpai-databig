import axios from "axios";

const baseURL = "http://172.18.9.20:1124";
export const http = axios.create({
  timeout: 30000,
  baseURL,
});

http.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    const { status, data, statusText } = response;
    if (status === 200) return data;
    else {
      // Message.error(message);
      return Promise.reject(statusText);
    }
  },
  function(error) {
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     jumpLogin();
    //   }
    // }
    // Message.error(error?.response?.data?.message || "服务端异常");
    return Promise.reject(error);
  }
);
