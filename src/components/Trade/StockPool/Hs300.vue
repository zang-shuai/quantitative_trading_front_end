<template>
  <div>
    <button @click="selectAll()" style="float: left">{{ selectall }}</button>
    <div style="height:120px;overflow-y:auto;">
      <label v-for="st in hs300">
        <input type="checkbox" :name="st[0]" :checked="checked">
        <span>{{ st[0] }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from "vue";

export default {
  name: "Hs300",
  setup() {
    function selectAll() {
      checked.value = !checked.value
      if (checked.value === true) {
        selectall.value = '全不选'
      } else {
        selectall.value = '全选'
      }
    }

    let hs300 = ref([])
    let checked = ref(false)
    let selectall = ref('全选')
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
          console.log('-----');
          console.log(data);
          console.log('-----');
          hs300.value = data
        }
    ).catch(
        (error) => {
          alert('error')
        }
    )
    return {
      hs300,
      selectall,
      selectAll,
      checked
    }

  },

}
</script>

<style scoped>

</style>



