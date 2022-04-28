<template>
  <div style="height:800px;padding-left: 10px">
    <div style="float:left;width:50%;">
      <code-editor/>
<!--      <span style="float: right"><button @click="run()" class="btn btn-info">运行</button></span>-->
    </div>
    <div style="float:left;width:50%;">
      <div id="result" style="height:400px;width:100%;">
        <Result v-if="show_result" :series1="money" :series2="asset" :x-axis="date"/>
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

    function run() {
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

    return {
      run,
      date,
      asset,
      money,
      show_result,
      log,
      position
    }
  }
}
</script>

<style scoped>

</style>
<!--<template>-->
<!--  <div>-->
<!--    <svg t="1650471046224" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2939" width="30" height="30"><path d="M512 52.2752c253.3888 0 459.6224 206.1824 459.7248 459.7248 0 253.5424-206.1824 459.776-459.7248 459.776-253.5424 0-459.7248-206.2336-459.7248-459.776S258.4576 52.2752 512 52.2752z m0 102.1952a357.888 357.888 0 0 0-357.5296 357.4784A357.888 357.888 0 0 0 512 869.4784c197.0688 0 357.4784-160.3584 357.4784-357.5296-0.1024-197.12-160.4096-357.4784-357.4784-357.4784z m0 0" fill="#00A0E9" p-id="2940"></path><path d="M470.3744 680.96c-36.5056 21.9136-82.2272-5.4272-82.2272-49.3056V392.3968c0-43.8272 45.6704-71.2704 82.2272-49.3056l199.3728 119.6544c36.5056 21.9648 36.5056 76.7488 0 98.6624L470.3744 680.96z" fill="#00A0E9" p-id="2941"></path></svg>-->
<!--  </div>-->
<!--&lt;!&ndash;  <TradeSplit/>&ndash;&gt;-->
<!--  <code-editor/>-->

<!--</template>-->

<!--<script>-->

<!--import {Splitpanes, Pane} from 'splitpanes'-->
<!--import * as echarts from 'echarts';-->

<!--import 'splitpanes/dist/splitpanes.css'-->
<!--import CodeEditor from "@/components/CodeEditor";-->
<!--import axios from "axios";-->
<!--import Result from "@/views/Lab/Result";-->
<!--import Log from "@/components/Trade/Log";-->

<!--import TradeSplit from "@/components/TradeSplit";-->

<!--export default {-->
<!--  name: "Trade",-->
<!--  components: {Log, Result, CodeEditor, Splitpanes, Pane},-->

<!--  // components: {TradeSplit}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->