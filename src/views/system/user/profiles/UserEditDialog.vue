<script lang="ts" setup>
import { useMessage } from "@/hooks/useMessage";
import { SimpleListType, useSimpleList } from "@/hooks/useSimpleList";
import { UserModel } from "@/model/user";
import { useScreenPixel } from "@/utils/web";
import { FormInstance } from "element-plus";
import { useI18n } from "vue-i18n";
import { UserInfoUrl } from "../modules/userInfo";
// import v from "@/plugins/validate";
const { t } = useI18n();
const emit = defineEmits(["close"]);

const { handleEdit, handleAdd } = useSimpleList<UserModel>(UserInfoUrl) as SimpleListType;
const visible = ref(false);
const ruleFormRef = ref<FormInstance>();
// const ruleFormRef = ref("");
const title = ref("");
const { gtMd } = useScreenPixel();
const model = ref<Partial<UserModel>>({});
const isEdit = computed<boolean>(() => {
  console.log(model.value.userId);
  return model.value.userId !== undefined;
});

const dialogWidth = computed(() => {
  return gtMd.value ? "50%" : "80%";
});

function edit(record: UserModel) {
  model.value = Object.assign({}, record);
  visible.value = true;
}

function cancel() {
  ruleFormRef.value?.clearValidate();
  visible.value = false;
}

async function submitForm(formEl: FormInstance | undefined) {
  console.log(formEl);
  console.log(isEdit.value);
  if (!formEl) return;
  await formEl.validate((valid) => {
    console.log(valid);
    if (valid) {
      if (isEdit.value) {
        handleEdit(model.value).then(() => {
          useMessage("success", t("page.common.notice.edit_success"));
          emit("close");
          visible.value = false;
        });
      } else {
        handleAdd(model.value).then(() => {
          useMessage("success", t("page.common.notice.add_success"));
          emit("close");
          visible.value = false;
        });
      }
    }
  });
}

// async function submitForm(formEl) {
//   console.log(formEl.value);
//   if (!formEl) return;
//   await formEl.validate((valid) => {
//     if (valid) {
//       console.log(valid);
//       console.log(isEdit.value);
//       if (isEdit.value) {
//         handleEdit(model.value).then(() => {
//           useMessage("success", t("page.common.notice.edit_success"));
//           emit("close");
//           visible.value = false;
//         });
//       } else {
//         handleAdd(model.value).then(() => {
//           useMessage("success", t("page.common.notice.add_success"));
//           emit("close");
//           visible.value = false;
//         });
//       }
//     }
//   });
// }

const options = computed(() => {
  return [
    {
      name: "nickName",
      type: "input",
      label: t("page.common.design.user.info.form.nickName"),
      rules: [
        {
          required: true,
          message: t("page.common.design.user.info.form.nickName_placeholder"),
          trigger: "blur"
        }
      ],
      props: {
        maxLength: 50,
        placeholder: t("page.common.design.user.info.form.nickName_placeholder")
      }
    },
    {
      name: "phonenumber",
      type: "input",
      label: t("page.common.design.user.info.form.phonenumber"),
      rules: [
        {
          required: true,
          message: t("page.common.design.user.info.form.phonenumber_placeholder"),
          trigger: "blur"
        }
      ],
      props: {
        maxLength: 50,
        placeholder: t("page.common.design.user.info.form.phonenumber_placeholder")
      }
    },
    {
      name: "email",
      type: "input",
      label: t("page.common.design.user.info.form.email"),
      rules: [
        {
          required: true,
          message: t("page.common.design.user.info.form.email_placeholder"),
          trigger: "blur"
        }
      ],
      props: {
        maxLength: 50,
        placeholder: t("page.common.design.user.info.form.email_placeholder")
      }
    },
    {
      name: "userName",
      type: "input",
      label: t("page.common.design.user.info.form.userName"),
      rules: [
        {
          required: true,
          message: t("page.common.design.user.info.form.userName_placeholder"),
          trigger: "blur"
        }
      ],
      props: {
        maxLength: 50,
        placeholder: t("page.common.design.user.info.form.userName_placeholder")
      }
    },
    {
      name: "password",
      type: "input",
      label: t("page.common.design.user.info.form.password"),
      rules: [
        {
          required: true,
          message: t("page.common.design.user.info.form.password_placeholder"),
          trigger: "blur"
        }
      ],
      props: {
        minLength: 3,
        placeholder: t("page.common.design.user.info.form.password_placeholder")
      }
      // scopedSlot: "password"
    },
    {
      name: "sex",
      // type: "input",
      label: t("page.common.design.user.info.form.sex"),
      rules: [
        {
          required: true,
          message: t("page.common.design.user.info.form.sex_placeholder"),
          trigger: "blur"
        }
      ],
      scopedSlot: "sex"
    },
    {
      name: "status",
      // type: "input",
      label: t("page.common.design.user.info.form.status"),
      rules: [
        {
          required: true,
          message: t("page.common.design.user.info.form.status_placeholder"),
          trigger: "blur"
        }
      ],
      scopedSlot: "status"
    },
    // {
    //   name: "roleIds",
    //   // type: "select",
    //   tagName: "async-select",
    //   label: t("page.common.design.user.info.form.roleIds"),
    //   props: {
    //     placeholder: t("page.common.design.user.info.form.roleIds_placeholder"),
    //     url: "/system/role/optionselect"
    //   }
    // },
    // {
    //   name: "roleIds",
    //   type: "input",
    //   label: t("page.common.design.user.info.form.roleIds"),
    //   rules: [
    //     {
    //       required: true,
    //       message: t("page.common.design.user.info.form.roleIds_placeholder"),
    //       trigger: "blur"
    //     }
    //   ],
    //   props: {
    //     maxLength: 50,
    //     placeholder: t("page.common.design.user.info.form.roleIds_placeholder")
    //   }
    // },
    {
      name: "remark",
      type: "input",
      label: t("page.common.design.user.info.form.remark"),
      rules: [
        {
          required: true,
          message: t("page.common.design.user.info.form.remark_placeholder"),
          trigger: "blur"
        }
      ],
      props: {
        maxLength: 50,
        placeholder: t("page.common.design.user.info.form.remark_placeholder")
      }
    }
  ];
});

defineExpose({
  edit,
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
      <template #sex>
        <el-radio-group v-model="model.sex" class="ml-4">
          <el-radio label="1" size="large">男</el-radio>
          <el-radio label="0" size="large">女</el-radio>
        </el-radio-group>
      </template>
      <template #status>
        <el-radio-group v-model="model.status" class="ml-4">
          <el-radio label="0" size="large">正常</el-radio>
          <el-radio label="1" size="large">停用</el-radio>
        </el-radio-group>
      </template>
      <!-- <template #roleIds>
        <el-radio-group v-model="model.roleIds" class="ml-4">
          <el-radio label="superadmin" size="large">超级管理员</el-radio>
          <el-radio label="common" size="large">普通用户</el-radio>
        </el-radio-group>
      </template> -->

      <!-- <template #password>
        <VeeValidateError :error="errors.password" />
      </template> -->
    </c-form>
  </el-dialog>
</template>

<style scoped></style>
