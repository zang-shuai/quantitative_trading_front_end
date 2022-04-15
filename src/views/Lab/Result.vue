<template>
  <div style="justify-content: center;">
    <h3>您的风险等级为：{{ level }}</h3>
    <div id="res" style="width:500px;height:500px;">
    </div>
  </div>
</template>

<script>
import {getQueryString} from "@/utils/getData";
import {ref} from "vue";
import * as echarts from 'echarts';

export default {
  name: "Result",
  setup() {
    let res = Number(getQueryString('res'))
    let risk = ref(parseInt(res / 49 * 100))
    let level = ref('低')
    if (risk.value > 33 && risk.value < 66) {
      level.value = '中'
    } else if (risk.value >= 66 && risk.value < 100) {
      level.value = '高'
    }
    return {
      risk,
      level
    }
  },
  mounted() {
    let chartDom = document.getElementById('res');
    let myChart = echarts.init(chartDom);
    let option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}'
          },
          data: [
            {
              value: this.risk,
              name: 'SCORE'
            }
          ]
        }
      ]
    };
    option && myChart.setOption(option);
  }
}
</script>

<style scoped>

</style>