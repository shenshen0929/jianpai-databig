import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index/index.vue"),
  },
  {
    path: "/datav",
    name: "datav",
    component: () => import("../views/index.vue"),
    redirect: "/datav/totality",
    children: [
      {
        path: "totality",
        component: () => import("../views/totality/index.vue"),
      },
      {
        path: "brand",
        component: () => import("../views/brand/index.vue"),
      },
      {
        path: "channel",
        component: () => import("../views/channel/index.vue"),
      },
      {
        path: "department",
        component: () => import("../views/department/index.vue"),
      },
      {
        path: "province",
        component: () => import("../views/province/index.vue"),
      },
    ],
  },
];
const router = new VueRouter({
  routes,
});

export default router;
