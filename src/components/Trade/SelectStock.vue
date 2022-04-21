<template>
<h4>股票池</h4>
<!--active-->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><router-link to="/lab/trading/hs300">沪深300</router-link></li>
      <li class="breadcrumb-item"><router-link to="/lab/trading/mySelect">自选</router-link></li>
      <li class="breadcrumb-item"><router-link to="/lab/trading/plate">板块</router-link></li>
      <li class="breadcrumb-item"><router-link to="/lab/trading/smallMoney">小资金</router-link></li>
      <li class="breadcrumb-item"><router-link to="/lab/trading/all">全部</router-link></li>
    </ol>
  </nav>
<router-view/>
</template>

<script>
export default {
name: "SelectStock"
}
</script>

<style scoped>

</style>