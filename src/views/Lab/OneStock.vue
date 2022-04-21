<template>
  <div>
    <div style="width: 100%;height: 650px">
      <div style="float: left;width: 20%;height: 650px;overflow-y:auto;">
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item" v-for="(value, key, index) in stocks">
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
import MyTransfer from "@/components/MyTransfer";
import StockPage from "@/components/StockPage";
import {reactive, ref} from "vue";
import $store from "@/store";
import axios from "axios";
import {get_daily} from "@/utils/getData";
import {create_k_image} from "@/utils/drawPicture";

export default {
  name: "OneStock",
  components: {StockPage, MyTransfer},
  setup() {
    let len = 0
    let pre = ref('')
    let stock_basic = $store.state.stock.stock_basic
    let stocks = ref({})
    for (let i = 0; i < stock_basic.length; i++) {
      stocks.value[stock_basic[i][0] + '  ' + stock_basic[i][2]] = false
    }

    function draw_picture(ts_codex) {
      let ts_code = ts_codex.slice(0, 10)
      stocks.value[ts_codex] = true
      stocks.value[pre.value] = false
      pre.value = ts_codex
      get_daily('get_daily', ts_code).then(
          daily => {
            $store.state.stock.stock_daily[ts_code] = daily
            $store.state.stock.now_code = ts_code
            create_k_image('k_image', ts_code)
          }
      )
    }

    return {
      draw_picture,
      stocks
    }

  }

}
</script>

<style scoped>

</style>