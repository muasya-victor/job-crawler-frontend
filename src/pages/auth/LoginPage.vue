<template>
  <div class="w-full h-screen ring-1 flex items-center justify-center">
    <el-form
        ref="loginFormRef"
        :model="form"
        :rules="rules"
        class="flex flex-col gap-4 w-4/12 h-fit"
        label-position="top"
    >
      <div class="flex gap-2 items-center">
        <div>
          <Suitcase class="h-10 w-10"/>
        </div>
        <h1 class="font-bold text-2xl">Job Crawler</h1>
      </div>

      <h2 class="font-bold text-gray-400">Sign In</h2>

      <el-form-item label="Username" prop="email">
        <el-input
            v-model="form.username"
            :prefix-icon="UserIcon"
            placeholder="username"
            size="large"
            type="text"
        />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
            v-model="form.password"
            :prefix-icon="LockClosedIcon"
            placeholder="password"
            show-password
            size="large"
            type="password"
        />
      </el-form-item>
      <!--            <el-input-->
      <div class="flex w-full ">
        <el-button
            :loading="loading"
            class="w-fit "
            size="large"
            style="border-radius: 4px"
            type="primary"
            @click="submitForm(loginFormRef)"
        >
          <!--                @click="submitForm(loginFormRef)"-->

          Login
        </el-button>
      </div>
<!--      <div class="text-sm">-->
<!--        <span class="text-gray-400"> Don't have an Account ? </span>-->
<!--        <router-link :to="{name:'register'}" class="text-blue-400 hover:text-blue-500 hover:font-bold"> Register </router-link>-->
<!--      </div>-->
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store";
import router from "@/routes";
import {Suitcase} from "@element-plus/icons-vue";

const loading = ref(false);
const form = reactive({
  username: "",
  password: "",
});

const loginFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "Please enter username",
    },
  ],
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  },
});
const submitForm = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store
          .dispatch("postData", {
            url: "token/request",
            data: {
              username: form.username,
              password: form.password,
            },
          })
          .then((resp) => {
            localStorage.setItem("authData", JSON.stringify(resp.data));
            router.push({ name: "available-job", replace: true });
          });
    } else {
      ElNotification(
          {
            title: `Login Error`,
            type: "warning",
            position: "top-right",
            message: 'Check your credentials and Try again',
          }
      )
    }
    loading.value = false;
  });
};

</script>

<style scoped></style>
