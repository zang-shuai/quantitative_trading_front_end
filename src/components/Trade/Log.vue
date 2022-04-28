<template>
  <h4>日志：</h4>
  <div style="height:400px;width:100%;overflow-y:auto;margin-left: 30px">

    <div v-for="(value,key) in log">


      <span v-if="value[Object.keys(value)[0]]!== 0">{{ key }}:</span>

      <div v-for="(v,k) in value">
        <span v-if="v>0" style="color: red">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ k }}:买{{ v }}</span>
        <span v-if="v<0" style="color: green">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ k }}:卖{{ -v }}</span>
      </div>
    </div>

    <h6>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp最终持仓：
      <div v-for="(v,k) in position">
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ k }}: {{ v }}
      </div>
    </h6>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "Log",
  props: ['log', 'position'],
  setup(props) {
    let p = reactive(props)
    let log = p['log']['value']
    let position = p['position']['value']
    return {
      log,
      position
    }
  }
}
</script>

<style scoped>

</style>