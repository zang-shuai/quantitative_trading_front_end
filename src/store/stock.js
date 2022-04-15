//求和相关的配置
import {useCookies} from "vue3-cookies"


export default {
    namespaced: true,
    actions: {

    },
    mutations: {
    },
    state: {
        concepts: [],
        stock_basic: [],
        stock_daily: {},
        now_code: ''
    },
    getters: {
        isLogin(state) {
            return state.login
        }
    },
}