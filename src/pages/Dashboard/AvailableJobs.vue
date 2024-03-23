<script setup>

import {onMounted, ref} from "vue";
import store from "/src/store";
import {
  Briefcase,
  CaretRight,
  DataBoard,
  DocumentAdd,
  Plus,
  Refresh,
  UserFilled,
  Wallet
} from "@element-plus/icons-vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import BaseLoader from "@/components/BaseLoader.vue";

const jobLoader = ref(false)
const jobs = ref([])

const fetchExistingJobs = ()=>{
  jobs.value = []
  jobLoader.value = true
  store.dispatch('fetchList', {url:'available-jobs/'})
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

const generatePdfReport = (jobId)=> {
  store.dispatch('fetchList', {url:'generate-pdf-report'})
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'job_report.pdf';

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
          Jobs
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
          <el-table-column prop="job_title" width="200" label="Job Title" />
          <el-table-column prop="job_id" width="180" label="Job Id" />
          <el-table-column prop="job_company_name" label="Company" width="180" />
          <el-table-column prop="job_location" label="Company Location" width="180" >
            <template #default="scope">
              <el-tag size="large"
                      v-if="scope?.row?.job_location === null"
                      type="warning">
                No location available yet
              </el-tag>

            </template>
          </el-table-column>
          <el-table-column prop="job_level" width="180" label="Job Level">
            <template #default="scope">
              <el-tag size="large"
                      v-if="scope?.row?.job_level === null"
                      type="warning">
                Not Updated
              </el-tag>

            </template>
          </el-table-column>
          <el-table-column prop="operations" width="180" label="Operations" >
            <template #default="scope">
              <el-popover
                  placement="bottom"
                  title="Available Options"
                  :width="200"
                  trigger="click"
              >
                <template #default>

                  <div class="flex gap-2 flex-wrap items-center justify-start ">
                    <el-button type="primary"
                               @click="attemptJob(scope?.row?.id)"
                               class="flex items-center justify-start gap-2 w-fit m-0">
                      <span>Apply Through Us
                      </span>
                      <el-icon>
                        <caret-right/>
                      </el-icon>
                    </el-button>

                    <el-button style="margin-left: 0"
                               @click="openLinkedInJob(scope?.row?.job_id)"
                               class="flex items-center gap-2 w-fit m-0 ">
                      <span>Apply On LinkedIn</span>
                      <el-icon>
                        <caret-right/>
                      </el-icon>
                    </el-button>

<!--                    <el-button style="margin-left: 0"-->
<!--                                type=""-->
<!--                               @click="attemptJob(scope?.row?.id)"-->
<!--                               class="flex items-center justify-start gap-2 w-fit m-0">-->
<!--                      <span>View Applicants-->
<!--                      </span>-->
<!--                      <el-icon>-->
<!--                        <user-filled/>-->
<!--                      </el-icon>-->
<!--                    </el-button>-->
                  </div>
                </template>

                <template #reference>
                  <el-button type="" class="flex items-center w-fit">
<!--                    <span>View Options</span>-->
                    <el-icon>
                      <caret-right/>
                    </el-icon>
                  </el-button>
                </template>
              </el-popover>
            </template>


          </el-table-column>

        </el-table>
      </div>
    </div>
  </dashboard-layout>

</template>

<style scoped>

</style>