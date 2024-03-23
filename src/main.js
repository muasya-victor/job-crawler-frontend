import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/index.js';
import router from './routes/index.js';
import ElementPlus, {ElNotification} from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from "./utils/api.js";
import {deleteLocalStorageInformation} from "./utils/functions.js";

const app = createApp(App)

api.interceptors.request.use((config) => {
    const authData = JSON.parse(localStorage.getItem("authData"));

    if (authData?.access) {
        config.headers.Authorization = authData?.access
            ? "Bearer " + authData?.access
            : "";//else
    }
    return config;

});
api.interceptors.response.use(undefined, function (err) {
    return new Promise(function () {
        if (err.response.status === 401) {
            ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'Session Expired, please login again!'
            })
            deleteLocalStorageInformation()

            router.push({name : "login"});

        } else if (err.response.status === 403) {
            ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'Permission Denied'
            })
        } else if(err.response.status === 413){
            ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'Entity too large'
            })
        }
        throw err;
    });
})

app.use(router);
app.use(ElementPlus)
app.use(store);
app.mount('#app')
