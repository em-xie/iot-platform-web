import { RouteRecordRaw } from "vue-router";

export default {
  name: "permission",
  path: "/permission",
  component: () => import("@/layouts/common-page.vue"),
  meta: { auth: true, menu: { title: "router.permission", icon: "Lock" } },
  children: [
    {
      name: "edit",
      path: "edit",
      component: () => import("@/views/permission/Editor.vue"),
      meta: { menu: { title: "router.normal" }, permissions: ["editor", "superadmin"] }
    },
    {
      name: "admin",
      path: "admin",
      component: () => import("@/views/permission/Admin.vue"),
      meta: { menu: { title: "router.extra" }, permissions: ["superadmin"] }
    },
    {
      name: "button",
      path: "button",
      component: () => import("@/views/permission/Button.vue"),
      meta: { menu: { title: "router.button" }, permissions: ["editor", "superadmin"] }
    }
  ]
} as RouteRecordRaw;
