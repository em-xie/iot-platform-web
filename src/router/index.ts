import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import autoload from "./autoload";
import guard from "./guard";
import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes]
});

export async function setupRouter(app: App) {
  await autoload(router);
  guard(router);
  app.use(router);
}

// export const resetRoute = (router: { matcher: any }) => {
//   const routers = createRouter({
//     history: createWebHashHistory(),
//     routes: [...routes]
//   });
//   // 用初始化的matcher替换当前router的matcher
//   const newRouter = routers;
//   router.matcher = newRouter;
// };

export default router;
