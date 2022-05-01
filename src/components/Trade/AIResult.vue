<template>
  <div style="height:400px;" id="res"></div>
</template>

<script>
import * as echarts from 'echarts';
import {ref} from "vue";

export default {
  name: "AIResult",
  props: ['xAxis', 'series1', 'series2'],
  setup(props) {

    function draw_res(xAxis, series1, series2) {
      let chartDom = document.getElementById('res');
      let myChart = echarts.init(chartDom);
      let option;
      let option1 = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: series1
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: series2
          }
        ]
      };

      option = {
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
      draw_res(props.xAxis, props.series1, props.series2)
    })



  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
<!--<template>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "AIResult"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->