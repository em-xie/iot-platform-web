import { BasicResult } from "#/resultType";
import { useMessage } from "@/hooks/useMessage";
import { UserInfo } from "@/model/user";
import { http } from "@/utils/http";

enum API {
  FETCH_USER_INFO = "/system/user/getInfo",
  FETCH_EDITOR_INFO = "/user/editor",
  FETCH_ROUTER_INFO = "/user/route",
  USER_LOGIN = "/auth/login",
  USER_LOGOUT = "/auth/logout",
  CHANGE_USER_STATUS = "/system/user/changeStatus",
  INSTER_AUTH_ROLES = "/system/user/authRole"
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
      console.log(res);
      if (res.code === 500) {
        useMessage("error", res.msg);
      } else {
        resolve(res);
      }
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

export const changStatusApi = (userId: string | number, status: string) => {
  const data = {
    userId,
    status
  };
  return new Promise<BasicResult<{}>>(async (resolve, reject) => {
    try {
      const res = await http.put<{}, BasicResult<{}>>(API.CHANGE_USER_STATUS, {
        data,
        headers: {
          "Content-Type": "application/json"
        }
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const insertAuthRole = (userId: string | number, roleIds: []) => {
  const data = {
    userId,
    roleIds
  };
  console.log(data);
  return new Promise<BasicResult<{}>>(async (resolve, reject) => {
    try {
      const res = await http.post<{}, BasicResult<{}>>(API.INSTER_AUTH_ROLES, {
        data,
        headers: {
          "Content-Type": "application/json"
        }
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
