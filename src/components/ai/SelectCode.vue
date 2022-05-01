<template>
  <div style="float:left;width:10%;height:800px;overflow-y:auto">
    <div class="input-group mb-3">
      <input @keyup.enter="add_ai_code()" type="text" v-model="add_new" class="form-control" placeholder="新建"
             aria-label="Recipient's username"
             aria-describedby="basic-addon2">
      <span class="input-group-text" id="basic-addon2">
          <span style="cursor: pointer" @click="add_ai_code()">
            <svg color="#479ee3" t="1651199460265" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="5245" width="30" height="30"><path
                d="M904.2 344.3c-21.5-50.7-52.2-96.3-91.3-135.4s-84.6-69.8-135.4-91.3C625 95.5 569.3 84.2 511.8 84.2S398.5 95.5 346 117.7c-50.7 21.5-96.3 52.2-135.4 91.3s-69.8 84.6-91.3 135.4c-22.2 52.5-33.5 108.3-33.5 165.8S97.1 623.5 119.3 676c21.5 50.7 52.2 96.3 91.3 135.4 39.1 39.1 84.6 69.8 135.4 91.3 52.5 22.2 108.3 33.5 165.8 33.5s113.3-11.3 165.8-33.5c50.7-21.5 96.3-52.2 135.4-91.3 39.1-39.1 69.8-84.6 91.3-135.4 22.2-52.5 33.5-108.3 33.5-165.8s-11.4-113.4-33.6-165.9zM511.8 876C310 876 145.9 711.8 145.9 510.1S310 144.2 511.8 144.2c201.7 0 365.9 164.1 365.9 365.9 0 201.7-164.2 365.9-365.9 365.9z"
                p-id="5246"></path><path
                d="M737 481H542V286c0-16.5-13.5-30-30-30s-30 13.5-30 30v195H287c-16.5 0-30 13.5-30 30s13.5 30 30 30h195v195c0 16.5 13.5 30 30 30s30-13.5 30-30V541h195c16.5 0 30-13.5 30-30s-13.5-30-30-30z"
                p-id="5247"></path></svg>
          </span>
        </span>
    </div>
    <div @click="get_ai_code(i,key)"
         style="border: #dfe0de 1px solid;border-radius:10px;height: 30px;margin-top: 1px;padding-left: 12px;padding-top: 2px;cursor: pointer"
         v-for="(i,key) in $store.state.trade.ai_list" :class="{'be_clicked_code':list_selected[key]}">
      {{ i }}
    </div>
  </div>

</template>

<script>
import $store from "@/store";
import {useCookies} from "vue3-cookies";
import axios from "axios";
import {ref} from "vue";

export default {
  name: "SelectCode",
  setup() {
    let add_new = ref('')
    let selected = 0
    let pre_selected = 0
    let list_selected = ref([true,])
    for (let i = 1; i < $store.state.trade.ai_list.length; i++) {
      list_selected.value.push(false)
    }

    function isInArray(value, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true;
        }
      }
      return false;
    }

    function add_ai_code() {
      if (isInArray(add_new.value, $store.state.trade.ai_list)) {
        alert('名字不能重复')
      } else if (add_new.value === '') {
        // alert()
      } else {
        new Promise(function (resolve, reject) {
          const params = new URLSearchParams()
          const {cookies} = useCookies()
          let id = cookies.get('userid')
          params.append('id', id)
          params.append('ai_name', add_new.value)
          // alert(add_new.value)
          // alert(id)
          axios.post('http://127.0.0.1:8080/api/add_ai_list', params).then(
              function (response) {
                resolve(response.data.code)
              }
          ).catch(function (error) {
            reject(error.message)
          })
        }).then(
            (data) => {
              if (data === 1000) {
                $store.state.trade.ai_list.push(add_new.value)
                add_new.value = ''
              } else {
                // alert('错误')
              }
            }
        ).catch(
            (error) => {
              // alert(error)
            }
        )
      }
    }

    get_ai_list()

    function get_ai_list() {
      new Promise(function (resolve, reject) {
        const params = new URLSearchParams()
        const {cookies} = useCookies()

        let id = cookies.get('userid')
        params.append('id', id)
        axios.post('http://127.0.0.1:8080/api/get_ai_list', params).then(
            function (response) {
              resolve(response.data.code)
            }
        ).catch(function (error) {
          reject(error.message)
        })
      }).then(
          (data) => {
            // alert(data)
            $store.state.trade.ai_list = data
            get_ai_code($store.state.trade.ai_list[0], 0)

          }
      ).catch(
          (error) => {
            // alert(error)
          }
      )
    }


    function get_ai_code(ai_name, key) {
      pre_selected = selected
      selected = key
      list_selected.value[pre_selected] = false
      list_selected.value[selected] = true
      $store.dispatch('trade/save_ai_code')
      $store.dispatch('trade/get_ai_code', {
        ai_name: ai_name
      })
    }

    // {
    //   $store.dispatch('trade/save_ai_code')
    //   pre_selected = selected
    //   selected = key
    //   list_selected.value[pre_selected] = false
    //   list_selected.value[selected] = true
    //   new Promise(function (resolve, reject) {
    //     const params = new URLSearchParams()
    //     params.append('ai_name', ai_name)
    //     params.append('user_id', $store.state.user.user.id)
    //     axios.post('http://127.0.0.1:8080/api/get_ai_code', params).then(
    //         function (response) {
    //           resolve(response.data.code)
    //         }
    //     ).catch(function (error) {
    //       reject(error.message)
    //     })
    //   }).then(
    //       (data) => {
    //         $store.state.trade.ai_code = data
    //         $store.state.trade.ai_name = ai_name
    //       }
    //   ).catch(
    //       (error) => {
    //
    //       }
    //   )
    // }


    return {
      add_ai_code,
      get_ai_code,
      add_new,
      list_selected
    }
  }
}
</script>

<style scoped>
.be_clicked_code {
  background-color: #409EFF;
}
</style>