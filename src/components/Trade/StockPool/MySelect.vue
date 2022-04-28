<template>
  <div>
    <button @click="selectAll()" style="float: left">{{ selectall }}</button>
    <div style="height:120px;overflow-y:auto;">
      <label v-for="st in myselect">
        <input type="checkbox" v-model="$store.state.trade.stock_pool" :value="st" :checked="checked">
        <span>{{ st }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import $store from "@/store";

export default {
  name: "MySelect",
  setup() {
    function selectAll() {
      checked.value = !checked.value
      if (checked.value === true) {
        selectall.value = '全不选'
      } else {
        selectall.value = '全选'
      }
    }

    let myselect = ref([])
    let checked = ref(false)
    let selectall = ref('全选')
    new Promise(function (resolve, reject) {
      const params = new URLSearchParams()
      // params.append('user_id', $store.state.user.user.id)
      params.append('user_id', 1)
      axios.post('http://127.0.0.1:8080/api/getMySelect', params).then(
          function (response) {
            resolve(response.data.data)
          }
      ).catch(function (error) {
        reject(error.message)
      })
    }).then(
        (data) => {
          myselect.value = data
        }
    ).catch(
        (error) => {
          /*alert('error')*/
        }
    )

    // const params = new URLSearchParams()
    // alert($store.state.user.user.id)
    // params.append('user_id', $store.state.user.user.id)
    // axios.post('http://127.0.0.1:8080/api/getMySelect', params).then(
    //     function (response) {
    //       myselect.value = response.data.data
    //     }
    // ).catch(function (error) {
    //   // reject(error.message)
    // })


    return {
      myselect,
      selectall,
      selectAll,
      checked
    }

  },

}
</script>

<style scoped>

</style>