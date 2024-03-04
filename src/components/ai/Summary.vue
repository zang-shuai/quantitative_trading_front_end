<template>
  <h4>摘要：</h4>
  <div style="height:400px;width:100%;overflow-y:auto;margin-left: 30px">
<!--    <p>pppp</p>-->
    <p>
      {{ $store.state.trade.ai_result.summary }}

    </p>
  </div>
</template>

<script>


import $store from "@/store";

export default {
  name: "Summary"
}
</script>

<style scoped>

</style>