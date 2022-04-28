<template>
  <h4>股票池</h4>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a :class="{'be_clicked':show_list[0]}" @click="showdiv(0)">沪深300</a></li>
      <li class="breadcrumb-item"><a :class="{'be_clicked':show_list[1]}" @click="showdiv(1)">自选</a></li>
      <li class="breadcrumb-item"><a :class="{'be_clicked':show_list[2]}" @click="showdiv(2)">板块</a></li>
      <li class="breadcrumb-item"><a :class="{'be_clicked':show_list[3]}" @click="showdiv(3)">小资金</a></li>
      <li class="breadcrumb-item"><a :class="{'be_clicked':show_list[4]}" @click="showdiv(4)">全部</a></li>
    </ol>
  </nav>
  <hs300 v-show="show_list[0]"/>
  <my-select v-show="show_list[1]"/>
  <plate v-show="show_list[2]"/>
  <small-money v-show="show_list[3]"/>
  <all v-show="show_list[4]"/>
</template>

<script>
import All from "@/components/Trade/StockPool/All";
import Hs300 from "@/components/Trade/StockPool/Hs300";
import MySelect from "@/components/Trade/StockPool/MySelect";
import Plate from "@/components/Trade/StockPool/Plate";
import SmallMoney from "@/components/Trade/StockPool/SmallMoney";
import {ref} from "vue";

export default {
  name: "SelectStock",
  components: {Plate, MySelect, Hs300, All,SmallMoney},
  setup() {
    let show = ref(0)
    let show_list = ref([true, false, false, false, false])

    function showdiv(s) {
      show_list.value[show.value] = false
      show_list.value[s] = true
      show.value = s
    }

    return {
      show,
      show_list,
      showdiv
    }
  }
}
</script>

<style scoped>
.be_clicked{
  color: red;
}
</style>