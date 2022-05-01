//求和相关的配置

import {useCookies} from "vue3-cookies";
import $store from "@/store/index";
import axios from "axios";

export default {
    namespaced: true,
    actions: {
        save_ai_code(context, value) {
            context.commit('SAVE_AI_CODE', value)
        },

        get_ai_code(context, value) {
            context.commit('GET_AI_CODE', value)
        }




    },
    mutations: {
        SAVE_AI_CODE(state, value) {
            new Promise(function (resolve, reject) {
                const params = new URLSearchParams()
                const {cookies} = useCookies()
                let id = cookies.get('userid')
                params.append('user_id', id)
                params.append('ai_name', state.ai_name)
                params.append('new_code', state.ai_code)
                axios.post('http://127.0.0.1:8080/api/save_ai_code', params).then(
                    function (response) {
                        resolve(response.data.code)
                    }
                ).catch(function (error) {
                    reject(error.message)
                })
            }).then(
                (data) => {
                    // alert(data)
                }
            ).catch(
                (error) => {
                    // alert(error)
                }
            )
        },

        GET_AI_CODE(state, value){
            // $store.dispatch('trade/save_ai_code')

            // SAVE_AI_CODE(state,value)

            new Promise(function (resolve, reject) {
                const params = new URLSearchParams()
                params.append('ai_name', value.ai_name)
                params.append('user_id', $store.state.user.user.id)
                axios.post('http://127.0.0.1:8080/api/get_ai_code', params).then(
                    function (response) {
                        resolve(response.data.code)
                    }
                ).catch(function (error) {
                    reject(error.message)
                })
            }).then(
                (data) => {
                    $store.state.trade.ai_code = data
                    $store.state.trade.ai_name = value.ai_name
                }
            ).catch(
                (error) => {

                }
            )
        }
    },
    state: {
        basic_money: '10000',
        start_date: '2021-01-01',
        month_income: '5000',
        stock_pool: [],
        small_money: 10000,
        buy: '',
        sell: '',
        ai_name: '',
        ai_code: '',
        ai_list: [],
        content: '# 买点\n' +
            'def my_buy_point(date, stock_pool, now_money):\n' +
            '    res = dict()\n' +
            '    for stock in stock_pool:\n' +
            '        s = stock_pool[stock]\n' +
            '        pre_date = date\n' +
            '        while True:\n' +
            '            pre_date = pre_date - datetime.timedelta(1)\n' +
            '            if Stock.is_trade_day(pre_date):\n' +
            '                break\n' +
            '        now_stock = s[date]\n' +
            '        pre_stock = s[pre_date]\n' +
            '        if type(now_stock) != type(False) and type(pre_stock) != type(False) and now_stock[\'ma5\'] > now_stock[\n' +
            '            \'ma10\'] and pre_stock[\'ma5\'] < pre_stock[\'ma10\']:\n' +
            '            res[s.ts_code] = now_money // (now_stock[\'open\'] * 100) // 2\n' +
            '    return res\n' +
            '\n' +
            '\n' +
            '# 卖点\n' +
            'def my_sell_point(date, position, stock_pool, now_money):\n' +
            '    res = dict()\n' +
            '    for stock in position:\n' +
            '        s = stock_pool[stock]\n' +
            '        pre_date = date\n' +
            '        while True:\n' +
            '            pre_date = pre_date - datetime.timedelta(1)\n' +
            '            if Stock.is_trade_day(pre_date):\n' +
            '                break\n' +
            '        now_stock = s[date]\n' +
            '        pre_stock = s[pre_date]\n' +
            '        if type(now_stock) != type(False) and type(pre_stock) != type(False) and now_stock[\'ma10\'] > now_stock[\n' +
            '            \'ma5\'] and pre_stock[\'ma10\'] < pre_stock[\'ma5\']:\n' +
            '            res[s.ts_code] = position[s.ts_code] // 100\n' +
            '    return res\n' +
            '\n' +
            '\n' +
            'user_data = {\n' +
            '    # 基础资金\n' +
            '    \'money\': 100000,\n' +
            '    # 月收入\n' +
            '    \'income\': 5000,\n' +
            '    # 开始日期\n' +
            '    \'start_date\': datetime.datetime(2015, 1, 1),\n' +
            '    # 结束日期\n' +
            '    \'end_date\': datetime.datetime.today(),\n' +
            '    # 股票池\n' +
            '    \'stock_pool\': [\'000001.SZ\', \'000002.SZ\', \'000003.SZ\', \'000004.SZ\'],\n' +
            '    # 买点\n' +
            '    \'buy_run\': my_buy_point,\n' +
            '    # 卖点\n' +
            '    \'sell_run\': my_sell_point\n' +
            '}'
    },
    getters: {},
}