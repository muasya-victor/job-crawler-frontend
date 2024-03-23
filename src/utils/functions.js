import { notification } from "ant-design-vue";
import {ElNotification} from "element-plus";
import router from "@/routes/index.js";

export function showSuccess(info = undefined) {
    notification["success"]({
        message: "Success",
        description: info !== undefined ? info : "Success",
    });
}

export function routeTo(name){
    router.push({name: name})
}


export function raiseServerError(err) {
    err?.response?.data?.errors?.forEach(obj => {
        setTimeout(function () {
            ElNotification({
                title: `${obj?.attr ? obj?.attr?.[0]?.toUpperCase() : 'Error'}${obj?.attr ? obj?.attr?.substring(1) : ''}`,
                type: "warning",
                position: "top-right",
                message: obj?.detail,
            })
        }, 2)

    })
}

export function raiseError(err = undefined, serverResponseError = true) {
    if (serverResponseError) {
        if (err?.response.code === "ECONNABORTED") {
            notification["warning"]({
                message: "Error",
                description: "Connection Timeout, Check Your Internet Connection",
            });
        }
        if (parseInt(err?.response.status) === 404) {
            notification["warning"]({
                message: "Error",
                description: "Resource Could Not be found",
            });
        }
        if (parseInt(err?.response.status) < 500) {
            //check if contains errors key
            const keys = Object.keys(err?.response?.data);
            const errorsList = err?.response?.data["errors"];
            errorsList.forEach((err) => {
                console.log("err", err)
                notification["warning"]({
                    message:err?.code,
                    description: err?.detail,
                });

            });

        } else {
            notification["warning"]({
                message: "Error",
                description: "An Unknown Error Occurred",
            });
        }
    } else {
        notification["warning"]({
            message: "Error",
            description: err === undefined ? "An Unknown Error Occurred" : err,
        });
    }
}

export function deleteLocalStorageInformation(){
    localStorage.removeItem("authData")
}