<script lang="ts" setup>
import { useMessage } from "@/hooks/useMessage";
import { SimpleListType, useSimpleList } from "@/hooks/useSimpleList";
import { UserModel } from "@/model/user";
import { useScreenPixel } from "@/utils/web";
import { FormInstance } from "element-plus";
import { useI18n } from "vue-i18n";
import { UserInfoUrl } from "../modules/userInfo";
const { t } = useI18n();
const emit = defineEmits(["close"]);

const { handleInsertAuthRole } = useSimpleList<UserModel>(UserInfoUrl) as SimpleListType;
const visible = ref(false);
const ruleFormRef = ref<FormInstance>();
const title = ref("");
const { gtMd } = useScreenPixel();
const model = ref<Partial<UserModel>>({});

const dialogWidth = computed(() => {
  return gtMd.value ? "50%" : "80%";
});

function insert(record: UserModel) {
  model.value = Object.assign({}, record);
  visible.value = true;
}

function cancel() {
  ruleFormRef.value?.clearValidate();
  visible.value = false;
}

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid) => {
    console.log(valid);
    if (valid) {
      handleInsertAuthRole(model.value).then(() => {
        useMessage("success", t("page.common.notice.addRole_success"));
        emit("close");
        visible.value = false;
      });
    }
  });
}

const options = computed(() => {
  return [
    {
      name: "roleIds",
      // type: "select",
      tagName: "async-select",
      label: t("page.common.design.user.info.form.roleIds"),
      props: {
        placeholder: t("page.common.design.user.info.form.roleIds_placeholder"),
        url: "/system/role/optionselect"
      }
    }
  ];
});

defineExpose({
  insert,
  title: title
});
</script>
<template>
  <el-dialog v-model="visible" :width="dialogWidth" :title="title" @close="cancel">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ t("page.common.btn.cancel") }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          t("page.common.btn.confirm")
        }}</el-button>
      </span>
    </template>
    <c-form ref="ruleFormRef" v-model:value="model" label-width="80px" :options="options">
      <template #roleIds>
        <el-radio-group v-model="model.roleIds" class="ml-4">
          <el-radio label="superadmin" size="large">超级管理员</el-radio>
          <el-radio label="common" size="large">普通用户</el-radio>
        </el-radio-group>
      </template>
    </c-form>
  </el-dialog>
</template>

<style scoped></style>
