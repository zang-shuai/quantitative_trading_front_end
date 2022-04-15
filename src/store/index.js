import {createStore} from 'vuex'
import user from "@/store/user";
import stock from "@/store/stock";
import global from "@/store/global";

export default createStore({
    modules: {
        user: user,
        stock: stock,
        global: global
    }
})
