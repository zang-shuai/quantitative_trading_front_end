<template>
  <h4>买点</h4>
  <div class="col-12">
    <div v-for="buyPoint in buyPoints" class="form-check;" style="overflow-y:auto;">
      <label class="form-check-label">
        <input class="form-check-input" v-model="$store.state.trade.buy" name="buy" :value="buyPoint[1]" type="radio"
               required>
        {{ buyPoint[0] }}
      </label>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Buy",
  setup() {
    let buyPoints = ref([['5日均线涨破30日均线', 'a0'], ['5日均线涨破10日均线', 'a1']])
    return {
      buyPoints
    }
  }
}
</script>

<style scoped>

</style>