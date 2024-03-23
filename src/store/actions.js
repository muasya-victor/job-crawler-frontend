import { raiseError, showSuccess } from "../utils/functions";
import api from "../utils/api";
import { baseUrl as api_url, headers } from "../utils/constants";

const actions = {
    /**
     *
     * @param commit
     * @param state
     * @param payload
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    async fetchList({ commit, state }, payload) {
        let actualUrl = `${api_url}${payload.url}`

        return api
            .request({url: actualUrl,
                method:"get",
                params : payload.params,
                paramsSerializer: {
                    indexes:null
                }
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                raiseError(err);
                throw err;
            });
    },
    async fetchSingleItem({ commit, state }, payload) {
        return await api
            .get(`${api_url}${payload.url}/${payload.id}/`)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                raiseError(err);
                throw err;
            });
    },
    async postData({ state, commit }, payload) {
        try {
            const response = await api.post(
                `${api_url}${payload.url}/`,
                {
                    ...payload.data,
                    createdBy: JSON.parse(localStorage.getItem("authData"))?.id,
                    lastModifiedBy: JSON.parse(localStorage.getItem("authData"))?.id,
                },
                { headers }
            );
            showSuccess("Successful");
            return response;
        } catch (err) {
            raiseError(err);
            throw err;
        }
    },
    async patchData({ state, commit }, payload) {
        try {
            const response = await api.patch(
                `${api_url}${payload.url}/${payload.id}/`,
                payload.value,
                { headers }
            );
            showSuccess("Successful");
            return response;
        } catch (err) {
            raiseError(err);
            throw err;
        }
    },
    async putData({ state, commit }, payload) {
        try {
            const response = await api.put(
                `${api_url}${payload.url}/${payload.id}`,
                {
                    ...payload.value,
                    lastModifiedBy: JSON.parse(localStorage.getItem("authData"))?.data?.id,
                },
                { headers }
            );
            showSuccess("Successful");
            return response;
        } catch (err) {
            raiseError(err);
            throw err;
        }
    },
};

export default {
    actions,
};
