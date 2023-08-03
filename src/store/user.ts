import { fetchInfo, ILoginForm, userLogin, logoutApi } from "@/api/user";
// import permissionService from "@/hooks/usePermission";
// import { RouteOption } from "@/model/user";
import { removeToken, setToken } from "@/utils/auth";
// import { isNull } from "@/utils/is";
import { defineStore } from "pinia";

export const userStore = defineStore("user", () => {
  // const info = ref<Partial<UserInfo>>({});
  // const addRoutes = ref<RouteOption>({});
  // const avatar = computed(() => {
  //   return isNull(info.value!.user?.avatar)
  //     ? "../../src/assets/img/avatar.jpg"
  //     : info.value!.user?.avatar;
  // });
  // const isEmpty = computed(() => {
  //   return info === null;
  // });
  // const permission = computed(() => {
  //   return info.value?.user?.roles[0].roleKey;
  // });
  // const roleList = computed(() => {
  //   return info.value?.user?.roles;
  // });
  const name = ref("");
  const nickname = ref("");
  const userId = ref<string | number>("");
  const avatar = ref("");
  const roleList = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const permission = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  async function getUserInfo() {
    // const permissions = permissionService.defaultPermission;

    // if (permissions.value === "admin") {
    //   ({ data } = await fetchAdminInfo());
    // } else  {
    //   ({ data } = await fetchEditorInfo());
    // }
    const res = await fetchInfo();
    // console.log(res);
    if (res.code === 200) {
      const data = res.data;
      const user = data.user;
      const profile =
        user.avatar == "" || user.avatar == null ? "../../src/assets/img/avatar.jpg" : user.avatar;

      if (data.roles && data.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        // roleList.value = user.roles[0].roleSort;
        roleList.value = data.roles;
        permission.value = data.permissions;
      } else {
        roleList.value = ["guest"];
      }
      name.value = user.userName;
      nickname.value = user.nickName;
      avatar.value = profile;
      userId.value = user.userId;
    }
    return Promise.resolve(res);
  }
  async function login(loginParam: ILoginForm, success: () => void, error: (err: any) => void) {
    try {
      const {
        data: { access_token }
      } = await userLogin(loginParam);
      if (access_token) {
        setToken(access_token);
        await getUserInfo();
        success();
      } else {
        throw "获取token失败";
      }
    } catch (err) {
      error(err);
    }
  }

  // 注销
  const logout = async (): Promise<void> => {
    await logoutApi();
    removeToken();
    roleList.value = [];
    permission.value = [];
  };

  return {
    // info,
    nickname,
    avatar,
    // isEmpty,
    permission,
    roleList,
    login,
    getUserInfo,
    logout,
    // addRoutes,
    name,
    userId
  };
});
