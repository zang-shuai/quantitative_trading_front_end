<template>
  <div style="height:800px;padding-left: 10px">
    <div style="float:left;width:50%;">
      <div style="height:200px;width:100%;">
        <Basic/>
      </div>
      <div style="height:200px;width:100%;">
        <SelectStock/>
      </div>
      <div style="width:100%;">
        <Buy/>
      </div>
      <div style="height:200px;width:100%;">
        <Sell/>
      </div>
      <span style="float: right"><button @click="run()" class="btn btn-info">运行</button></span>
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

export default {
  name: "Trading",
  components: {Spinners, Basic, Buy, Log, Result, SelectStock, Sell},
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