<template>
  <div style="height:800px;padding-left: 10px;">
    <select-code/>
    <ai-editor/>
    <div style="float:left;width:45%;">
      <operate-ai-code/>
      <div id="result" style="height:370px;width:100%;">
        <Result v-if="$store.state.trade.ai_result.show_result" :mytitle="mytitle" :names="names" :series1="$store.state.trade.ai_result.predict" :series2="$store.state.trade.ai_result.y_test" :x-axis="$store.state.trade.ai_result.time"/>
        <spinners v-if="!$store.state.trade.ai_result.show_result"/>
      </div>
      <div style="height:400px;width:100%;">
        <Summary v-if="$store.state.trade.ai_result.show_result"/>
        <spinners v-if="!$store.state.trade.ai_result.show_result"/>
      </div>
    </div>
  </div>

</template>

<script>
import Basic from "@/components/Trade/Basic";
import Buy from "@/components/Trade/Buy";
import Log from "@/components/Trade/Log";
import Result from "@/components/Trade/Result";
import SelectStock from "@/components/Trade/SelectStock";
import Sell from "@/components/Trade/Sell";
import {reactive, ref} from "vue";
import axios from "axios";
import Spinners from "@/components/Spinners";
import CodeEditor from "@/components/CodeEditor"
import $store from "@/store";
import OperateAiCode from "@/components/ai/OperateAiCode";
import SelectCode from "@/components/ai/SelectCode";
import AiEditor from "@/components/ai/AiEditor";
import Summary from "@/components/ai/Summary";

export default {
  name: "AILab",
  components: {
    AiEditor,
    SelectCode, OperateAiCode, CodeEditor, Spinners, Basic, Buy, Log, Result, SelectStock, Sell,Summary
  },
  setup() {
    let show_result = ref(true)
    let date = ref([])
    let asset = ref([])
    let money = ref([])
    let log = reactive({})
    let position = reactive({})
    let names = ref(['预测值','真实值'])
    let mytitle = ref('预测效果')
    // let time = ref([])
    // let y_test = ref([])
    // let predict = ref([])

    function get_result(data) {
      time.value = data.time
      y_test.value = data.y_test
      predict.value = data.predict
    }


    function run_code() {
      show_result.value = false
      new Promise(function (resolve, reject) {
        const params = new URLSearchParams()
        let content = $store.state.trade.ai
        params.append('content', content)
        axios.post('http://127.0.0.1:8080/api/quantitative_trading_ai', params).then(
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
      run_code,
      date,
      asset,
      money,
      show_result,
      log,
      position,
      get_result,
      names,
      mytitle
      // time,
      // y_test,
      // predict
    }
  }
}
</script>


<style scoped>

</style>