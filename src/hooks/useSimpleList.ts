import { onMounted, reactive, toRefs } from "vue";
import { http } from "@/utils/http";
import { useMessage } from "./useMessage";
import { BasicResult } from "#/resultType";
import ListFactory, { UrlListType } from "@/utils/list/listFactory";
import { useI18n } from "vue-i18n";
import { changStatusApi, insertAuthRole } from "@/api/user";
import { useDialog } from "./useDialog";
/**
 * 接受一个url对象，提供基础的增删改查方法
 * @param url url对象
 * @returns 方法合集
 */
function useSimpleList<T, U = any>(url: Partial<UrlListType>) {
  const factory = new ListFactory<T, U>(url);
  const { t } = useI18n();

  const {
    dataSource,
    ipagination,
    loading,
    queryParam,
    ids,
    modalFormRef,
    drawerFormRef,
    modalAuthRoleRef
  } = toRefs(reactive(factory));

  const getQueryParams = () => {
    return {
      page: ipagination.value.current,
      pageSize: ipagination.value.pageSize,
      ...queryParam.value
    } as unknown as U;
  };

  const loadData = async <T>(firstPage = false) => {
    if (!url.list) {
      useMessage("error", t("page.common.notice.set_url_list"));
      return;
    }
    if (firstPage) {
      ipagination.value.current = 1;
    }
    const params = getQueryParams();
    // console.log(params);
    try {
      loading.value = true;
      const res = await http.get<U, BasicResult<T[]>>(url.list, params);
      dataSource.value = res.rows as any;
      // console.log(res);
      // console.log(dataSource.value);
      ipagination.value.total = Number(res.total!);
    } finally {
      loading.value = false;
    }
  };

  const handleOpenAddDialog = () => {
    modalFormRef.value.edit({});
    modalFormRef.value.title = t("page.common.title.add");
  };

  const handleSearch = (values: any) => {
    queryParam.value = values;
    // console.log(values);
    loadData(true);
  };

  const handleReset = () => {
    queryParam.value = {} as any;
    loadData(true);
  };

  const handleOpenEditDialog = <T>(record: T, title = t("page.common.title.edit")) => {
    modalFormRef.value.edit(record);
    modalFormRef.value.title = title;
  };

  const handleOpenInserAuthDialog = <T>(
    record: T,
    title = t("page.common.title.insertAuthRole")
  ) => {
    modalAuthRoleRef.value.insert(record);
    modalAuthRoleRef.value.title = title;
  };

  /**
   * 新增表单提交
   * @param params 表单内容
   * @returns 响应信息
   */
  const handleAdd = async (params: T) => {
    console.log(params);
    return new Promise(async (resolve, reject) => {
      try {
        if (!url.add) {
          useMessage("error", t("page.common.notice.set_url_add"));
          return;
        }
        const res = await http.post<T, BasicResult<{ count: number }>>(url.add, {
          data: params
        });
        if (res.code === 200 && res.msg === "操作成功") {
          resolve(res);
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * 编辑表单提交
   * @param params 表单内容
   * @returns 响应信息
   */
  const handleEdit = async (params: T) => {
    return new Promise(async (resolve, reject) => {
      console.log(params);
      try {
        if (!url.edit) {
          useMessage("error", t("page.common.notice.set_url_edit"));
          return;
        }
        const res = await http.put<T, BasicResult<{ count: number }>>(url.edit, {
          data: params
        });
        if (res.code === 200 && res.msg === "操作成功") {
          resolve(res);
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * 删除单个数据
   * @param id id
   * @returns 响应信息
   */
  const handleDelete = async (id: number) => {
    if (!url.delete) {
      useMessage("error", t("page.common.notice.set_url_delete"));
      return;
    }
    const res = await http.delete<{}, BasicResult<{ count: number }>>(`${url.delete}/${id}`);
    if (res.code === 200 && res.msg === "操作成功") {
      useMessage("success", t("page.common.notice.delete_success"));
      loadData(true);
    }
  };

  /**
   * 批量删除
   * @returns 响应内容
   */
  const handleBatchDelete = async () => {
    if (!url.batchDelete) {
      useMessage("error", t("page.common.notice.set_url_batchDelete"));
      return;
    }
    if (ids.value.length === 0) {
      console.log(ids);
      useMessage("error", t("page.common.notice.empty_delete_data"));
      return;
    }
    const res = await http.delete<{ ids: number }, BasicResult<{ count: number }>>(
      `${url.batchDelete}/${ids.value.join(",")}`
    );
    // {
    //   ids: ids;
    // }
    if (res.code === 200 && res.msg === "操作成功") {
      useMessage("success", t("page.common.notice.batchDelete_success"));
      loadData(true);
    }
  };

  /**
   * 打开新增弹窗
   */
  const handleOpenAddDialogDrawer = () => {
    drawerFormRef.value.add();
    drawerFormRef.value.title = t("page.common.title.add");
  };

  /**
   * 打开编辑弹窗
   * @param record 表单内容
   * @param title 标题
   */
  const handleOpenEditDialogDrawer = <T>(record: T, title = t("page.common.title.edit")) => {
    drawerFormRef.value.edit(record);
    drawerFormRef.value.title = title;
  };

  const handleOpenInserAuthDialogDrawer = <T>(
    record: T,
    title = t("page.common.title.insertAuthRole")
  ) => {
    drawerFormRef.value.insert(record);
    drawerFormRef.value.title = title;
  };

  const handleSizeChange = (val: number) => {
    ipagination.value.pageSize = val;
    loadData();
  };

  const handleCurrentChange = (val: number) => {
    ipagination.value.current = val;
    loadData();
  };

  const handleSelectionChange = (val: T[]) => {
    ids.value = unref(val).map((item: any) => item.userId);
    console.log(ids.value);
  };

  /** 用户状态修改  */
  const changeStatus = async (val: any) => {
    // console.log(val.status);
    const text = val.status === "0" ? "启用" : "停用";
    try {
      useDialog(
        '确认要"' + text + '""' + val.nickName + '"用户吗?',
        async () => {
          const res = await changStatusApi(val.userId, val.status);
          if (res.code === 200) {
            useMessage("success", "修改状态成功");
            loadData();
          }
        },
        () => {
          // useMessage("error", "修改状态失败");
          loadData();
        }
      );
    } catch (err) {
      useMessage("error", "修改状态失败");
      val.status = val.status === "0" ? "1" : "0";
      loadData();
    }
  };

  const handleInsertAuthRole = async (params: T) => {
    const data = JSON.parse(JSON.stringify(params));
    console.log(data);
    //data.roleIds: "common"是这样的我想把这个参数传到后端,后端接收的是Long[] roIds;
    const longArray = data.roleIds.split(",").map((item: string) => Number(item));
    // console.log(longArray);
    const res = await insertAuthRole(data.userId, longArray);
    console.log(res);
    if (res.code === 200) {
      return Promise.resolve(res);
    }
  };

  onMounted(async () => {
    await loadData(true);
  });

  return {
    loadData,
    handleOpenAddDialog,
    handleOpenEditDialog,
    handleReset,
    handleAdd,
    handleInsertAuthRole,
    handleEdit,
    handleDelete,
    handleBatchDelete,
    handleSearch,
    handleOpenAddDialogDrawer,
    handleOpenEditDialogDrawer,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    dataSource,
    ids,
    ipagination,
    modalFormRef,
    modalAuthRoleRef,
    loading,
    changeStatus,
    handleOpenInserAuthDialog,
    handleOpenInserAuthDialogDrawer
  };
}

type SimpleListType = ReturnType<typeof useSimpleList>;

export { useSimpleList, type SimpleListType };
