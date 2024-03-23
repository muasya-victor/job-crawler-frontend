import axios from "axios"
import { baseUrl } from "@/utility/constants"
import { raiseServerError, showSuccess } from "@/utility/functions"
import store from "@/vuex/store"
import { notification } from "ant-design-vue"
import { ElNotification } from "element-plus"

const mixin ={
  methods: {
    /**
     * @param info : Object info object sent by the ant design upload function
     * @param referenceTypeValue : String  photo reference type
     * @param referenceIdValue : Number of the object where the photo is being updated
     * @param fileList : Array of the
     * @param uploadUrl : String the url to upload the file to
     */
    async handleUploadPhotos(
      info,
      referenceTypeValue,
      referenceIdValue,
      fileList,
      uploadUrl = "photo-uploads/",
      fileKeyName = "files",
      referenceIdKey = 'reference_id'
    ) {
      try {
        const requestBody = new FormData();
        requestBody.append('reference_type', referenceTypeValue);
        requestBody.append(referenceIdKey, referenceIdValue);

        let fileTooLarge = false; // Flag to indicate if a file is too large

        for (let attachment of fileList) {
          // Check file size (max 5MB)
          if (attachment?.originFileObj.size <= 4 * 1024 * 1024) {
            requestBody.append(fileKeyName, attachment?.originFileObj);
            console.log('att', attachment?.originFileObj);
          } else {
            // console.log(`${attachment?.name} exceeds 5MB size limit and won't be uploaded.`);
            notification["error"]({
              message: "Error",
              description: `${attachment?.name} exceeds 4MB size limit and won't be uploaded`,
            });
            fileTooLarge = true; // Set flag to true if file is too large
            break; // Stop further processing
          }
        }

        if (!fileTooLarge) { // Proceed only if no file is too large
          const authData = JSON.parse(localStorage.getItem("piczanguAuthData"));

          const resp = await axios.post(`${baseUrl}${uploadUrl}`, requestBody, {
            headers: {
              "Content-Type": 'multipart/form-data',
              "Authorization": "Bearer " + authData?.access
            },
          });

          this.fileList = [];

          showSuccess('Successfully Uploaded Image');

          return resp;
        } else {
          // raiseServerError(`File/(s) exceeds 4MB size limit and won't be uploaded`);
          largeEntity(fileTooLarge)
        }
      } catch (error) {
        raiseServerError(error);
        console.log(error, 'errrr');
        throw error;
      }
    }


    ,



    async handleUploadGalleryPhotos(info, referenceType, referenceId,
                             fileList, uploadUrl="photo-uploads/", fileKey="files",
                             referenceKey = 'reference_type', showPrice = false,priceAmount = 50){
      let requestBody = new FormData() ;
      if (info.file.status !== '') {
        requestBody.append('reference_type', referenceType);
        requestBody.append(referenceKey, referenceId);
        if (showPrice){
          requestBody.append('price', priceAmount);

        }
        for (let attachment of fileList) {
          requestBody.append(fileKey, attachment?.originFileObj);
        }
        const authData = JSON.parse(localStorage.getItem("piczanguAuthData"));
        return axios
          .post(`${baseUrl}${uploadUrl}`, requestBody, {
            headers: {
              "Content-Type": 'multipart/form-data',
              "Authorization": "Bearer " + authData?.access
            },
          }).then((resp) => {
          this.fileList = []
          showSuccess('Successfully Uploaded Image')
          return resp
        }).catch(err => {
          raiseServerError(err);
          throw err
        })
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    getSetCurrentUser(){
      // store.state.loggedUser ={'sdfds':"sdfsdfs"}
      store.dispatch("fetchList", {
        url: `users/get-current-user/`
      }).then(resp => {
        store.commit('setLoggedUser',resp.data )
        localStorage.setItem("piczanguUserDetails", JSON.stringify(resp.data))
        // store.state.userProfile = resp.data?.profile?.profile_photo
        // store.state.loggedUser = resp.data
      })
    },


    formatCurrency(amount,currency='KES'){
      return amount?.toLocaleString("en-us", { style: "currency", currency: currency } )
    }//end of formatCurrency
  }
}

function largeEntity(action){
  if (action){
    setTimeout(function (){
      ElNotification({
        title: `error`,
        type: "warning",
        position: "top-right",
        message: `File/(s) exceeds 4MB size limit and won't be uploaded`,
      })
    },2)
  }

}

export default mixin