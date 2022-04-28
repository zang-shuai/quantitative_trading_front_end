<template>

  <!--  <div style="display: table-cell;vertical-align: middle;border: red 2px solid">-->
  <!--    <div class="d-flex justify-content-center" style="border: #409EFF 2px solid">-->
<!--  <div class="spinner-border" role="status">-->
<!--    <span class="visually-hidden">Loading...</span>-->
<!--  </div>-->

  <div style="display: flex;width: 500px;height: 200px;">
    <div style="margin: auto;width: 100px;height: 100px;text-align:center;line-height:100px">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Spinners"
}
</script>

<style scoped>
.father {
  /*background: red;*/
  position: relative;
  width: 500px;
  height: 500px;
}

.son {
  /*background: green;*/
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>