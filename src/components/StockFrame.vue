<template>
  <div style="" id="stock_frame">
    <div style="padding: 20px;height: 350px">
      <div style="width: 30%;height: 350px;float: left">
        <label for="exampleDataList" class="form-label">股票代码</label>
        <input class="form-control" list="datalistOptions" id="exampleDataList" v-model="ts_code"
               @keyup.enter="getData()" placeholder="选择相应股票">
        <datalist id="datalistOptions">
          <option v-for="v in $store.state.stock.stock_basic" :value="v[0]"/>
        </datalist>
        <button @click="getData()">获取数据</button>
        <p>{{ ts_code }}</p>
      </div>
      <div style="width: 70%;height: 350px;float: left;" id='k_picture'>
      </div>
    </div>
    <stock-table :ts_code="ts_code" v-if="has_data"/>
  </div>
</template>

<script>
import StockTable from "@/components/StockTable";
import {get_daily} from "@/utils/getData";
import {create_k_image} from "@/utils/drawPicture";
import {ref} from "vue";
import $store from '@/store';

export default {
  name: "StockFrame",
  components: {StockTable},
  setup() {
    let ts_code = ref('834765.BJ')
    let has_data = ref(false)


    function getData() {
      get_daily('get_daily', ts_code.value).then(
          daily => {
            $store.state.stock.stock_daily[ts_code.value] = daily
            $store.state.stock.now_code = ts_code.value
            create_k_image('k_picture', ts_code.value)
            has_data.value = true
          }
      )
    }

    return {
      ts_code,
      has_data,
      getData
    }
  }
}
</script>

<style scoped>

</style>