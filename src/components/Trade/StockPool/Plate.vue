<template>
  <div>
    <button @click="selectAll()" style="float: left">{{ selectall }}</button>
    <div style="height:120px;overflow-y:auto;">
      <label v-for="st in myselect">
        <input type="checkbox" :name="st[0]" :checked="checked">
        <span>{{ st[0] }}:{{ st[1] }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import $store from "@/store";
import axios from "axios";

export default {
  name: "Plate",
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
      axios.post('http://127.0.0.1:8080/api/plate').then(
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
          alert('error')
        }
    )
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