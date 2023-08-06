import { RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    redirect: { name: "Dashboard" },
    component: () => import("@/layouts/common-page.vue"),
    meta: { auth: true, menu: { title: "router.home", icon: "Monitor" } },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: { menu: { title: "router.dashboard" } },
        component: () => import("@/views/HomePage.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "LoginPage",
    meta: { common: true },
    component: () => import("@/views/auth/LoginPage.vue")
  },
  {
    path: "/:any(.*)",
    name: "notFound",
    component: () => import("@/views/errors/404.vue")
  }
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "notFound",
  //   component: () => import("@/views/error/404.vue"),
  //   hidden: true
  // }
  // {
  //   path: "/500",
  //   name: "500",
  //   component: () => import("@/views/error/500.vue"),
  //   hidden: true
  // }
  // {
  //   path: "/403",
  //   name: "403",
  //   component: () => import("@/views/error/403.vue"),
  //   hidden: true
  // }
] as RouteRecordRaw[];

export default routes;
