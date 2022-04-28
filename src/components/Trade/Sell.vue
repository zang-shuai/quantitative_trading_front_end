<template>
  <h4>卖点</h4>
  <div class="col-12">
    <div v-for="sellPoint in sellPoints" class="form-check;" style="overflow-y:auto;">
      <label class="form-check-label">
        <input class="form-check-input" v-model="$store.state.trade.sell" name="sell" :value="sellPoint[1]" type="radio"
               required>
        {{ sellPoint[0] }}
      </label>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Sell",
  setup() {
    let sellPoints = ref([['5日均线跌破30日均线', 'a0'], ['5日均线跌破10日均线', 'a1']])
    return {
      sellPoints
    }
  }
}
</script>

<style scoped>

</style>