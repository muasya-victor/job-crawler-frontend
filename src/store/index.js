import { createStore } from "vuex";
import actions from "./actions";

export default createStore({
    state: {
        sidebar: false, //toggle all side bars
    },
    mutations: {},
    actions: {
        ...actions.actions,
    },
    modules: {},
    plugins : []
});
