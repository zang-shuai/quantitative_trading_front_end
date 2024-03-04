<template>
  <div style="height:400px;" id="res"></div>
</template>

<script>
import * as echarts from 'echarts';
import {ref} from "vue";

export default {
  name: "Result",
  props: ['mytitle', 'names', 'xAxis', 'series1', 'series2'],
  setup(props) {

    function draw_res(mytitle, names, xAxis, series1, series2) {
      let chartDom = document.getElementById('res');
      let myChart = echarts.init(chartDom);
      let option = {
        title: {
          text: mytitle
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: names
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: names[0],
            type: 'line',
            data: series1
          },
          {
            name: names[1],
            type: 'line',
            data: series2
          }
        ]
      };
      let option1 = {
        title: {
          text: '交易结果：'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['原始', '交易']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: series1,
          type: 'line',
          smooth: true
        },
          {
            data: series2,
            type: 'line',
            smooth: true
          }]
      };
      option && myChart.setOption(option);
    }


    let newPromise = new Promise((resolve) => {
      resolve()
    })
    //然后异步执行echarts的初始化函数
    newPromise.then(() => {
      //  此dom为echarts图标展示dom
      draw_res(props.mytitle, props.names, props.xAxis, props.series1, props.series2)
    })


  },
  mounted() {
  }
}
</script>

<style scoped>

</style>