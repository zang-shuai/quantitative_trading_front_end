<template>
  <div>
    <div style="width: 100%;height: 600px">
      <div style="float: left;width: 20%;height: 600px;overflow-y:auto;">
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item" v-for="(value, key, index) in  myselect">
            <button @click="draw_picture(key)" class="nav-link" :class="{'active':value}" aria-current="page">
              {{ key }}
            </button>
          </li>
        </ul>
      </div>
      <div style="height: 600px;width: 80%;float: left" id="k_image"></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import {get_daily} from "@/utils/getData";
import $store from "@/store";
import {create_k_image} from "@/utils/drawPicture";
import {reactive, ref} from "vue";
import axios from "axios";

export default {
  name: "ChooseStock",
  setup() {
    let len = 0
    let pre = ref('')
    let myselect = ref({})
    new Promise(function (resolve, reject) {
      const params = new URLSearchParams()
      params.append('user_id', $store.state.user.user.id)
      axios.post('http://127.0.0.1:8080/api/getMySelect', params).then(
          function (response) {
            resolve(response.data.data)
          }
      ).catch(function (error) {
        reject(error.message)
      })
    }).then(
        (data) => {
          for (let i = 0; i < data.length; i++) {
            myselect.value[data[i]] = false
          }
          pre.value = data[0]
        }
    ).catch(
        (error) => {
          // alert('error')
        }
    )

    function draw_picture(ts_code) {
      myselect.value[ts_code] = true
      myselect.value[pre.value] = false
      pre.value = ts_code
      get_daily('get_daily', ts_code).then(
          daily => {
            $store.state.stock.stock_daily[ts_code] = daily
            $store.state.stock.now_code = ts_code
            create_k_image('k_image', ts_code)
            // has_data.value = true
          }
      )
    }

    return {
      myselect,
      draw_picture
    }

  }
}
</script>

<style scoped>

</style>