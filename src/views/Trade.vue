<template>
  <div style="height:800px;padding-left: 10px">
    <div style="float:left;width:50%;">
      <code-editor/>
    </div>
    <div style="float:left;width:50%;">
      <div style="height:30px;width:100%;margin-left: 10px">
        <span @click="run_code()" style="cursor:pointer">
        <svg t="1651113257920" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="4299" width="30" height="30"><path
            d="M512 52.2752c253.3888 0 459.6224 206.1824 459.7248 459.7248 0 253.5424-206.1824 459.776-459.7248 459.776-253.5424 0-459.7248-206.2336-459.7248-459.776S258.4576 52.2752 512 52.2752z m0 102.1952a357.888 357.888 0 0 0-357.5296 357.4784A357.888 357.888 0 0 0 512 869.4784c197.0688 0 357.4784-160.3584 357.4784-357.5296-0.1024-197.12-160.4096-357.4784-357.4784-357.4784z m0 0"
            fill="#00A0E9" p-id="4300"></path><path
            d="M470.3744 680.96c-36.5056 21.9136-82.2272-5.4272-82.2272-49.3056V392.3968c0-43.8272 45.6704-71.2704 82.2272-49.3056l199.3728 119.6544c36.5056 21.9648 36.5056 76.7488 0 98.6624L470.3744 680.96z"
            fill="#00A0E9" p-id="4301"></path></svg>
        </span>
      </div>
      <div id="result" style="height:370px;width:100%;">
        <Result v-if="show_result" :names="names" :mytitle="mytitle" :series1="money" :series2="asset" :x-axis="date"/>
        <spinners v-if="!show_result"/>
      </div>
      <div style="height:400px;width:100%;">
        <Log v-if="show_result" :log="log" :position="position"/>
        <spinners v-if="!show_result"/>
      </div>
    </div>
  </div>

</template>

<script>
import {create_line_chart} from "@/utils/drawPicture";
import Basic from "@/components/Trade/Basic";
import Buy from "@/components/Trade/Buy";
import Log from "@/components/Trade/Log";
import Result from "@/components/Trade/Result";
import SelectStock from "@/components/Trade/SelectStock";
import Sell from "@/components/Trade/Sell";
import {reactive, ref} from "vue";
import axios from "axios";
import $store from "@/store";
import Spinners from "@/components/Spinners";
import CodeEditor from "@/components/CodeEditor"

export default {
  name: "Trading",
  components: {CodeEditor, Spinners, Basic, Buy, Log, Result, SelectStock, Sell},
  setup() {
    let show_result = ref(true)
    let date = ref([])
    let asset = ref([])
    let money = ref([])
    let log = reactive({})
    let position = reactive({})
    let names = ref(['未购买', '已购买'])
    let mytitle = ref('交易结果')

    function run1() {
      if ($store.state.trade.stock_pool.length === 0 || $store.state.trade.buy.length === 0 || $store.state.trade.sell.length === 0) {
        alert('请输入完整信息')
      } else {
        show_result.value = false
        new Promise(function (resolve, reject) {
          const params = new URLSearchParams()
          params.append('basic_money', $store.state.trade.basic_money)
          params.append('start_date', $store.state.trade.start_date)
          params.append('month_income', $store.state.trade.month_income)
          params.append('stock_pool', $store.state.trade.stock_pool)
          params.append('small_money', $store.state.trade.small_money)
          params.append('buy', $store.state.trade.buy)
          params.append('sell', $store.state.trade.sell)
          params.append('userid', $store.state.user.user.id)

          axios.post('http://127.0.0.1:8080/api/quantitative_trading_img', params).then(
              function (response) {
                resolve(response.data.code)
              }
          ).catch(function (error) {
            reject(error.message)
          })
        }).then(
            (data) => {
              date.value = data['date']
              asset.value = data['asset']
              money.value = data['money']
              log.value = data['log']
              position.value = data['position']
              show_result.value = true
            }
        ).catch(
            (error) => {
              // alert('error')
            }
        )
      }
    }

    function run_code() {
      show_result.value = false
      new Promise(function (resolve, reject) {
        const params = new URLSearchParams()

        let content = 'import datetime\n' +
            '\n' +
            'from api.utils.trade.stock_utils import Stock\n' +
            'from api.utils.trade.user_utils import User\n' + $store.state.trade.content + '\n' +
            '\n' +
            'u = User(**user_data)\n' +
            'u.advance()\n' +
            'result = u.return_data()'

        params.append('content', content)


        axios.post('http://127.0.0.1:8080/api/quantitative_trading_code', params).then(
            function (response) {
              resolve(response.data.code)
            }
        ).catch(function (error) {
          reject(error.message)
        })
      }).then(
          (data) => {
            date.value = data['date']
            asset.value = data['asset']
            money.value = data['money']
            log.value = data['log']
            position.value = data['position']
            show_result.value = true
          }
      ).catch(
          (error) => {
            // alert('error')
          }
      )

    }

    return {
      run1,
      run_code,
      date,
      asset,
      money,
      show_result,
      log,
      position,
      names,
      mytitle
    }
  }
}
</script>

<style scoped>

</style>