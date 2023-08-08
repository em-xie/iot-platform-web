import { CTableColumn } from "#/table";
import { UserModel } from "@/model/user";
import { UrlListType } from "@/utils/list/listFactory";
import { useI18n } from "vue-i18n";

export const UserInfoUrl: Partial<UrlListType> = {
  list: "/system/user/list",
  delete: "/system/user",
  batchDelete: "/system/user",
  edit: "/system/user",
  add: "/system/user"
};

export const setupUserInfoAttributes = () => {
  const { t } = useI18n();

  const UserInfoFilterOptions = computed(() => {
    return [
      {
        label: t("page.common.user.info.column.user_id"),
        name: "userId",
        tagName: "el-input",
        props: {
          placeholder: t("page.common.user.info.search.user_id"),
          maxLength: "24"
        }
      },
      {
        label: t("page.common.user.info.column.user.name"),
        name: "userName",
        tagName: "el-input",
        props: {
          placeholder: t("page.common.user.info.search.user_name"),
          maxLength: "24"
        }
      }
      // {
      //   label: t("page.common.user.role.search.role_status"),
      //   name: "type",
      //   tagName: "async-select",
      //   props: {
      //     placeholder: t("page.common.user.role.search.status"),
      //     url: "/system/role/optionselect",
      //     size: "default",
      //     style: {
      //       width: "100%"
      //     }
      //   }
      // }
      // https://github.com/cloudhao1999/cloud-app-admin/issues/17
      // {
      //   label: t("page.common.design.article.search.type"),
      //   name: "test",
      //   type: "select",
      //   props: {
      //     style: {
      //       width: "100%"
      //     }
      //   },
      //   children: [
      //     {
      //       tagName: "el-option",
      //       props: {
      //         label: "test1",
      //         value: "test1"
      //       }
      //     },
      //     {
      //       tagName: "el-option",
      //       props: {
      //         label: "test2",
      //         value: "test2"
      //       }
      //     }
      //   ]
      // }
    ];
  });

  const UserInfoColumns = computed<CTableColumn<UserModel>[]>(() => {
    return [
      {
        type: "selection",
        show: true,
        width: "55",
        align: "center"
      },
      {
        prop: "userId",
        show: true,
        label: t("page.common.user.info.column.user_id"),
        // width: "180",
        align: "center"
      },
      {
        prop: "userName",
        show: true,
        label: t("page.common.user.info.column.user.name"),
        // width: "180",
        align: "center"
      },
      {
        prop: "nickName",
        show: true,
        label: t("page.common.user.info.column.nick.name"),
        // width: "180",
        align: "center"
      },
      {
        prop: "status",
        show: true,
        label: t("page.common.user.info.column.status"),
        align: "center"
        // showOverflowTooltip: true
      },
      {
        prop: "email",
        show: true,
        label: t("page.common.user.info.column.user.email"),
        align: "center"
        // showOverflowTooltip: true
      },
      {
        prop: "createTime",
        show: true,
        label: t("page.common.user.info.column.create.time"),
        align: "center"
        // showOverflowTooltip: true
      },
      {
        prop: "actions",
        show: true,
        label: t("page.common.user.info.column.action"),
        fixed: "right",
        scoped: "actions",
        align: "center"
      }
    ];
  });

  return {
    UserInfoFilterOptions,
    UserInfoColumns
  };
};
