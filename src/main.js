import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dataV from "@jiaminghi/data-view";
import chinaJson from "@/components/new_echarts/map/china.json";
import {
  Loading,
  Message,
  Skeleton,
  skeletonItem,
  DatePicker,
  Carousel,
  carouselItem,
} from "element-ui";
// 引入全局css
import "./assets/scss/style.scss";
// 按需引入vue-awesome图标
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/chart-bar.js";
import "vue-awesome/icons/chart-area.js";
import "vue-awesome/icons/chart-pie.js";
import "vue-awesome/icons/chart-line.js";
import "vue-awesome/icons/align-left.js";

Vue.component(Loading);
Vue.component(Message);
Vue.component(Skeleton.name, Skeleton);
Vue.component(skeletonItem.name, skeletonItem);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Carousel.name, Carousel);
Vue.component(carouselItem.name, carouselItem);
//引入echart
//4.x 引用方式
import echarts from "echarts";

//5.x 引用方式为按需引用
//希望使用5.x版本的话,需要在package.json中更新版本号,并切换引用方式
//import * as echarts from 'echarts'
echarts.registerMap("china", chinaJson);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

// 全局注册

Vue.component("icon", Icon);
Vue.use(dataV);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
