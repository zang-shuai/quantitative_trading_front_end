<template>
  <!--  <div style="height:800px;border:blue 2px solid">-->
<!--  <div style="height:800px;border: #E73C7E 2px solid;padding-left: 10px">-->
  <div style="height:800px;padding-left: 10px">
    <div style="float:left;width:50%;">
      <div style="height:200px;width:100%;">
        <Basic/>
      </div>
      <div style="height:200px;width:100%;">
        <SelectStock/>
      </div>
      <div style="height:200px;width:100%;">
        <Buy/>
      </div>
      <div style="height:200px;width:100%;">
        <Sell/>
      </div>
    </div>
    <div style="float:left;width:50%;">
      <div id="result" style="height:400px;width:100%;">
        <Result/>
      </div>
      <div style="height:400px;width:100%;">
        <Log/>
      </div>
    </div>
  </div>
</template>

<script>
import {create_line_chart} from "@/utils/drawPicture";
import Basic from "@/components/Trade/Basic";
import Buy from "@/components/Trade/Buy";
import Log from "@/components/Trade/Log";
import Result from "@/components/Trade/Result";
import SelectStock from "@/components/Trade/SelectStock";
import Sell from "@/components/Trade/Sell";

export default {
  name: "Trading",
  components: {Basic, Buy, Log, Result, SelectStock, Sell},
  setup() {

    // create_line_chart('result')
  }
}
</script>

<style scoped>

</style>