<template>
  <div style="height:120px;overflow-y:auto;">
    <div>
      <span>{{ min }}</span><input v-model="$store.state.trade.small_money" type="range" id="range" :min="min"
                                   :max="max"><span>{{ max }}</span>
    </div>
    <div>
      <span>最大资金:</span>{{ $store.state.trade.small_money }}
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import $store from "@/store";

export default {
  name: "SmallMoney",
  setup() {
    let min = ref(0)
    let max = ref(100000)

    return {
      min,
      max
    }
  }
}
</script>

<style scoped>

</style>