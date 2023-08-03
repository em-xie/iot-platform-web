import { RouteRecordRaw } from "vue-router";
export default {
  name: "System",
  path: "/system",
  component: () => import("@/layouts/common-page.vue"),
  meta: { auth: true, menu: { title: "router.system", icon: "user" } },
  children: [
    {
      name: "user",
      path: "user",
      component: () => import("@/views/system/user/index.vue"),
      meta: {
        menu: { title: "router.user", icon: "user" }
      }
    }
  ]
} as RouteRecordRaw;
