<template>
  <div>
<!--    <label>-->
<!--      <input type="checkbox" v-model="select_all">-->
<!--      <span>全选</span>-->
<!--    </label>-->
    <div style="height:120px;overflow-y:auto;">
      <label v-for="st in hs300">
        <input type="checkbox" v-model="$store.state.trade.stock_pool" :value="st[0]" :checked="checked">
        <span>{{ st[0] }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ref, watch} from "vue";
import $store from "@/store";


export default {
  name: "Hs300",
  setup() {
    let select_all = ref(false)
    let hs300 = ref([])
    let checked = ref(false)
    new Promise(function (resolve, reject) {
      axios.post('http://127.0.0.1:8080/api/getHs300').then(
          function (response) {
            resolve(response.data.data)
          }
      ).catch(function (error) {
        reject(error.message)
      })
    }).then(
        (data) => {
          hs300.value = data
        }
    ).catch(
        (error) => {
          // alert('error')
        }
    )
    watch(select_all, (newValue, oldValue) => {
      if (select_all.value) {
        // for (let i = 0; i < hs300.value.length; i++) {
          // $store.state.trade.stock_pool.append(hs300.value[i])
        // }
      } else {
      }
    })

    return {
      hs300,
      // selectall,
      // selectAll,
      checked,
      select_all
    }

  },

}
</script>

<style scoped>

</style>



