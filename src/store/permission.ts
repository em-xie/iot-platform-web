import { defineStore } from "pinia";
import { RouteMeta } from "vue-router";
export const permissionStore = defineStore("permission", () => {
  const addRoutes = ref<RouteMeta[]>([]);
  return { addRoutes };
});
export default permissionStore;
