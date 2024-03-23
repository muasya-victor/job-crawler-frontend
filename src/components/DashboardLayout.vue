<script setup>

import {projectName} from "../utils/constants.js";
import UserProfile from "./icons/UserProfile.vue";
import TheSideNavigation from "./TheSideNavigation.vue";
import {Briefcase} from "@element-plus/icons-vue";
</script>

<template>
  <div class="flex flex-col  h-screen">
    <div  class=" px-2 md:px-4 flex justify-between items-center flex-wrap py-1">
      <div class="flex gap-2 items-center">
<!--        <img src="../assets/logo.png"-->
<!--             class="rounded-md cursor-pointer"-->
<!--             alt="paper"-->
<!--             height="40" width="40">-->
<!--        <img src="../assets/logo.svg" class="h-10 w-10" >-->
        <briefcase class="h-10 w-10"/>

        <h1 class="text-3xl font-extrabold text-gray-600">{{projectName}}</h1>
      </div>


      <div class="flex gap-2 items-center">
        <span class="font-bold">Admin</span>
        <el-avatar
            style="background-color: rgb(58,59,59)"
            :icon="UserProfile"/>
      </div>
    </div>


    <div  class="flex h-full  " >
      <div style="width: 200px">
        <TheSideNavigation/>
      </div>

      <div class="px-2 md:px-4 w-full bg-gray-50 rounded-tl-md">
        <div class="custom-body">
          <slot>

          </slot>
        </div>

      </div>
    </div>



  </div>
</template>

<style scoped>
.custom-body > * {
  @apply py-4 pr-2
}
</style>