import { BasicResult } from "#/resultType";
import { http } from "@/utils/http";

enum API {
  CHANGE_ROLE_STATUS = "/system/role/changeStatus"
}

export const changStatusApi = (roleId: string | number, status: string) => {
  const data = {
    roleId,
    status
  };
  return new Promise<BasicResult<{}>>(async (resolve, reject) => {
    try {
      const res = await http.put<{}, BasicResult<{}>>(API.CHANGE_ROLE_STATUS, {
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
