<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="m-3 p-3 bg-gray-300 dark:bg-gray-800 h-[180px] rounded-lg border">
    <p class="font-medium text-center">{{ t("page.common.nested.text.level2") }}</p>
    <div class="relative w-full">
      <div class="p-5 absolute w-full">
        <el-button v-permission="'*:*:*'">{{ t("page.common.btn.edit") }}</el-button>
        <el-button v-permission="'*:*:*'" type="primary">{{ t("page.common.btn.add") }}</el-button>
        <el-button v-permission="'*:*:*'" type="danger">{{
          t("page.common.btn.delete")
        }}</el-button>
        <el-button v-permission="'*:*:*'" type="danger">{{
          t("page.common.btn.batchDelete")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
