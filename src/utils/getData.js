import axios from "axios";
import $store from '@/store'

export function get_daily(api, ts_code) {
    return new Promise(function (resolve, reject) {
        axios.get('http://127.0.0.1:8080/api/' + api, {
            params: {
                ts_code: ts_code
            }
        }).then(
            function (response) {
                resolve(response.data)
            }
        ).catch(function (error) {
            reject(error.message)
        })
    })
}


export function get_stocks() {
    axios.get('http://127.0.0.1:8080/api/stock_basic').then(
        function (response) {
            $store.state.stock.stock_basic = response.data.data
        }
    ).catch(function (error) {
    })
}

export function get_userImage() {
    return $store.state.global.host + $store.state.user.user.img
}

export function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}

export function getQueryString(name) {
    // let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    // let r = window.location.search.substr(1).match(reg);
    // if (r != null) return unescape(r[2]);
    // return 'null';

    let test = window.location.href;
    return test.split("?" + name + "=")[1]
}