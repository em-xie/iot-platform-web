<script setup lang="ts">
// import permissionService from "@/hooks/usePermission";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="relative w-full">
    <div class="p-5 absolute w-full">
      <el-button v-permission="'*:*:*'">{{ t("page.common.btn.edit") }}</el-button>
      <el-button v-permission="'*:*:*'" type="primary">{{ t("page.common.btn.add") }}</el-button>
      <el-button v-permission="'*:*:*'" type="danger">{{ t("page.common.btn.delete") }}</el-button>
      <el-button v-permission="'*:*:*'" type="danger">{{
        t("page.common.btn.batchDelete")
      }}</el-button>
    </div>
  </div>
</template>

<style scoped></style>
