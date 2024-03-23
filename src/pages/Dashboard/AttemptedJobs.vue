<script setup>

import {defineComponent, onMounted, ref} from "vue";
import store from "/src/store";
import {
  Briefcase,
  CaretRight,
  DataBoard,
  DocumentAdd, EditPen,
  Plus,
  Refresh,
  UserFilled,
  Wallet
} from "@element-plus/icons-vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import {ElTag} from "element-plus";

defineComponent({
  ElTag
})

const jobLoader = ref(false)
const jobs = ref([])

const fetchExistingJobs = ()=>{
  jobs.value = []
  jobLoader.value = true
  store.dispatch('fetchList', {url:'attempted-jobs/'})
      .then((resp)=>{
        jobs.value = resp?.data
        jobLoader.value = false
      })
}

const querySet = ref(
    {
      "webpage_url": "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search",
      "position": 1,
      "start": "0",
      "keywords": "Python",
      "location": "Nairobi",
      "trk": "",
      "save_to_db": true,
      "page_number": 1,
      "limit":25
    }
)
const getNewJobs = ()=>{
  jobs.value = []
  jobLoader.value = true
  store.dispatch('postData', {url:'scrape-jobs', data: {
      webpage_url: "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search",
      position: 1,
      start: "0",
      keywords: "Python",
      location: "Nairobi",
      trk: "",
      save_to_db: true,
      page_number: 1,
      limit:25
    }})
      .then((resp)=>{
        fetchExistingJobs()
      })
}

const attemptJob = (jobId)=>{
  store.dispatch('postData', {data: {job_id: jobId}, url:'attempted-create'})
}


const openLinkedInJob= (jobId)=> {
  const linkedInJobUrl = `https://www.linkedin.com/jobs/view/${jobId}`;
  window.open(linkedInJobUrl, '_blank');
}

const generatePdfReport= (jobId)=> {
  store.dispatch('fetchList', {url:'attempted-jobs-pdf-report'})
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'attempted_job.pdf';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
      });
}




onMounted(()=>{
  fetchExistingJobs()
})
</script>

<template>
  <dashboard-layout>
    <div class="flex flex-col gap-8 py-2 h-full pr-2">
      <router-view/>

      <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-600">
          Attempted Jobs
        </h1>
      </div>

      <div class="w-full bg-white border flex flex-col  rounded h-full ">
        <div class="w-full flex justify-end border-b p-2 gap-2">
          <el-button type="" size="large"
                     @click="generatePdfReport"
                     class="bg-blue-400">
            <el-icon class="mr-2">
              <document-add/>
            </el-icon>
            Pdf Report
          </el-button>
          <el-button type="" size="large"
                     @click="fetchExistingJobs"
                     class="bg-blue-400">
            <el-icon class="">
              <refresh/>
            </el-icon>
          </el-button>
          <el-button @click="getNewJobs" type="primary" size="large" class="bg-blue-400">
            <el-icon class="mr-2">
              <plus/>
            </el-icon>
            Job
          </el-button>
        </div>

        <el-table :data="jobs" :loading="jobLoader" style="width: 100%" class="rounded-b-lg">
          <template #empty>
            <BaseLoader v-if="jobs.length < 1" custom_text="Loading Jobs. Give it a moment"/>
            <el-empty v-if="jobs.length = 0"/>
          </template>
          <el-table-column prop="job_title" width="200" label="Job Title" >
            <template #default="scope">
              {{scope?.row?.job_object?.job_title}}
            </template>
          </el-table-column>
          <el-table-column prop="job_id" width="180" label="Job Id" >
            <template #default="scope">
              {{scope?.row?.job_object?.job_id}}
            </template>
          </el-table-column>
          <el-table-column prop="job_company_name" label="Company" width="180" >
            <template #default="scope">
              {{scope?.row?.job_object?.job_company_name}}
            </template>
          </el-table-column>
          <el-table-column prop="attempted_job_status" label="Active Status" width="180" >
            <template #default="scope">
              <el-tag size="large"
                      type="warning"
                      v-if="scope?.row?.job_object?.attempted_job_status === 'ongoing'"
                      >
                Ongoing
              </el-tag>

              <el-tag size="large"
                      v-if="scope?.row?.job_object?.attempted_job_status === 'complete'"
                      type="success">
                Complete
              </el-tag>

            </template>
          </el-table-column>
          <el-table-column prop="date_attempted" width="180" label="Date Attempted">
            <template #default="scope">
              {{scope?.row?.job_object?.date_attempted}}

            </template>
          </el-table-column>
          <el-table-column prop="operations" width="180" label="Operations" >
            <template #default="scope">
              <el-button style="margin-left: 0"
                         class="flex  gap-2 w-fit m-0 ">
                <el-icon class="mr-2">
                  <edit-pen/>
                </el-icon>
                <span>Activity Status</span>
              </el-button>
            </template>


          </el-table-column>

        </el-table>
      </div>
    </div>
  </dashboard-layout>

</template>

<style scoped>

</style>