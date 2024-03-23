<template>

  <div class="">


    <el-menu
        default-active="rock-paper"
        class="el-menu-vertical-demo border-none"
        @open="handleOpen"
        @close="handleClose"
        style="border: none;"
    >
      <div class="w-full flex items-center justify-center">

      </div>



      <el-menu-item
          @click="routeTo('available-job')"
          index="sessions">
        <el-icon><search/></el-icon>
        <span>Find A Job</span>
      </el-menu-item>

      <el-menu-item
          @click="routeTo('attempted-jobs')"
          index="sessions">
        <el-icon><compass/></el-icon>
        <span>Attempted Jobs</span>
      </el-menu-item>

      <el-menu-item
          @click="routeTo('portfolio')"
          index="sessions">
        <el-icon><user-profile/></el-icon>
        <span>Portfolio</span>
      </el-menu-item>

<!--      <el-menu-item-->
<!--          @click="routeTo('notifications')"-->
<!--          index="notifications">-->
<!--          <el-icon><notification /></el-icon>-->
<!--          <span>Notifications</span>-->
<!--      </el-menu-item>-->

<!--      <el-menu-item-->
<!--          @click="routeTo('rock-paper')"-->
<!--          index="games/rock-paper">-->
<!--        <el-icon><pouring /></el-icon>-->
<!--        <span>Games</span>-->
<!--      </el-menu-item>-->

<!--      <el-menu-item-->
<!--          @click="routeTo('transactions')"-->
<!--          index="transactions">-->
<!--        <el-icon><wallet /></el-icon>-->
<!--        <span>Transactions</span>-->
<!--      </el-menu-item>-->

<!--      <el-menu-item index="resources"-->
<!--                    @click="routeTo('resources')">-->
<!--        <el-icon><notebook /></el-icon>-->
<!--        <span>Resources</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Paperclip, Notification, Wallet, Notebook, Pouring, Briefcase, Search, Compass
} from '@element-plus/icons-vue'
import {frontendBaseUrl} from "../utils/constants.js";
import {routeTo} from "../utils/functions.js";
import UserProfile from "@/components/icons/UserProfile.vue";

const isCollapse = ref(true)
const handleOpen = ()=>{
  isCollapse.value = true
}

const handleClose = ()=>{
  isCollapse.value = false
}


</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-menu-vertical-demo {
  border: none;
}
</style>
