<script setup lang="ts">
import { SimpleListType, useSimpleList } from "@/hooks/useSimpleList";
import UserEditDialog from "@/views/system/user/profiles/UserEditDialog.vue";
import { UserModel } from "@/model/user";
import { setupUserInfoAttributes, UserInfoUrl } from "./modules/userInfo";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const initialValues = {
  userId: "",
  userName: ""
  // type: ""
};

const { UserInfoFilterOptions, UserInfoColumns } = setupUserInfoAttributes();

const searchParams = ref(initialValues);

const filterOptions = computed(() => {
  return UserInfoFilterOptions.value;
});
const isEmpty = computed(() => {
  return ids.value.length === 0;
});

// const changeStatus1 = (val: any) => {
//   console.log(val);
// };

const {
  ids,
  loading,
  dataSource,
  ipagination,
  modalFormRef,
  loadData,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  handleOpenAddDialog,
  handleOpenEditDialog,
  handleDelete,
  handleBatchDelete,
  handleSearch,
  handleReset,
  changeStatus
} = useSimpleList<UserModel>(UserInfoUrl) as SimpleListType;
</script>

<template>
  <div class="relative w-full">
    <div class="p-[8px] absolute w-full">
      <div class="mx-3 mt-5">
        <search-filter
          :model="searchParams"
          :options="filterOptions"
          :show-reset="true"
          @reset="handleReset"
          @search="handleSearch"
        />
      </div>
      <c-table
        v-loading="loading"
        :table-data="dataSource"
        :show-header="true"
        :columns="UserInfoColumns"
        header-align="right"
        stripe
        style="width: 100%"
        @status-change="changeStatus"
        @selection-change="handleSelectionChange"
      >
        <template #options>
          <el-button icon="refresh" circle @click="handleSearch" />
          <el-button type="primary" icon="plus" circle @click="handleOpenAddDialog" />
          <el-popconfirm
            :title="t('page.common.btn.batchDelete_popover')"
            @confirm="handleBatchDelete()"
          >
            <template #reference>
              <el-button :disabled="isEmpty" type="danger" icon="delete" circle />
            </template>
          </el-popconfirm>
        </template>
        <template #actions="{ scope }">
          <el-button size="small" @click="handleOpenEditDialog(scope.row)">{{
            t("page.common.btn.edit")
          }}</el-button>

          <el-popconfirm
            :title="t('page.common.btn.delete_popover')"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button size="small" type="danger">{{ t("page.common.btn.delete") }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </c-table>
      <div class="float-right mt-2">
        <el-pagination
          v-model:currentPage="ipagination.current"
          v-model:page-size="ipagination.pageSize"
          small
          :page-sizes="ipagination.pageSizeOptions"
          :background="true"
          layout="sizes, prev, pager, next"
          :total="ipagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <UserEditDialog ref="modalFormRef" @close="loadData" />
  </div>
</template>
