<template>
  <DashboardLayout class="">
    <div class="flex flex-col gap-8 py-2 min-h-[600px] pr-2">
      <h1 class="font-bold text-xl text-gray-600">
        Portfolio
      </h1>

      <div class="flex gap-2 h-full">
        <div style=" border-bottom: 1px solid #F1F2F6; height: fit-content"
             class="w-full md:max-w-[41.67%] lg:max-w-[33.33%] xl:max-w-[23.33%] bg-white flex items-center
                md:items-start justify-center py-8 rounded-t-[10px] ">

          <div class="px-[12.5px]">
                <span class="">
                  <figure class=" relative">
                    <img
                        :src="'https://wallpapers.com/images/high/pixel-landscape-1920-x-1080-modj7tzb2j6j6zc8.webp'"
                        alt="image" style="border-radius: 50%; height: 120px; width: 120px"
                        class="border-blue-700 p-1">

                    <el-upload
                        v-model:file-list="profileImage"
                        name="avatar"
                        :maxCount="1"
                        accept=".jpg,.png,.jpeg"
                        class="avatar-uploader"
                        :show-upload-list="false"
                    >
                  <span class="absolute bottom-0  w-full h-[60px] flex items-end justify-end">
                    <span style="border-radius: 50%; border: 4px solid white;"
                          class=" h-10 w-10 flex items-center justify-center bg-blue-400 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                           stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>

                    </span>
                  </span>

                    </el-upload>
                </figure>
                </span>
            <div>
            </div>
          </div>
        </div>

        <div class="h-full w-full min-h-[400px] bg-white p-4 rounded-lg flex flex-col gap-4">
          <div class="w-full flex justify-between items-center">
            <h1 class="font-bold text-xl text-gray-600">
              Muasya Victor
            </h1>

<!--            <el-button type="primary" size="large"-->
<!--                       @click="fetchPortfolioData"-->
<!--                       class="bg-blue-400">-->
<!--              <el-icon class="mr-2">-->
<!--                <download/>-->
<!--              </el-icon>-->
<!--              Download Resume-->
<!--            </el-button>-->
          </div>

          <div>
<!--            <h1>Brief Bio</h1>-->

            <div class="flex flex-col gap-4">
               <span class="font-bold text-lg">
                Rating:
               </span>

              <el-rate v-model="rating"
                       :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
                       show-text />


              <span class="font-bold text-lg">
                Key Skills:
                <br>
              </span>


              <ul class="list-decimal px-4">
                <li class="list-item">Front-End Development: Vue.js, HTML5, CSS3, JavaScript</li>
                <li class="list-item">Back-End Development: Python, Django Rest Framework, SQL</li>
                <li class="list-item">Full-Stack Proficiency: Building responsive and dynamic web applications</li>
                <li class="list-item">Problem-Solving: Ability to analyze complex problems and implement effective solutions</li>
                <li class="list-item">Team Collaboration: Excellent communication skills and a collaborative mindset for working in diverse teams</li>
              </ul>

              <span class="font-bold text-lg">
                Attempted Jobs:
               </span>

              <ul class="list-decimal px-4">
                <li class="list-item" v-for="job in attemptedJobs">{{job?.job_object?.job_title }} by
                  <span class="font-bold">{{job?.job_object?.job_company_name}}</span>
                </li>
              </ul>
            </div>



          </div>

        </div>
      </div>

    </div>


  </DashboardLayout>

</template>

<script>
import DashboardLayout from "@/components/DashboardLayout.vue";
import store from "@/store/index.js";
import {DocumentAdd, Download} from "@element-plus/icons-vue"; // Import the API function

export default {
  name: 'Portfolio',
  components: {Download, DocumentAdd, DashboardLayout},
  data() {
    return {
      user: {},
      attemptedJobs: [],
      reviews: [],
      profileImage: [],
      rating: 5
    };
  },
  mounted() {
    this.fetchPortfolioData();
  },
  methods: {
    fetchPortfolioData() {
      // Call the API function to fetch data
      store.dispatch('fetchList', {url: 'attempted-jobs'})
          .then(data => {
            this.attemptedJobs = data?.data;
          })
          .catch(error => {
            console.error('Error fetching portfolio data:', error);
          });
    }
  }
};
</script>
