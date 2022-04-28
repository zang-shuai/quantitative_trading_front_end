import {createStore} from 'vuex'
import user from "@/store/user";
import stock from "@/store/stock";
import global from "@/store/global";
import trade from "@/store/trade";

export default createStore({
    modules: {
        user: user,
        stock: stock,
        global: global,
        trade: trade
    }
})
