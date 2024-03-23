<template>
  <div class="w-full h-screen ring-1 flex items-center justify-center">
    <el-form
        ref="loginFormRef"
        :model="form"
        :rules="rules"
        class="flex flex-col gap-4 w-4/12 h-fit"
        label-position="top"
        @click="submitForm(loginFormRef)"
    >
      <div class="flex gap-2 items-center">
        <div>
          <Suitcase class="h-10 w-10"/>
        </div>
        <h1 class="font-bold text-2xl">Job Crawler</h1>
      </div>

      <h2 class="font-bold text-gray-400">Registration</h2>

      <el-form-item label="First Name" prop="fname">
        <el-input
            v-model="form.first_name"
            :prefix-icon="UserIcon"
            placeholder="username"
            size="large"
            type="text"
        />
      </el-form-item>

      <el-form-item label="Last Name" prop="lname">
        <el-input
            v-model="form.last_name"
            :prefix-icon="UserIcon"
            placeholder="last name"
            size="large"
            type="text"
        />
      </el-form-item>
      <el-form-item label="Username" prop="username">
        <el-input
            v-model="form.username"
            :prefix-icon="UserIcon"
            placeholder="username"
            size="large"
            type="text"
        />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input
            v-model="form.email"
            :prefix-icon="Female"
            placeholder="email"
            size="large"
            type="email"
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
            html-type="submit"
        >
          Register
        </el-button>
      </div>
      <div class="text-sm">
        <span class="text-gray-400"> Already have an Account ? </span>
        <router-link :to="{name:'login'}" class="text-blue-400 hover:text-blue-500 hover:font-bold">
          Sign In </router-link>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { FormInstance, FormRules } from "element-plus";
import store from "@/store";
import router from "@/routes";
import {Female, Suitcase} from "@element-plus/icons-vue";

const loading = ref(false);
const form = ref({
  username: "",
  password: "",
  first_name: '',
  last_name: ''
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
            url: "register-users",
            data: form,
          })
          .then((resp) => {
            loading.value = false
          });
    } else {
    }
  });
};
</script>

<style scoped></style>
