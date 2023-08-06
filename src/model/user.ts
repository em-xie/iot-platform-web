// export interface UserInfoModel {
//   avatar: string;
//   permission: string;
//   roleList: string[];
//   id: number;
//   name: string;
//   sex: number;
//   email: string;
//   real_name?: any;
//   home?: any;
//   weibo?: any;
//   wechat?: any;
//   github?: any;
//   qq?: any;
//   wakatime?: any;
//   email_verified_at: string;
//   mobile_verified_at?: any;
//   created_at: string;
//   updated_at: string;
//   lock?: any;
//   credit1?: any;
//   credit2?: any;
//   credit3?: any;
//   credit4?: any;
//   credit5?: any;
//   credit6?: any;
//   favour_count: number;
//   favorite_count: number;
//   roles: IRole[];
// }

export interface UserInfo {
  user: UserVO;
  roles: string[];
  permissions: string[];
}

export interface UserVO {
  userId: string | number;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  remark: string;
  roles: RoleVO[];
  roleIds: any;
  postIds: any;
  roleId: any;
  admin: boolean;
  createBy?: any;
  createDept?: any;
  createTime?: string;
  updateBy?: any;
  updateTime?: any;
}

// interface IRole {
//   id: number;
//   name: string;
//   title: string;
//   guard_name: string;
//   created_at: string;
//   updated_at: string;
//   permissions: IPermission[];
// }

// interface IPermission {
//   id: number;
//   name: string;
//   title: string;
//   module: string;
//   guard_name: string;
//   created_at: string;
//   updated_at: string;
// }

export interface RoleVO {
  roleId: string | number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
  status: string;
  delFlag: string;
  remark?: any;
  flag: boolean;
  menuIds?: Array<string | number>;
  admin: boolean;
  createBy?: any;
  createDept?: any;
  createTime?: string;
  updateBy?: any;
  updateTime?: any;
}

export interface RouteOption {
  hidden?: boolean;
  permissions?: string[];
  roles?: string[];
  component?: any;
  children?: RouteOption[];
  alwaysShow?: boolean;
  parentPath?: string;
  meta?: {
    title: string;
    icon: string;
  };
  query?: string;
}

export interface UserModel {
  userId: string | number;
  userName: string;
  nickName: string;
  email: string;
  phonenumber: string;
  password: string;
  sex: string;
  roleIds: string[];
  avatar: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  remark: string;
  createBy?: any;
  createTime?: string;
  type: string;
}
