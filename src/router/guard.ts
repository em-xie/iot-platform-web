import { userStore } from "@/store/user";
import { getToken } from "@/utils/auth";
import redirectService from "@/hooks/useRedirect";
import { RouteLocationNormalized, Router } from "vue-router";
import NProgress from "@/utils/progress";
import autoload from "./autoload";
import { useMessage } from "@/hooks/useMessage";
// import user from "mock/user";

class Guard {
  constructor(private router: Router) {}

  public run() {
    this.router.beforeEach(this.beforeEach.bind(this));
    this.router.afterEach(this.afterEach.bind(this));
  }

  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const userState = userStore();
    NProgress.start();

    if (to.meta.auth && !this.token()) {
      redirectService.addRedirect(to.name as unknown as string);
      console.log(1111);
      return { name: "LoginPage" };
    }

    if (from.name === "LoginPage") {
      console.log(2222);
      await autoload(this.router);
    }
    if (this.token() && userState.roleList[0] == null) {
      console.log(3333);
      const res = await userState.getUserInfo();
      // console.log(res);
      if (res?.code === 401) {
        useMessage("error", res.msg + ",请重新登录");
        userState.roleList[0] = "guest";
        // await autoload(this.router);
        // this.router.push("/login");
        // return { name: "404" };
        // this.router.push({ path: "login" });
      } else {
        console.log(4444);
        await autoload(this.router);
      }
    }
    // console.log(userState.permission);
    if (userState.roleList) {
      const permissions = to.meta.permissions;
      // console.log(permissions);
      if (permissions && !permissions.includes(userState.roleList[0])) {
        console.log(5555);
        return { name: "404" };
      }
    }
    if (to.meta.guest && this.token()) {
      console.log(6666);
      return from;
    }
  }

  private async afterEach() {
    NProgress.done();
  }

  private token(): string | null {
    return getToken();
  }
}

export default (router: Router) => {
  new Guard(router).run();
};
