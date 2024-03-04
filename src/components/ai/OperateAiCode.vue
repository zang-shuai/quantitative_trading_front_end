<template>
  <div style="height:30px;width:100%;margin-left: 10px">
    <span v-show="run_ai_code_show" style="cursor: pointer" @click="run_ai_code()">
        <svg t="1651283178280" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="1004" width="30" height="30"><path
            d="M512 928A416 416 0 1 1 928 512 416 416 0 0 1 512 928z m0-768A352 352 0 1 0 864 512 352 352 0 0 0 512 160z m-52.288 507.136a29.12 29.12 0 0 1-16.128 4.864 26.496 26.496 0 0 1-27.584-25.6V377.6a24.192 24.192 0 0 1 5.248-14.912 29.12 29.12 0 0 1 38.4-5.568l200.96 134.4a25.216 25.216 0 0 1 6.4 5.632 24.064 24.064 0 0 1-6.4 35.392z"
            fill="#333333" p-id="1005"></path></svg>
      </span>
    <div v-show="!run_ai_code_show" class="spinner-border spinner-border-sm" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <span v-show="save_ai_code_show" style="cursor: pointer" @click="save_ai_code()">
<svg t="1651283277851" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1143"
     width="30" height="30"><path
    d="M909.312 320L704 114.368a64 64 0 0 0-45.312-18.752H160a64 64 0 0 0-64 64V864a64 64 0 0 0 64 64h704a64 64 0 0 0 64-64V364.8a64 64 0 0 0-18.688-44.8zM288 159.616l64 0.384v128h-64z m128 0.384l128-0.384V288h-128v-128z m-128 704v-192h448v192h-448z m576 0h-64V640a32 32 0 0 0-32-32H256a32 32 0 0 0-32 32v224h-64V159.616h64v164.672a30.016 30.016 0 0 0 32 27.456h320a30.016 30.016 0 0 0 32-27.456V159.616h50.752L864 364.8v499.2z"
    fill="#333333" p-id="1144"></path></svg>
                    </span>
    <div v-show="!save_ai_code_show" class="spinner-border spinner-border-sm" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <span v-show="stop_ai_code_show" style="cursor: pointer" @click="stop_ai_code()">
      <svg t="1651283312438" class="icon"
           viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="1282" width="30" height="30"><path
          d="M512 928A416 416 0 1 1 928 512 416 416 0 0 1 512 928z m0-768A352 352 0 1 0 864 512 352 352 0 0 0 512 160z m96 512h-192a64 64 0 0 1-64-64v-192a64 64 0 0 1 64-64h192a64 64 0 0 1 64 64v192a64 64 0 0 1-64 64z"
          fill="#333333" p-id="1283"></path></svg>
        </span>
    <div v-show="!stop_ai_code_show" class="spinner-border spinner-border-sm" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <span v-show="delete_ai_code_show" style="cursor: pointer" @click="delete_ai_code()">
                    <svg t="1651283364151" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="1421" width="30" height="30"><path
                        d="M562.688 510.976l321.408-321.408a36.672 36.672 0 0 0-51.84-51.84l-321.28 321.28L189.568 137.6a36.672 36.672 0 0 0-51.84 51.84l321.28 321.536-321.408 321.28a36.672 36.672 0 0 0 51.84 51.84l321.536-321.408 321.408 321.472a36.672 36.672 0 0 0 51.84-51.84z"
                        fill="#333333" p-id="1422"></path></svg>
                    </span>
    <div v-show="!delete_ai_code_show" class="spinner-border spinner-border-sm" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import {useCookies} from "vue3-cookies";
import axios from "axios";
import $store from "@/store";
import {ref} from "vue";

export default {
  name: "OperateAiCode",
  emits: ['showData'],
  setup({emit}) {
    let run_ai_code_show = ref(true)
    let save_ai_code_show = ref(true)
    let stop_ai_code_show = ref(true)
    let delete_ai_code_show = ref(true)

    function run_ai_code() {
      $store.state.trade.ai_result.show_result = false
      run_ai_code_show.value = !run_ai_code_show.value
      $store.dispatch('trade/save_ai_code')

      new Promise(function (resolve, reject) {
        const params = new URLSearchParams()
        const {cookies} = useCookies()
        params.append('user_id', cookies.get('userid'))
        params.append('ai_code', $store.state.trade.ai_code)
        axios.post('http://127.0.0.1:8080/api/run_ai_code', params).then(
            function (response) {
              resolve(response.data)
            }
        ).catch(function (error) {
          reject(error.message)
        })
      }).then(
          (data) => {
            $store.state.trade.ai_result.time = data.code.time
            $store.state.trade.ai_result.y_test = data.code.y_test
            $store.state.trade.ai_result.predict = data.code.predict
            $store.state.trade.ai_result.show_result = true
            $store.state.trade.ai_result.summary = data.summary
            // alert(data.summary)
          }
      ).catch(
          (error) => {
            // alert(error)
          }
      )
      run_ai_code_show.value = true
    }

    function save_ai_code() {
      save_ai_code_show.value = !save_ai_code_show.value
      $store.dispatch('trade/save_ai_code')
      save_ai_code_show.value = !save_ai_code_show.value
    }

    function stop_ai_code() {
      $store.dispatch('trade/save_ai_code')

    }

    function delete_ai_code() {
      delete_ai_code_show.value = !delete_ai_code_show.value
      new Promise(function (resolve, reject) {
        const params = new URLSearchParams()
        const {cookies} = useCookies()
        let id = cookies.get('userid')
        params.append('user_id', id)
        params.append('ai_name', $store.state.trade.ai_name)
        axios.post('http://127.0.0.1:8080/api/delete_ai_code', params).then(
            function (response) {
              resolve(response.data.code)
            }
        ).catch(function (error) {
          reject(error.message)
        })
      }).then(
          (data) => {
            $store.state.trade.ai_list.forEach(function (item, index, arr) {
              if (item === $store.state.trade.ai_name) {
                arr.splice(index, 1);
              }
            });
          }
      ).catch(
          (error) => {
            // alert(error)
          }
      )
      delete_ai_code_show.value = !delete_ai_code_show.value
    }

    return {
      run_ai_code,
      save_ai_code,
      stop_ai_code,
      delete_ai_code,
      run_ai_code_show,
      save_ai_code_show,
      stop_ai_code_show,
      delete_ai_code_show
    }
  }

}
</script>

<style scoped>

</style>