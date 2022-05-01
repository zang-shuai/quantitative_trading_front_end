//求和相关的配置
import {useCookies} from "vue3-cookies"


export default {
    namespaced: true,
    actions: {
        login(context, value) {
            context.commit('LOGIN', value)
        },
        logout(context) {
            context.commit('LOGOUT')
        }
    },
    mutations: {
        LOGIN(state, value) {
            state.user.id = value.id
            state.user.password = value.password
            state.user.username = value.username
            state.user.role = value.role
            state.user.img = value.img
            state.user.phone_number = value.phone_number
            state.user.token = value.token
            const {cookies} = useCookies()
            cookies.set('userid', value.id)
            state.login = true
        },
        LOGOUT(state) {
            state.user.id = ''
            state.user.username = ''
            state.user.role = ''
            state.user.img = ''
            state.user.phone_number = ''
            state.user.token = ''
            state.user.password = ''
            state.login = false
            const {cookies} = useCookies()
            cookies.remove('usertoken');
            cookies.remove('userimage');
            cookies.remove('userid');
        }
    },
    state: {
        login: false,
        user: {
            id: '',
            username: '',
            password: '',
            role: '',
            img: '',
            phone_number: '',
            token: ''
        }
    },
    getters: {
        isLogin(state) {
            return state.login
        }
    },
}