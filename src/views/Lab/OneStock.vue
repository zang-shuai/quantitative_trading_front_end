<template>
  <div>
    <stock-page/>
  </div>
</template>

<script>
import MyTransfer from "@/components/MyTransfer";
import StockPage from "@/components/StockPage";

export default {
  name: "OneStock",
  components: {StockPage, MyTransfer}
}
</script>

<style scoped>

</style>