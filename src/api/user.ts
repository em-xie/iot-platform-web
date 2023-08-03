import { BasicResult } from "#/resultType";
import { UserInfo } from "@/model/user";
import { http } from "@/utils/http";

enum API {
  FETCH_USER_INFO = "/system/user/getInfo",
  FETCH_EDITOR_INFO = "/user/editor",
  FETCH_ROUTER_INFO = "/user/route",
  USER_LOGIN = "/auth/login",
  USER_LOGOUT = "/auth/logout"
}
// pc端固定客户端授权id
const clientId = "e5cd7e4891bf95d1d19206ce24a7b32e";
export interface ILoginForm {
  username?: string;
  password?: string;
  socialCode?: string;
  socialState?: string;
  source?: string;
  clientId: string;
  grantType: string;
}
// /**
//  *
//  * @description 获取用户信息（权限为管理员）
//  */
// export const fetchAdminInfo = () => {
//   return new Promise<BasicResult<UserInfoModel>>(async (resolve, reject) => {
//     try {
//       const res = await http.get<{}, BasicResult<UserInfoModel>>(API.FETCH_USER_INFO);
//       resolve(res);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// /**
//  *
//  * @description 获取用户信息（权限为普通）
//  */
// export const fetchEditorInfo = () => {
//   return new Promise<BasicResult<UserInfoModel>>(async (resolve, reject) => {
//     try {
//       const res = await http.get<{}, BasicResult<UserInfoModel>>(API.FETCH_USER_INFO);
//       resolve(res);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

/**
 *
 * @description 获取用户信息
 */
export const fetchInfo = () => {
  return new Promise<BasicResult<UserInfo>>(async (resolve, reject) => {
    try {
      const res = await http.get<{}, BasicResult<UserInfo>>(API.FETCH_USER_INFO);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 *
 * @description 登录
 */
export const userLogin = (data: ILoginForm) => {
  const params = {
    ...data,
    clientId: data.clientId || clientId,
    grantType: data.grantType || "password"
  };
  return new Promise<BasicResult<{ access_token: string }>>(async (resolve, reject) => {
    try {
      const res = await http.post<{}, BasicResult<{ access_token: string }>>(API.USER_LOGIN, {
        data: params,
        headers: {
          isToken: false,
          isEncrypt: false,
          "Content-Type": "application/json"
        }
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const logoutApi = () => {
  return new Promise<BasicResult<{}>>(async (resolve, reject) => {
    try {
      const res = await http.post<{}, BasicResult<{}>>(API.USER_LOGOUT, {});
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
